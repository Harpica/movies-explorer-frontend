import './Notification.css';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return <>{message !== '' && <p className='notification'>{message}</p>}</>;
};

export default Notification;
