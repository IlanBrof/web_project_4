import initialCards from './initial-cards.js';
import { openPopup, closePopup } from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// profile-name and title edit menu
const profilePopup = document.querySelector('.popup-menu');
const profileMenuEditForm = profilePopup.querySelector('.popup-menu__edit-form');
const profileCloseButton = profilePopup.querySelector('.popup-menu__close-button');
const menuInputName = profilePopup.querySelector('.popup-menu__input_type_name');
const menuInputTitle = profilePopup.querySelector('.popup-menu__input_type_title');
const profileName = document.querySelector('.profile-menu__full-name');
const profileTitleDescription = document.querySelector('.profile-menu__title');
const profileEditButton = document.querySelector('.profile-menu__edit-button');

// add-card menu
const popupAddCard = document.querySelector('#popup-menu_type_add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup-menu__close-button');
const popupAddCardTitleInput = popupAddCard.querySelector('.popup-menu__input_type_title');
const popupAddCardUrlInput = popupAddCard.querySelector('.popup-menu__input_type_url');
const addCardButton = document.querySelector('.profile-menu__add-button');
const cardsList = document.querySelector('.cards__list');

// image popup menu
export const popupImageMenu = document.querySelector('#popup-menu_image');
const popupImageCloseBtn = popupImageMenu.querySelector('#image_close_button');
export const popupImage = popupImageMenu.querySelector('.popup-menu__image');
export const popupImageText = popupImageMenu.querySelector('.popup-menu__text');

function editProfileContent() { // Stores Profile name and title
  menuInputName.value = profileName.textContent;
  menuInputTitle.value = profileTitleDescription.textContent;
}

profileMenuEditForm.addEventListener('submit', (evt) => { // Handles the event that happens upon clicking the submit button of the popup
  evt.preventDefault();
  profileName.textContent = menuInputName.value;
  profileTitleDescription.textContent = menuInputTitle.value;
  closePopup(profilePopup);
});

profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

// add card menu
function editAddCardContent() {
  popupAddCardTitleInput.value = "";
  popupAddCardUrlInput.value = "";
};

popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});

popupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardElement = { name: popupAddCardTitleInput.value, link: popupAddCardUrlInput.value };
  createCard(cardElement);
  closePopup(popupAddCard);
});

function createCard(cardData) {
  const card = new Card(cardData, templateElementSelector);
  cardsList.prepend(card.render());
}

// Template
const templateElementSelector = '#card-template';
initialCards.forEach((cardData) => {
  createCard(cardData);
});

popupImageCloseBtn.addEventListener('click', () => {
  closePopup(popupImageMenu);
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

const profileFormValidator = new FormValidator(formSettings, profilePopup);
const cardFormValidator = new FormValidator(formSettings, popupAddCard);

profileEditButton.addEventListener('click', () => {
  editProfileContent();
  profileFormValidator.checkInitialformValidity();
  openPopup(profilePopup);
});

addCardButton.addEventListener('click', () => {
  editAddCardContent();
  cardFormValidator.checkInitialformValidity();
  openPopup(popupAddCard);
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

