using API.Data;
using API.Models;

public class DbInitializer
{
    public static async Task SeedData(DataContext context)
    {
        if(context.Contacts.Any()) return;

        var contacts = new List<Contact>()
        {
            new Contact
            {
                Name = "John Doe",
                Number = "1234567891",
                EmailAddress = "johndoe@example.com",
                Created_At = DateTime.Now
            },
            new Contact
            {
                Name = "Jane Smith",
                Number = "1234567891",
                EmailAddress = "janesmith@example.com",
                Created_At = DateTime.Now
            },
            new Contact
            {
                Name = "Alice Johnson",
                Number = "1234567891",
                EmailAddress = "alice.johnson@example.com",
                Created_At = DateTime.Now
            },
            new Contact
            {
                Name = "Bob Brown",
                Number = "0123456789",
                EmailAddress = "bob.brown@example.com",
                Created_At = DateTime.Now
            }
        };

        context.Contacts.AddRange(contacts);

        await context.SaveChangesAsync();
    }
}