
import React from 'react';

const PopupWithForm = ({isOpen, onClose, name, title, children, onSubmit,onDeleteCard,buttonText}) => {

  return (
    <>
      <div className={`popup popup_${name} ${isOpen && "popup_open"}`}>
        <div className="popup__modal">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form"  action="#" name={name} id={`popup__form_${name}`} onSubmit={onSubmit}> 
            <button className="popup__close" type="button" onClick={onClose}></button>
            <fieldset className="popup__input-container">
              {children}
            </fieldset>
            <button onClick={onDeleteCard} className="popup__save popup__save_edit" type="submit">{buttonText ? buttonText : "Сохранить"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default PopupWithForm;