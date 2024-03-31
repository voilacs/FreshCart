import "../index.css";
const NotificationRed = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
const NotificationGreen = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

export default { NotificationRed, NotificationGreen };
