export const Alert = ({type, message}) => {
  return (
    <div className={`alert ${type} text-center p-4`} role="alert">
      {message}
    </div>
  );
};
