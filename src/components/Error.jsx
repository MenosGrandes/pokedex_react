
export const Error = ({ error, className }) => {
  return (
    <main className={className} >
      <div className="error">{error}</div>
    </main >
  );
};
