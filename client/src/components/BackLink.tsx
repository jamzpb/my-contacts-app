const BackLink = ({ url }: { url: string }) => {
  return (
    <>
      <a href={`${url}`} className="govuk-back-link">
        Back hehehh
      </a>
    </>
  );
};

export default BackLink;
