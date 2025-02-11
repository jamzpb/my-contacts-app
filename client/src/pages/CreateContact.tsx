import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import BackLink from "../components/BackLink";
import { Contact } from "../types/Contact";
import { ContactsContext } from "../context/ContactsContext";
import { createContact } from "../utils/apiMethods";

const CreateContact = () => {
  const [newContact, setNewContact] = useState<Contact>({
    name: "",
    number: "",
    // emailAddress: null
  });

  const navigate = useNavigate();
  const { refreshData } = useContext(ContactsContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createContact(newContact);
    refreshData();
    navigate("/");
  };

  return (
    <>
      <BackLink url="/" />

      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h2 className="govuk-fieldset__heading">Create your contact</h2>
        </legend>

        <form onSubmit={handleSubmit}>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-name">
              Name
            </label>
            <input
              className="govuk-input govuk-input--width-10"
              id="contact-name"
              name="contactName"
              type="text"
              autoComplete="contact-name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-number">
              Number
            </label>
            <input
              className="govuk-input govuk-input--width-10"
              id="contact-number"
              name="contactNumber"
              type="text"
              autoComplete="contact-number"
              value={newContact.number}
              onChange={(e) =>
                setNewContact((prev) => ({ ...prev, number: e.target.value }))
              }
            />
          </div>

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-email">
              Email (optional)
            </label>
            <input
              className="govuk-input govuk-input--width-10"
              id="contact-email"
              name="contactEmail"
              type="text"
              autoComplete="contact-email"
              value={newContact.emailAddress}
              onChange={(e) =>
                setNewContact((prev) => ({
                  ...prev,
                  emailAddress: e.target.value,
                }))
              }
            />
          </div>

          <button type="submit" className="govuk-button">
            Create Contact
          </button>
        </form>
      </fieldset>
    </>
  );
};

export default CreateContact;
