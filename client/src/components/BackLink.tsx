const BackLink = ({ url }: { url: string }) => {
  return (
    <>
      <a href={`${url}`} className="govuk-back-link">
        Back
      </a>
    </>
  );
};

export default BackLink;
