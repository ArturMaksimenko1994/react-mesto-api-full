import React, { useContext } from "react";
import Card from './../Card/Card.js'
import CurrentUserContext from './../../contexts/CurrentUserContext.js'

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onAddImage, onCardClick, onCardLike, onCardDelete, cards }) => {

  const userContext = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__user">
            <div className="profile__img" >
              <img className="profile__avatar" src={userContext.avatar} alt="фотография пользователя" />
            </div>
            <div className="profile__user-shadow">
              <span className="profile__icons" onClick={onEditAvatar}>
                <p className="profile__user-icons"></p>
              </span>
            </div>
          </div>
          <div className="profile__settings">
            <div className="profile__description">
              <h1 className="profile__name">{userContext.name}</h1>
              <button className="profile__edit" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__post">{userContext.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace} ></button>
      </section>

      <section className="elements">
        <ul className="element">
          {cards
            ? cards.map(card => <Card card={card} onCardClick={onCardClick} onImageClick={onAddImage} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />)
            : null
          }
        </ul>
      </section>
    </main>
  );
}
export default Main;

