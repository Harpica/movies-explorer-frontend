import { PropsWithChildren } from 'react';
import useEscapeKey from '../../hooks/useEsc';
import useOutsideClick from '../../hooks/useOutsideClick';
import './Popup.css';

export interface PopupProps extends PropsWithChildren {
  closePopup: () => void;
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = ({ closePopup, isOpen, children }) => {
  const ref = useOutsideClick(closePopup, isOpen);
  useEscapeKey(closePopup, isOpen);

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : 'popup_closed'}`}>
      <div className='popup__content' ref={ref}>
        {children}
      </div>
    </section>
  );
};

export default Popup;
