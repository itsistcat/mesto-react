import { useEffect, useState } from "react";
import { api } from "../../utils/Api.js";
import Card from "../Card/Card.js";

export default function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [cards, renderItems] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, cards]) => {
          setUserName(user.name);
          setUserDescription(user.about);
          setUserAvatar(user.avatar);
          renderItems(cards);
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, []);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__container-avatar">
          <img src={userAvatar} alt="Аватарка" className="profile__avatar"
            onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button type="button" aria-label="редактировать"
            className="profile__edit-btn" onClick={props.onEditProfile} />
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button type="button" aria-label="добавить"
          className="profile__add-btn" onClick={props.onAddPlace} />
      </section>

      <section className="elements">
        {
          cards.map((card) => (
            <Card key={card._id} card={card} 
            handlePopup={props} />
          ))
        }
      </section>

    </main>
  );
}