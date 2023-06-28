import './Notification.css';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) =>
  message !== '' && <p className='notification'>{message}</p>;

export default Notification;
