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
    emailAddress: "",
  });

  const [errors, setErrors] = useState<{ name?: string; number?: string; emailAddress?: string }>({});

  const navigate = useNavigate();
  const { refreshData } = useContext(ContactsContext);

  const validateForm = () => {
    const newErrors: { name?: string; number?: string; emailAddress?: string } = {};

    if (!newContact.name.trim()) {
      newErrors.name = "Enter a name";
    }

    if (!newContact.number.trim()) {
      newErrors.number = "Enter a contact number";
    } else if (!/^\d{11}$/.test(newContact.number)) {
      newErrors.number = "Enter a valid 11-digit contact number";
    }

    if (newContact.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.emailAddress)) {
      newErrors.emailAddress = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

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

        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className={`govuk-form-group ${errors.name ? "govuk-form-group--error" : ""}`}>
            <label className="govuk-label" htmlFor="contact-name">
              Name
            </label>
            {errors.name && <p className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {errors.name}</p>}
            <input
              className={`govuk-input ${errors.name ? "govuk-input--error" : ""}`}
              id="contact-name"
              name="contactName"
              type="text"
              autoComplete="contact-name"
              value={newContact.name}
              onChange={(e) => setNewContact((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Number Field */}
          <div className={`govuk-form-group ${errors.number ? "govuk-form-group--error" : ""}`}>
            <label className="govuk-label" htmlFor="contact-number">
              Number
            </label>
            {errors.number && <p className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {errors.number}</p>}
            <input
              className={`govuk-input ${errors.number ? "govuk-input--error" : ""}`}
              id="contact-number"
              name="contactNumber"
              type="text"
              autoComplete="contact-number"
              value={newContact.number}
              onChange={(e) => setNewContact((prev) => ({ ...prev, number: e.target.value }))}
            />
          </div>

          {/* Email Field (Optional) */}
          <div className={`govuk-form-group ${errors.emailAddress ? "govuk-form-group--error" : ""}`}>
            <label className="govuk-label" htmlFor="contact-email">
              Email (optional)
            </label>
            {errors.emailAddress && <p className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {errors.emailAddress}</p>}
            <input
              className={`govuk-input ${errors.emailAddress ? "govuk-input--error" : ""}`}
              id="contact-email"
              name="contactEmail"
              type="text"
              autoComplete="contact-email"
              value={newContact.emailAddress}
              onChange={(e) => setNewContact((prev) => ({ ...prev, emailAddress: e.target.value }))}
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
