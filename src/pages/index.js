import {
  avatarImage,
  logoIcon,
  menuInputName,
  menuInputTitle,
  profileName,
  profileDescription,
  profileEditButton,
  popupAddCardTitleInput,
  popupAddCardUrlInput,
  addCardButton,
  profilePopupForm,
  addCardPopupForm,
  templateElementSelector,
  formSettings
} from '../utils/constants.js';
import './index.css';
import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import avatarImagerSrc from '../images/avatar_image.png';
import logoSrc from '../images/logo.svg';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

// Logo and Avatar Image
avatarImage.src = avatarImagerSrc;
logoIcon.src = logoSrc;

// profile-name and title edit menu
const profilePopup = new PopupWithForm('.popup-menu', saveUserInfo);
profilePopup.setEventListeners();

const userInfo = new UserInfo({ profileName, profileDescription });

function currentUserInfo() {
  const userInformation = userInfo.getUserInfo();
  menuInputName.value = userInformation.name;
  menuInputTitle.value = userInformation.description;
}

function saveUserInfo(inputInfo) {
  userInfo.setUserInfo({ menuInputName: inputInfo.userName, menuInputTitle: inputInfo.title });
  profilePopup.close();
}

profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  profilePopup.open();
  currentUserInfo()
});

// add-card menu
const popupAddCard = new PopupWithForm('#popup-menu_type_add-card', submitAddCardForm);
popupAddCard.setEventListeners();

function submitAddCardForm(inputInfo) {
  const cardElement = createCard(inputInfo);
  cardRenderer.addItem(cardElement);
  popupAddCard.close();
}

addCardButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupAddCard.open();
});

// image popup menu
export const imagePopup = new PopupWithImage('#popup-menu_image');
imagePopup.setEventListeners();

// This Creates the Initial Cards on the Page.
function createCard(cardData) {
  return new Card(cardData, templateElementSelector, imagePopup.open).renderCard();
}

const cardRenderer = new Section({
  items: initialCards, renderer: (element) => {
    const newCard = createCard(element);
    cardRenderer.addItem(newCard);
  }
}, '.cards__list');
cardRenderer.renderer();

// Validations
const profileFormValidator = new FormValidator(formSettings, profilePopupForm);
const cardFormValidator = new FormValidator(formSettings, addCardPopupForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
