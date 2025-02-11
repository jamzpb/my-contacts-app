import ContactsTable from "../components/ContactsTable";

const HomePage = () => {
  return (
    <>
      <h2 className="govuk-heading-m">Contacts | DFT</h2>
      <p className="govuk-body">These are your current contacts</p>
      <p className="govuk-body">
        Add new contacts {"  "}
        <a href="/create" className="govuk-link">
          here
        </a>
      </p>
      <ContactsTable />
    </>
  );
};

export default HomePage;
