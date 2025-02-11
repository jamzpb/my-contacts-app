using API.Models;

public interface IContactsRepository
{
    Task<List<Contact>> GetAllContacts();
    Task<Contact> GetContact(int id);
    Task<Contact> AddContact(Contact contact);
    Task<Contact> UpdateContact(Contact contact);
    Task DeleteContact(int id);
}