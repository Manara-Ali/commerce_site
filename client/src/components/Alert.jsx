export const Alert = ({type, message}) => {
  return (
    <div className={`alert ${type} text-center`} role="alert">
      {message}
    </div>
  );
};
