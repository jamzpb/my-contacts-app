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
  const [errors, setErrors] = useState<{
    name?: string;
    number?: string;
    emailAddress?: string;
  }>({});

  useEffect(() => {
    if (data && contactId) {
      const contact = data.find((x) => x.id == parseInt(contactId)) || null;
      setContactToUpdate(contact);
    }
  }, [data, contactId]);

  const validateForm = () => {
    const newErrors: { name?: string; number?: string; emailAddress?: string } =
      {};

    if (!contactToUpdate?.name?.trim()) {
      newErrors.name = "Enter a name";
    }
    if (!contactToUpdate?.number?.trim()) {
      newErrors.number = "Enter a contact number";
    } else if (!/^\d{11}$/.test(contactToUpdate.number)) {
      newErrors.number = "Enter a valid 11-digit contact number";
    }
    if (
      contactToUpdate?.emailAddress &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactToUpdate.emailAddress)
    ) {
      newErrors.emailAddress = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    await updateContact(contactToUpdate!);
    refreshData();
    navigate("/");
  };

  return (
    <>
      <BackLink url="/" />

      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h2 className="govuk-fieldset__heading">Update your contact</h2>
        </legend>

        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`govuk-form-group ${
              errors.name ? "govuk-form-group--error" : ""
            }`}
          >
            <label className="govuk-label" htmlFor="contact-name">
              Name
            </label>
            {errors.name && (
              <p className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {errors.name}
              </p>
            )}
            <input
              className={`govuk-input ${
                errors.name ? "govuk-input--error" : ""
              }`}
              id="contact-name"
              name="contactName"
              type="text"
              value={contactToUpdate?.name || ""}
              onChange={(e) =>
                setContactToUpdate((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
          </div>

          <div
            className={`govuk-form-group ${
              errors.number ? "govuk-form-group--error" : ""
            }`}
          >
            <label className="govuk-label" htmlFor="contact-number">
              Number
            </label>
            {errors.number && (
              <p className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {errors.number}
              </p>
            )}
            <input
              className={`govuk-input ${
                errors.number ? "govuk-input--error" : ""
              }`}
              id="contact-number"
              name="contactNumber"
              type="text"
              value={contactToUpdate?.number || ""}
              onChange={(e) =>
                setContactToUpdate((prev) =>
                  prev ? { ...prev, number: e.target.value } : null
                )
              }
            />
          </div>

          <div
            className={`govuk-form-group ${
              errors.emailAddress ? "govuk-form-group--error" : ""
            }`}
          >
            <label className="govuk-label" htmlFor="contact-email">
              Email (optional)
            </label>
            {errors.emailAddress && (
              <p className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {errors.emailAddress}
              </p>
            )}
            <input
              className={`govuk-input ${
                errors.emailAddress ? "govuk-input--error" : ""
              }`}
              id="contact-email"
              name="contactEmail"
              type="text"
              value={contactToUpdate?.emailAddress || ""}
              onChange={(e) =>
                setContactToUpdate((prev) =>
                  prev ? { ...prev, emailAddress: e.target.value } : null
                )
              }
            />
          </div>

          <button type="submit" className="govuk-button">
            Update Contact
          </button>
        </form>
      </fieldset>
    </>
  );
};

export default UpdateContact;
