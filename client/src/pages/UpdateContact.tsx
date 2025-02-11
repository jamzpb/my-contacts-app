import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ContactsContext } from "../context/ContactsContext";
import { Contact } from "../types/Contact";
import BackLink from "../components/BackLink";
import { updateContact } from "../utils/apiMethods";

const UpdateContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { data, refreshData } = useContext(ContactsContext);
  const [contactToUpdate, setContactToUpdate] = useState<Contact | null>(null);

  useEffect(() => {
    if (data && contactId) {
      const contact = data.find((x) => x.id == parseInt(contactId)) || null;
      setContactToUpdate(contact);
    }
  }, [data, contactId]); // Add dependencies

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateContact(contactToUpdate!);
    refreshData();

    navigate('/')

  };

  return (
    <>
      <BackLink url="/" />

      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h2 className="govuk-fieldset__heading">Update your contact</h2>
        </legend>

        <>
          <form onSubmit={handleSubmit}>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-line-1">
                Name
              </label>
              <input
                className="govuk-input govuk-input--width-10"
                id="contact-name"
                name="contactName"
                type="text"
                autoComplete="contact-name"
                value={contactToUpdate?.name}
                onChange={(e) =>
                  setContactToUpdate((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
              />
            </div>

            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="contact-number">
                Number
              </label>
              <input
                className="govuk-input govuk-input--width-10"
                id="contact-name"
                name="contactName"
                type="text"
                autoComplete="contact-name"
                value={contactToUpdate?.number || ""}
                onChange={(e) =>
                  setContactToUpdate((prev) =>
                    prev ? { ...prev, number: e.target.value } : null
                  )
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
                name="contact-email"
                type="text"
                autoComplete="contact-email"
                value={contactToUpdate?.emailAddress || ""}
                onChange={(e) =>
                  setContactToUpdate((prev) =>
                    prev ? { ...prev, emailAddress: e.target.value } : null
                  )
                }
              />
            </div>

            <button type="submit" className="govuk-button">Update Contact</button>
          </form>
        </>
      </fieldset>
    </>
  );
};

export default UpdateContact;
