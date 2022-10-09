import React, {useRef, useEffect} from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupAvatar = ({isOpen, onClose, onUpdateAvatar}) => {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="Place" title="Обновить аватар">
            <label className="popup__label" htmlFor="linkAvatar">
                <input ref={avatarRef} id="popupInputAvatar" className="popup__input popup__input_avatar_src" name="popupLinkAvatar" type="url" placeholder="Ссылка на аватарку" required />
                <span className="popup__input-error popup__input-message popupInputAvatar-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default PopupAvatar;