using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace API.Tests.Controllers
{
    public class ContactsControllerTests
    {
        private readonly Mock<IContactsRepository> _repository;
        private readonly ContactsController _controller;
        public ContactsControllerTests()
        {
            _repository = new Mock<IContactsRepository>();
            _controller = new ContactsController(_repository.Object);
        }

        [Fact]
        public async Task GetContacts_ReturnsListOfContacts()
        {
            // Arrange
            var contacts = new List<Contact>
            {
            new Contact { Id = 1, Name = "John Doe", Number = "1234567890", EmailAddress = "john@example.com" },
            new Contact { Id = 2, Name = "Jane Doe", Number = "0987654321", EmailAddress = "jane@example.com" }
            };

            _repository.Setup(repo => repo.GetAllContacts()).ReturnsAsync(contacts);

            // Act
            var result = await _controller.GetContacts();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
        }

        [Fact]
        public async Task GetContact_ExistingId_ReturnsOkWithContact()
        {
            // Arrange
            var contact = new Contact { Id = 1, Name = "John Doe", Number = "1234567890", EmailAddress = "john@example.com" };
            _repository.Setup(repo => repo.GetContact(1)).ReturnsAsync(contact);

            // Act
            var result = await _controller.GetContact(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Contact>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnedContact = Assert.IsType<Contact>(okResult.Value);

            Assert.Equal("John Doe", returnedContact.Name);
            Assert.Equal("1234567890", returnedContact.Number);
            Assert.Equal("john@example.com", returnedContact.EmailAddress);
        }

        [Fact]
        public async Task GetContact_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            _repository.Setup(repo => repo.GetContact(99)).ReturnsAsync((Contact)null);

            // Act
            var result = await _controller.GetContact(99);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task AddContact_ValidContact_ReturnsCreatedAtAction()
        {
            // Arrange
            var newContact = new Contact { Id = 1, Name = "John Doe", Number = "1234567890", EmailAddress = "john@example.com" };
            _repository.Setup(repo => repo.AddContact(It.IsAny<Contact>())).ReturnsAsync(newContact);

            // Act
            var result = await _controller.AddContact(newContact);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnedContact = Assert.IsType<Contact>(createdAtActionResult.Value);

            Assert.Equal("John Doe", returnedContact.Name);
            Assert.Equal("1234567890", returnedContact.Number);
            Assert.Equal("john@example.com", returnedContact.EmailAddress);
        }

        [Fact]
        public async Task UpdateContact_ValidContact_ReturnsUpdatedContact()
        {
            // Arrange
            var contact = new Contact { Id = 1, Name = "John Doe", Number = "1234567890", EmailAddress = "john@example.com" };
            _repository.Setup(repo => repo.UpdateContact(It.IsAny<Contact>())).ReturnsAsync(contact);

            // Act
            var result = await _controller.UpdateContact(contact);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var updatedContact = Assert.IsType<Contact>(okResult.Value);

            Assert.Equal("John Doe", updatedContact.Name);
            Assert.Equal("1234567890", updatedContact.Number);
            Assert.Equal("john@example.com", updatedContact.EmailAddress);
        }

        [Fact]
        public async Task DeleteContact_ExistingId_ReturnsOk()
        {
            // Arrange
            _repository.Setup(repo => repo.DeleteContact(1)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteContact(1);

            // Assert
            Assert.IsType<OkResult>(result);
        }

    }
}