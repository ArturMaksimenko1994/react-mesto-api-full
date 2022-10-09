import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from "./../PopupWithForm/PopupWithForm.js";
import CurrentUserContext from './../../contexts/CurrentUserContext.js';

const PopupEdit = ({isOpen, onClose, onUpdateUser}) => {

    const userContext = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const [description, setDescription] = useState('');
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(userContext.name);
        setDescription(userContext.about);
    }, [userContext, isOpen]); 


    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="edit" title="Редактировать профиль" >
            <label className="popup__label" htmlFor="name">
                <input value={name || ''} onChange={handleChangeName} id="popupInputName"  className="popup__input popup__input_text_name"  name="popupTextName" type="text" placeholder="введите имя ..." minLength="2" maxLength="40" required />
                <span className="popup__input-error popup__input-message popupInputName-error"></span>
            </label>
            <label className="popup__label" htmlFor="post">
                <input  value={description || ''} onChange={handleChangeDescription} id="popupInputPost"  className="popup__input popup__input_text_post" name="popupTextPost" type="text" placeholder="введите должность ..." minLength="2" maxLength="200" required />
                <span className="popup__input-error popup__input-message popupInputPost-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default PopupEdit;
