using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly DataContext _context;
        public ContactsRepository(DataContext context)
        {
            _context = context;
        }
        
        public Task<List<Contact>> GetAllContacts()
        {
           return _context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContact(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<Contact> AddContact(Contact contact)
        {
            contact.Created_At = DateTime.Now;

            var result = _context.AddAsync(contact);
            await _context.SaveChangesAsync();
            
            return result.Result.Entity;
        }

        public async Task<Contact> UpdateContact(Contact contact)
        {
            var myContact = await _context.Contacts.FirstOrDefaultAsync(e => e.Id == contact.Id);

            if(myContact != null)
            {
                myContact.Name = contact.Name;
                myContact.EmailAddress= contact.EmailAddress;
                myContact.Number = contact.Number;

                await _context.SaveChangesAsync();

                return myContact;
            } else {
                return null;
            }  
        }

        public async Task DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if(contact != null)
            {
                _context.Remove(contact);
                await _context.SaveChangesAsync();
            }            
        }
    }
}