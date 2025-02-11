using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ContactsController : BaseController
    {

        private readonly IContactsRepository _repository;
        public ContactsController(IContactsRepository repository)
        {
            _repository = repository;
        }

       [HttpGet("GetAll")]
       public async Task<List<Contact>> GetContacts()
       {
          return await _repository.GetAllContacts();
       }

       [HttpGet("GetContact/{id}")]
       public async Task<ActionResult<Contact>> GetContact(int id)
       {
            var contact = await _repository.GetContact(id);
                if (contact == null) return NotFound();
            return Ok(contact);
        }

       [HttpPost("Add")]
       public async Task<ActionResult<Contact>> AddContact(Contact contact)
       {
          await _repository.AddContact(contact);
          
          return CreatedAtAction(nameof (AddContact), new { id = contact.Id }, contact);
       }

       [HttpPut("Update")]
       public async Task<ActionResult<Contact>> UpdateContact(Contact contact)
       {
          var updateContact = await _repository.UpdateContact(contact);
          return Ok(updateContact);
       }

       [HttpDelete("Delete/{id}")]
       public async Task<IActionResult> DeleteContact(int id)
       {
            await _repository.DeleteContact(id);
            return Ok();
       }
       
    }
}