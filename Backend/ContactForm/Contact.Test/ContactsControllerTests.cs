using ContactForm.Services;
using ContactForm.Entities;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ContactForm.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ContactForm.Test
{
    public class ContactsControllerTests
    {
        [Fact]
        public async Task GetContacts_ReturnsOkObjectResult_WithListOfContacts()
        {
            // Arrange
            var mockService = new Mock<IContactsService>();
            var expectedContacts = new List<Contact>
            {
                new Contact { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" },
                new Contact { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane@example.com" }
            };
            mockService.Setup(service => service.getAllAsync()).ReturnsAsync(expectedContacts);
            var controller = new ContactsController(mockService.Object);

            // Act
            var result = await controller.GetContacts();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var actualContacts = Assert.IsAssignableFrom<IEnumerable<Contact>>(okResult.Value);
            Assert.Equal(expectedContacts, actualContacts);
        }

        [Fact]
        public async Task PutContact_WithValidIdAndContact_ReturnsNoContentResult()
        {
            // Arrange
            var mockService = new Mock<IContactsService>();
            var controller = new ContactsController(mockService.Object);
            var contact = new Contact { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" };

            // Act
            var result = await controller.PutContact(1, contact);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteContact_WithValidId_ReturnsNoContentResult()
        {
            // Arrange
            var mockService = new Mock<IContactsService>();
            mockService.Setup(service => service.getByIdAsync(1)).ReturnsAsync(new Contact { Id = 1 });
            var controller = new ContactsController(mockService.Object);

            // Act
            var result = await controller.DeleteContact(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

    }
}
