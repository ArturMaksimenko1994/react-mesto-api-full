import React, {useState, useEffect} from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";


const PopupPlace =({isOpen, onClose, onAddPlace}) => {

  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  const handleChangePlace = (e) => {
      setPlace(e.target.value);
  }

  const handleChangeLink = (e) => {
      setLink(e.target.value);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      onAddPlace({
          name: place,
          link
      });
  }

  useEffect(() => {
      setPlace('');
      setLink('');
  }, [isOpen]); 



    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose}  onSubmit={handleSubmit} name="Place" title="Новое место" >
            <label className="popup__label" htmlFor="nameCard">
              <input value={place} onChange={handleChangePlace} id="popup__input-place" className="popup__input popup__input_link_name" name="popupNameCard" type="text"   placeholder="Название" minLength="2" maxLength="30" required />
              <span className="popup__input-place-error popup__input-message"></span>
            </label>
            <label className="popup__label" htmlFor="linkCard">
              <input value={link} onChange={handleChangeLink} id="popup__input-link" className="popup__input popup__input_link_src" name="popupLinkCard" type="url"  placeholder="Ссылка на картинку" required />
              <span className="popup__input-link-error popup__input-message"></span>
            </label>
        </PopupWithForm>
    );
}

export default PopupPlace;
