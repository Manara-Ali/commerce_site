export const Alert = ({type, message}) => {
  return (
    <div className={`alert ${type}`} role="alert">
      {message}
    </div>
  );
};
