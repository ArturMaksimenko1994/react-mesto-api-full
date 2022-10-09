import React, { useContext } from 'react';
import CurrentUserContext from './../../contexts/CurrentUserContext.js'

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    const userContext = useContext(CurrentUserContext);

    const isOwn = card.owner._id === userContext._id;
    const isLiked = card.likes.some(i => i._id === userContext._id);

    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? '' : 'element__delete_disabled'}`
    );

    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    return (
        <li className="element__item">
            <button onClick={handleClick} className="element__img-container" type="button" aria-label="Открыть изображение">
                <img className="element__img" src={card.link} alt={card.name} />
            </button>
            
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} src={card.link} alt={card.name}></button>
            <div className="element__description">
                <h2 className="element__title" >{card.name}</h2>
                <div className="element__action">
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Нравится"></button>
                    <span className="element__number">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;

