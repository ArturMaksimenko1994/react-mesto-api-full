import React from 'react';

const PopupImage = ({ card, onClose }) => {
    if (!card) return null;
    return (
        <div className="popup popup_image popup_open ">
            <figure className="popup__row">
                <button className="popup__close popup__close_image" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="popup__picture" src={card.link} alt={card.name} />
                <figcaption className="popup__text">{card.name}</figcaption>
            </figure>
        </div>
    );
}

export default PopupImage;