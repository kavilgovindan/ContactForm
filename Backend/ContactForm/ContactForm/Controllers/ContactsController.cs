using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactForm.Data;
using ContactForm.Entities;
using ContactForm.Services;
using ContactForm.Helpers;

namespace ContactForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsService _contactsService;

        public ContactsController(IContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        // GET: api/Contacts
        [Helpers.Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contacts = await _contactsService.getAllAsync();
            return Ok(contacts);
        }

        // GET: api/Contacts/5
        [Helpers.Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _contactsService.getByIdAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        [Helpers.Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            } 

            try
            {                
                await _contactsService.updateAsync(contact);                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contacts
        [Helpers.Authorize]
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            var result = await _contactsService.AddAsync(contact);

            return result;
        }

        // DELETE: api/Contacts/5
        [Helpers.Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {

            var contact = await _contactsService.getByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            await _contactsService.deleteAsync(contact);

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _contactsService.isExsist(id);
        }
    }
}
