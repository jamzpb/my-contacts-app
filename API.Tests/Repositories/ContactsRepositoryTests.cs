using API.Data;
using Microsoft.EntityFrameworkCore;

public class ContactsRepositoryTests
{
    private DbContextOptions<DataContext> InMemoryDb()
    {
        return new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
    }

    [Fact]
    public async Task AddProductAsync_ShouldAddProductToDb()
    {
        // Arrange: Setup in-memory database and service
        var options = InMemoryDb();
        using (var context = new DataContext(options))
        {
            var service = new (context);

            var product = new Product { Name = "Test Product" };

            // Act: Add the product using the service
            await service.AddProductAsync(product);

            // Assert: Verify the product is added to the in-memory database
            var savedProduct = await context.Products.FindAsync(product.Id);
            Assert.NotNull(savedProduct);
            Assert.Equal("Test Product", savedProduct.Name);
        }
    }

}