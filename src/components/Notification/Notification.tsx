import './Notification.css';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => (
  <p className={message !== '' ? 'notification' : 'notification_hidden'}>
    {message}
  </p>
);

export default Notification;
