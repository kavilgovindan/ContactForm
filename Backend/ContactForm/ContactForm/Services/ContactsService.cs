using ContactForm.Data;
using ContactForm.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactForm.Services
{
    public interface IContactsService
    {
        Task<Contact> AddAsync(Contact contact);
        Task<Contact> updateAsync(Contact contact);
        Task<IEnumerable<Contact>> getAllAsync();
        Task<Contact> getByIdAsync(int id);
        Task deleteAsync(Contact contact);
        bool isExsist(int id);
    }
    public class ContactsService : IContactsService
    {
        private readonly DataContext _context;
        public ContactsService(DataContext Context)
        {
            _context = Context;
        }

        public async Task<Contact> AddAsync(Contact contact)
        {
            if (_context.Contacts == null)
            {
                return null;
            }
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task deleteAsync(Contact contact)
        {           
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Contact>> getAllAsync()
        {
            if (_context.Contacts == null)
            {
                return null;
            }
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact> getByIdAsync(int id)
        {
            if (_context.Contacts == null)
            {
                return null;
            }
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return null;
            }

            return contact;
        }

        public bool isExsist(int id)
        {
            return (_context.Contacts?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public async Task<Contact> updateAsync(Contact contact)
        {
            if (_context.Contacts == null)
            {
                return null;
            }
            _context.Entry(contact).State = EntityState.Modified;
            
            await _context.SaveChangesAsync();

            return contact;
            
        }
    }
}
