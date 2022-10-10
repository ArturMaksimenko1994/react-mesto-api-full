import React from 'react';

const PopupImage = ({ isOpen, card, onClose }) => {
    return (
        <div className={`popup popup_image ${isOpen && 'popup_open'} `}>
            <figure className="popup__row">
                <button className="popup__close popup__close_image" onClick={onClose} type="button" aria-label="Закрыть"></button>
                {card != null
                    && <img className="popup__picture" src={card.link} alt={card.name} />
                }
                {card != null
                    && <figcaption className="popup__text">{card.name && card.name}</figcaption>
                }
            </figure >
        </div >
    );
}

export default PopupImage;
