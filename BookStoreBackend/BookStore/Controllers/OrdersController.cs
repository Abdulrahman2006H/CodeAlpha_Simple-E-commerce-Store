using BookStore.Dtos;
using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly BookStoreDbContext _context;

        public OrdersController(BookStoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Book)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Book)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            return Ok(new
            {
                order.Id,
                order.CustomerName,
                order.CustomerEmail,
                order.CustomerPhone,
                order.Address,
                order.TotalPrice,
                order.CreatedAt,
                order.Status,
                Items = order.OrderItems.Select(i => new
                {
                    
                    i.BookId,
                    i.Quantity,
                    i.Price
                })
            });
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto dto)
        {
            if (dto.UserId <= 0)
                return BadRequest("UserId is required.");

            if (dto.Items == null || dto.Items.Count == 0)
                return BadRequest("Order must contain at least one item.");

            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);

            if (!userExists)
                return BadRequest("User not found.");

            var bookIds = dto.Items.Select(i => i.BookId).Distinct().ToList();

            var books = await _context.Books
                .Where(b => bookIds.Contains(b.Id))
                .ToListAsync();

            if (books.Count != bookIds.Count)
                return BadRequest("One or more books were not found.");

            var order = new Order
            {
                UserId = dto.UserId,
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                CustomerPhone = dto.CustomerPhone,
                Address = dto.Address,
                CreatedAt = DateTime.Now,
                Status = "Pending",
                TotalPrice = 0
            };

            foreach (var item in dto.Items)
            {
                if (item.Quantity <= 0)
                    return BadRequest("Quantity must be greater than zero.");

                var book = books.First(b => b.Id == item.BookId);

                order.OrderItems.Add(new OrderItem
                {
                    BookId = book.Id,
                    Quantity = item.Quantity,
                    Price = book.Price
                });

                order.TotalPrice += book.Price * item.Quantity;
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Order created successfully",
                orderId = order.Id,
                totalPrice = order.TotalPrice,
                status = order.Status,
                createdAt = order.CreatedAt
            });
        }


        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            order.Status = status;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}