import React, { useState, useCallback, useEffect } from 'react';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDeletePopupOpen, setConfirmationDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function openEditProfilePopup() {
    setEditProfilePopupOpen(true);
  };
  function openAddPlacePopup() {
    setAddPlacePopupOpen(true);
  };
  function openEditAvatarPopup() {
    setEditAvatarPopupOpen(true);
  };
  function openConfirmationCardDeletionPopup() {
    setConfirmationDeletePopupOpen(true);
  };
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  };

  const closeAllPopups = useCallback(() => {
    isEditProfilePopupOpen && setEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setAddPlacePopupOpen(false);
    isEditAvatarPopupOpen && setEditAvatarPopupOpen(false);
    isConfirmationDeletePopupOpen && setConfirmationDeletePopupOpen(false);
    selectedCard && setSelectedCard({});
  }, [isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isConfirmationDeletePopupOpen,
    selectedCard]);

  const closePopupsOnOutsideClick = useCallback((evt) => {
    if (evt.target.classList.contains('popup__opened')
      || evt.target.classList.contains('popup__close')) {
      closeAllPopups();
    };
  }, [closeAllPopups]);

  // useEffect(() => {
  //   const closePopupsOnKeyPressEsc = evt => {
  //     if (evt.key === 'Escape'
  //       && (isEditProfilePopupOpen
  //         || isAddPlacePopupOpen
  //         || isEditAvatarPopupOpen
  //         || isConfirmationDeletePopupOpen
  //         || selectedCard)) {
  //       closeAllPopups();
  //     };
  //   };

  //   document.addEventListener('keydown', closePopupsOnKeyPressEsc);
  //   return () => {
  //     document.removeEventListener('keydown', closePopupsOnKeyPressEsc);
  //   };
  // }, [isEditProfilePopupOpen,
  //   isAddPlacePopupOpen,
  //   isEditAvatarPopupOpen,
  //   isConfirmationDeletePopupOpen,
  //   selectedCard, closeAllPopups]);

  return (
    <>
      <Header />
      <Main
        onEditProfile={openEditProfilePopup}
        onAddPlace={openAddPlacePopup}
        onEditAvatar={openEditAvatarPopup}
        onConfirmationCardDeletion={openConfirmationCardDeletionPopup}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm popup={{
        classSelector: "edit-profile",
        formName: "profileEditor",
        title: "Редактировать профиль",
        submitBtn: "Сохранить"
      }}
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      >
        <fieldset className="popup__block">
          <div className="popup__input-element">
            <input id="input-name" name="name" type="text" defaultValue="" placeholder="Имя" minLength="2" maxLength="40" required
              className="popup__input popup__input_name" />
            <span className="popup__input-error" id="nameInput-error" />
          </div>

          <div className="popup__input-element">
            <input id="input-job" name="job" type="text" defaultValue="" placeholder="О себе" minLength="2" maxLength="200" required
              className="popup__input popup__input_job" />
            <span className="popup__input-error" id="jobInput-error" />
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{
        classSelector: "edit-avatar",
        formName: "avatarEditor",
        title: "Обновить аватар",
        submitBtn: "Сохранить"
      }}
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      >
        <fieldset className="popup__block">
          <div className="popup__input-element">
            <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" defaultValue="" required
              className="popup__input popup__input_avatar" />
            <span className="popup__input-error" id="typeAva-error" />
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{
        classSelector: "add-place",
        formName: "placeAdding",
        title: "Новое место",
        submitBtn: "Создать",
      }}
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      >
        <fieldset className="popup__block">
          <div className="popup__input-element">
            <input name="name" type="text" placeholder="Название" defaultValue="" minLength="1" maxLength="30" required
              className="popup__input popup__input_place" />
            <span className="popup__input-error" id="typePlace-error" />
          </div>
          <div className="popup__input-element">
            <input name="link" type="url" id="typeUrl" placeholder="Ссылка на изображение" defaultValue="" required
              className="popup__input popup__input_url" />
            <span className="popup__input-error" id="typeUrl-error" />
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{
        classSelector: "delete-place",
        formName: "photocardDeletion",
        title: "Вы уверены?",
        submitBtn: "Да"
      }}
        isOpened={isConfirmationDeletePopupOpen}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      />
    </>
  );
}
export default App;