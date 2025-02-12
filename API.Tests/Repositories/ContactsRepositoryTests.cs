using API.Data;
using API.Models;
using API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Tests;
public class ContactsRepositoryTests
{
    private readonly IContactsRepository _repository;
    private readonly DataContext _context;

    // arrange
    public ContactsRepositoryTests()
    {
        // use in memory db for each test
        var options = new DbContextOptionsBuilder<DataContext>()
        .UseInMemoryDatabase(Guid.NewGuid().ToString())
        .Options;

        // models the in memory db based on the current db context
        _context = new DataContext(options);
        _repository = new ContactsRepository(_context);
    }

    [Fact]
    public async Task Can_create_contact()
    {
        // arrange
        Contact contact = new Contact
        {
            Name = "Joe Bloggs",
            Number = "01234567891",
            EmailAddress = "joebloggs@test.com"
        };

        // act
        var createdContact = await _repository.AddContact(contact);
        await _context.SaveChangesAsync();


        // assert
        var savedContact = await _context.Contacts.FindAsync(createdContact.Id);
        Assert.NotNull(savedContact);
        Assert.Equal(contact.Name, savedContact.Name);
        Assert.Equal(contact.Number, savedContact.Number);
        Assert.Equal(contact.EmailAddress, savedContact.EmailAddress);

    }

    [Fact]
    public async Task Can_update_contact()
    {
        // Arrange
        Contact contact = new Contact
        {
            Name = "Joe Bloggs",
            Number = "01234567891",
            EmailAddress = "joebloggs@test.com"
        };

        var createdContact = await _repository.AddContact(contact);
        await _context.SaveChangesAsync();

        // Act - Update contact details
        createdContact.Name = "John Doe";
        createdContact.Number = "09876543210";
        createdContact.EmailAddress = "johndoe@test.com";

        var updatedContact = await _repository.UpdateContact(createdContact);
        await _context.SaveChangesAsync();

        // Assert
        var savedContact = await _context.Contacts.FindAsync(updatedContact.Id);
        Assert.NotNull(savedContact);
        Assert.Equal("John Doe", savedContact.Name);
        Assert.Equal("09876543210", savedContact.Number);
        Assert.Equal("johndoe@test.com", savedContact.EmailAddress);
    }

    [Fact]
    public async Task Can_delete_contact()
    {
        // Arrange
        Contact contact = new Contact
        {
            Name = "Joe Bloggs",
            Number = "01234567891",
            EmailAddress = "joebloggs@test.com"
        };

        var createdContact = await _repository.AddContact(contact);
        await _context.SaveChangesAsync();

        // Act - Delete the contact
        await _repository.DeleteContact(createdContact.Id);
        await _context.SaveChangesAsync();

        // Assert
        var deletedContact = await _context.Contacts.FindAsync(createdContact.Id);
        Assert.Null(deletedContact);
    }


}