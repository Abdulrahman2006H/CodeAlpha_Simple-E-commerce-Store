using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models;

public partial class Order
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    [StringLength(100)]
    public string? CustomerName { get; set; }

    [StringLength(150)]
    public string? CustomerEmail { get; set; }

    [StringLength(50)]
    public string? CustomerPhone { get; set; }

    [StringLength(300)]
    public string? Address { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = null!;

    [InverseProperty("Order")]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [ForeignKey("UserId")]
    [InverseProperty("Orders")]
    public virtual User User { get; set; } = null!;
}