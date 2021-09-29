import "./notificationStyles.css";

export const Notification = ({ text, type }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
