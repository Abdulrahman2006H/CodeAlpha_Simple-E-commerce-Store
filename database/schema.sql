CREATE DATABASE BookStoreDb;
GO

USE BookStoreDb;
GO

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'User'
);

CREATE TABLE Books (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Author NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Price DECIMAL(18,2) NOT NULL,
    ImageUrl NVARCHAR(MAX) NULL,
    Category NVARCHAR(100) NULL,
    Stock INT NOT NULL DEFAULT 0
);

CREATE TABLE CartItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    BookId INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,

    CONSTRAINT FK_CartItems_Users
        FOREIGN KEY (UserId) REFERENCES Users(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_CartItems_Books
        FOREIGN KEY (BookId) REFERENCES Books(Id)
        ON DELETE CASCADE
);

CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    TotalPrice DECIMAL(18,2) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',

    CONSTRAINT FK_Orders_Users
        FOREIGN KEY (UserId) REFERENCES Users(Id)
        ON DELETE CASCADE
);

CREATE TABLE OrderItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    BookId INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL,

    CONSTRAINT FK_OrderItems_Orders
        FOREIGN KEY (OrderId) REFERENCES Orders(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_OrderItems_Books
        FOREIGN KEY (BookId) REFERENCES Books(Id)
        ON DELETE NO ACTION
);

INSERT INTO Books (Title, Author, Description, Price, ImageUrl, Category, Stock)
VALUES
('Atomic Habits', 'James Clear', 'A practical book about building good habits and breaking bad ones.', 350.00, 'assets/images/atomic-habits.jpg', 'Self Development', 20),

('Rich Dad Poor Dad', 'Robert Kiyosaki', 'A book about money mindset and financial education.', 300.00, 'assets/images/rich-dad-poor-dad.jpg', 'Finance', 15),

('Clean Code', 'Robert C. Martin', 'A book about writing clean and maintainable code.', 500.00, 'assets/images/clean-code.jpg', 'Programming', 10),

('The Psychology of Money', 'Morgan Housel', 'A book about wealth, greed, and happiness.', 400.00, 'assets/images/psychology-of-money.jpg', 'Finance', 12),

('Deep Work', 'Cal Newport', 'A book about focus and productivity.', 320.00, 'assets/images/deep-work.jpg', 'Productivity', 18);

SELECT * FROM Books;