import React from 'react';
import imgApproveds from './../../images/icons/approved.svg';
import imgError from './../../images/icons/error.svg';

const InfoToolTip = ( {isOpen, onClose, status} ) => {
    return (
        <div className={`popup ${isOpen && "popup_open"}`}>
            <div className="popup__modal">
                <div className="popup__close" onClick={onClose}></div>
                <img className='popup__status-img' alt='Статус регистрации' src={ status ? imgApproveds : imgError } />
                <h2 className="popup__status-text">
                    { status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }
                </h2>
            </div>  
        </div>
    );
}

export default InfoToolTip;