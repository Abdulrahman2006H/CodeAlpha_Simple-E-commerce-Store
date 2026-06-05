namespace BookStore.Dtos
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }

        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;

        public List<CreateOrderItemDto> Items { get; set; } = new();
    }

    public class CreateOrderItemDto
    {
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}