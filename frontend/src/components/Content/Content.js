import React, {useState, useEffect} from 'react';
import CurrentUserContext from './../../contexts/CurrentUserContext.js';

// импортируем компоненты приложения
import Main from './../Main/Main.js';
import PopupWithForm from './../PopupWithForm/PopupWithForm.js';
import PopupImage from './../PopupImage/PopupImage.js';
import PopupAvatar from './../PopupAvatar/PopupAvatar.js';
import PopupEdit from './../PopupEdit/PopupEdit.js';
import PopupPlace from "./../PopupPlace/PopupPlace.js";


import api from './../../utils/api.js';

const Content = () => {

    const [cards, setCards] = useState([]);

    const [cardDelete,setCardDelete] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [isOpenPopotDelete, setIsOpenPopotDelete] = useState(false);
  
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
      setIsEditProfilePopupOpen(true)
    }
  
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
      setIsEditAvatarPopupOpen(true)
    }
  
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
      setIsAddPlacePopupOpen(true)
    }

    const [isAddImagePopupOpen, setIsAddIamgePopupOpen] = useState(false);
    const handleAddImageClick = () => {
      setIsAddIamgePopupOpen(true)
    }
  
    

  
    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (card) => {
      setSelectedCard(card);
    }
  
    const closeAllPopups = () => {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsOpenPopotDelete(false);
      setIsAddIamgePopupOpen(false);
      setSelectedCard(null);
    }
  
  
    //редактирование eUser
    const handleUpdateUser = (userInfo) => {
      api.editProfile(userInfo)
        .then((newValue) => {
          console.log(newValue)
          setCurrentUser(newValue);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(`Ошибка при редактировании профиля ${err}`)
        })
    }
  
  
    //доб Avatar
    const handleUpdateAvatar = (userAvatar) => {
      api.editAvatar(userAvatar.avatar)
        .then((newValue) => {
          setCurrentUser(newValue);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(`Ошибка при обновлении аватара ${err}`)
        })
    }
  
  
    //добавление card
    const handleAddPlaceSubmit = (card) => {
      api.postCard(card)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении карточки ${err}`)
        })
    }
  
  
    //лайк card
    const handleCardLike = (card) => {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
  
      !isLiked
        ? api.putLikeCard(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(`Ошибка при лайке карточки ${err}`)
          })
        : api.deleteLikeCard(card._id)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(`Ошибка при лайке карточки ${err}`)
          })
    }
  
  
    const handleCardDelete = (card) => {
      setIsOpenPopotDelete(true)
      setCardDelete(card)
    }
  
    // eудаление
    const handleCardDeleteItem = (event) => {
      event.preventDefault();
      api.removeCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id))
        setIsOpenPopotDelete(false);
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки ${err}`)
      })
    }
  
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          closeAllPopups();
        }
      }
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }, [])
  
  
    useEffect(() => {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser({ ...res })
        })
        .catch((err) => {
          console.log(`Ошибка при получении данных профиля ${err}`)
        })
    }, []);
  
  
    useEffect(() => {
      api.getCards()
        .then(res => setCards(res))
        .catch((err) => {
          console.log(`Ошибка при получении карточек с сервера ${err}`)
        })
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onAddImage={handleAddImageClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} 
                cards={cards} />
                      <PopupEdit isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <PopupAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <PopupPlace isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupImage isOpen={isAddImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm isOpen={isOpenPopotDelete} onClose={closeAllPopups} onDeleteCard={handleCardDeleteItem} name="confirm-delition" title="Вы уверены?" buttonText="Да"> {/*подтверждение удаления*/}</PopupWithForm>
        </CurrentUserContext.Provider>
    );
}

export default Content;