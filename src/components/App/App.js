import React, { useState, useCallback, useEffect } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from "../../utils/Api.js";
import { ProcessLoadingSpinnerContext } from '../../contexts/ProcessLoadingSpinnerContext.js';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import ImagePopup from '../ImagePopup/ImagePopup.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import ConfirmCardDeletionPopup from '../ConfirmCardDeletionPopup/ConfirmCardDeletionPopup.js';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDeletePopupOpen, setConfirmationDeletePopupOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState('');
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи карточек: ${err}`);
      })
  }, []);

  function openEditProfilePopup() {
    setEditProfilePopupOpen(true);
  };
  function openAddPlacePopup() {
    setAddPlacePopupOpen(true);
  };
  function openEditAvatarPopup() {
    setEditAvatarPopupOpen(true);
  };
  function openConfirmationCardDeletionPopup(card) {
    setConfirmationDeletePopupOpen(true);
    setActiveCardId(card._id);
  };
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  };

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationDeletePopupOpen(false);

    setSelectedCard({});
  }, []);

  
  const closePopupsOnOutsideClick = useCallback((evt) => {
    const target = evt.target;
    if (target.classList.contains('popup__opened')
      || target.classList.contains('popup__close')) {
      closeAllPopups();
    };
  }, [closeAllPopups]);

  function handleUpdateUser(data) {
    setIsProcessLoading(true);
    api.editUserInfo(data.name, data.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе редактировании информации пользователя: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((cardLike) => {
        setCards(cards.map(c => c._id === card._id ? cardLike : c));
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении или снятии лайка карточки: ${err}`);
      })
  };

  function handleCardDelete(activeCardId) {
    setIsProcessLoading(true);
    api.deleteCards(activeCardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== activeCardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при удаления карточки: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  };

  function handleUpdateAvatar(data) {
    setIsProcessLoading(true);
    api.editUserAvatar(data.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе изменения аватара пользователя: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  };

  function handleAddPlaceSubmit(data) {
    setIsProcessLoading(true);
    api.addNewCards(data.name, data.link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе добавления новой карточки: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  };

  return (
    <>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        
        <Main
          onEditProfile={openEditProfilePopup}
          onAddPlace={openAddPlacePopup}
          onEditAvatar={openEditAvatarPopup}
          onConfirmationCardDeletion={openConfirmationCardDeletionPopup}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
         
        />
      </CurrentUserContext.Provider>
      <Footer />

      <CurrentUserContext.Provider value={currentUser}>
      <ProcessLoadingSpinnerContext.Provider value={isProcessLoading}>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />


        <ConfirmCardDeletionPopup
          activeCardId={activeCardId}
          onCardDelete={handleCardDelete}
          isOpened={isConfirmationDeletePopupOpen}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />
        </ProcessLoadingSpinnerContext.Provider>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />
      </CurrentUserContext.Provider>
    </>
  );
}
export default App;