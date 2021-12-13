import '../pages/index.css';
import initialCards from './initial-cards.js';
import Card from './Card.js';
import avatarImagerSrc from '../images/avatar_image.png';
import logoSrc from '../images/logo.svg';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
export const avatarImage = document.getElementById('avatar_image');
avatarImage.src = avatarImagerSrc;
export const logoIcon = document.getElementById('logo-icon');
logoIcon.src = logoSrc;
export const menuInputName = document.querySelector('.popup-menu__input_type_name');
export const menuInputTitle = document.querySelector('.popup-menu__input_type_title');
export const profileName = document.querySelector('.profile-menu__full-name');
export const profileTitleDescription = document.querySelector('.profile-menu__title');
export const profileEditButton = document.querySelector('.profile-menu__edit-button');
export const popupAddCardTitleInput = document.querySelector('#input_type_card_name');
export const popupAddCardUrlInput = document.querySelector('.popup-menu__input_type_url');
export const addCardButton = document.querySelector('.profile-menu__add-button');
export const cardsList = document.querySelector('.cards__list');
export const profilePopupForm = document.querySelector('#profile-form');
export const addCardPopupForm = document.querySelector('#add-card-form');


// profile-name and title edit menu
const profilePopup = new PopupWithForm('.popup-menu', saveUserInfo);
profilePopup.setEventListeners();

// add-card menu
const popupAddCard = new PopupWithForm('#popup-menu_type_add-card', submitAddCardForm);
popupAddCard.setEventListeners();

// image popup menu
export const imagePopup = new PopupWithImage('#popup-menu_image');
imagePopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, templateElementSelector, imagePopup.open);
  cardsList.prepend(card.renderCard());
}

// Template
const templateElementSelector = '#card-template';
initialCards.forEach((cardData) => {
  createCard(cardData);
});

// Validations
const formSettings = {
  formSelector: ".popup-menu__submit-form",
  inputSelector: ".popup-menu__input",
  submitButtonSelector: ".popup-menu__save-button",
  inactiveButtonClass: "popup-menu__save-button_disabled",
  inputErrorClass: "popup-menu__input_type_error",
  errorClass: "popup-menu__error_visible"
};

const profileFormValidator = new FormValidator(formSettings, profilePopupForm);
const cardFormValidator = new FormValidator(formSettings, addCardPopupForm);


// this class creates new instances of PopupWithForm and validates the form
profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  profilePopup.open();
  profilePopup.setEventListeners();
});

addCardButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupAddCard.open();
  popupAddCard.setEventListeners();
});


// this new class instance renders new cards on the page
const cardRenderer = new Section({
  items: initialCards, renderer: (element) => {
    const newCard = createCard(element);
    cardRenderer.addItem(newCard);
  }
}, '.cards');

function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardElement = createCard({ name: popupAddCardTitleInput.value, link: popupAddCardUrlInput.value })
  cardRenderer.addItem(cardElement);
  popupAddCard.close();
}


// this new class instance renders information about the user
const userInfo = new UserInfo({ profileName, profileTitleDescription });
function saveUserInfo(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({ name: menuInputName.value, description: menuInputTitle.value });
  profilePopup.close();
}

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
