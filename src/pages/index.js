import 'regenerator-runtime/runtime';
import {
  avatarImage,logoIcon, menuInputName, menuInputTitle, cardDeleteConfimBtn,
  popupAddCardTitleInput, popupAddCardUrlInput, profileName, profileDescription,
  profileEditButton, addCardButton, profilePopupForm, addCardPopupForm,
  changeAvatarForm, templateElementSelector, formSettings, pofilePicUpdateButton,
  popupProfilePicInput, saveBtnForAddCard, saveBtnForEditProfile,saveBtnForEditProfilePic,
} from '../utils/constants.js';
import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import logoSrc from '../images/logo.svg';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import ConfirmDelPopup from '../components/ConfirmDelPopup.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
///////////////////////////////Api Calls/////////////////////////////////////////
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "10d5550b-e17c-437f-9d04-3dde6b160e5d"
});

async function loadThePage() {
  try {
      const [cards, userData] = await Promise.all([api.getInitialCards(), api.getUserInfo()])
      if ([cards, userData]) {
          userInfo.setUserInfo({ name: userData.name, description: userData.about, avatar: userData.avatar, id: userData._id })
          cardRenderer.renderer(cards);
      }
  }
  catch (err) {
    alert(err)
    console.log(err);
  }
}
loadThePage();
///////////////////////////////End of Api Calls/////////////////////////////////////////

// Logo and Avatar Image
logoIcon.src = logoSrc;

// profile-name and title edit menu
const profilePopup = new PopupWithForm('.popup-menu', saveUserInfo);
profilePopup.setEventListeners();
// This is the UserInfo Object
const userInfo = new UserInfo({ profileName, profileDescription, avatarImage });
// This is the image popup menu
export const imagePopup = new PopupWithImage('#popup-menu_image');
imagePopup.setEventListeners();
// This is the add-card menu
const popupAddCard = new PopupWithForm('#popup-menu_type_add-card', submitAddCardForm);
popupAddCard.setEventListeners();
// This is the Delete Confirmation Popup
const popupDeleteConfirmation = new ConfirmDelPopup('#popup-menu_del-confirm');
popupDeleteConfirmation.setEventListeners();
// This is the Change Avatar Popup
const popupChangeAvatar = new PopupWithForm('#popup-menu_type_change-profilePic', changeAvatar);
popupChangeAvatar.setEventListeners();

/////////////////////////////////Functions/////////////////////////////////////////
function currentUserInfo() {
  const userInformation = userInfo.getUserInfo();
  menuInputName.value = userInformation.name;
  menuInputTitle.value = userInformation.description;
}

profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  profilePopup.open();
  currentUserInfo()
});
async function saveUserInfo() {
  try {
    saveBtnForEditProfile.textContent = 'Saving...';
    const userInputInfo = await api.editUserInfo(menuInputName.value, menuInputTitle.value);
    if (userInputInfo) {
      userInfo.setUserInfo({ name: userInputInfo.name, description: userInputInfo.about, avatar: userInputInfo.avatar, id: userInputInfo._id });
      profilePopup.close();
    }
  } catch (err) {
    alert(err);
  }
  finally {
    saveBtnForEditProfile.textContent = 'Save';
  }
}

addCardButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupAddCard.open();
});
async function submitAddCardForm() {
  try {
    saveBtnForAddCard.textContent = 'Creation in progress...';
    const data = await api.uploadUserCard(popupAddCardTitleInput.value, popupAddCardUrlInput.value)
    const cardElement = createCard(data);
    cardRenderer.addItem(cardElement);
    popupAddCard.close();
  } catch (err) {
    alert(err);
  }
  finally {
    saveBtnForAddCard.textContent = 'Save';
  }
}

async function addLike(cardId) {
  try{
    const response = await api.like(cardId);
    if (response) {
      console.log('Like was clicked', response.likes);
      return response.likes;
    }
  } catch (err) {
    alert(err);
  }
}
async function removeLike(cardId) {
  try {
  const response = await api.dislike(cardId);
  if (response) {
    console.log('Dislike was clicked', response.likes);
    return response.likes;
  }
  } catch (err) {
    alert(err);
  }
}

function openDeleteConfirmPopup(card, cardId) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.confirmDeletion(async () => {
    try {
      cardDeleteConfimBtn.textContent = 'Deleting...';
    const response = await api.deleteCard(cardId);
    console.log(response);
    if (response) {
      card.remove();
      popupDeleteConfirmation.close();
    }
    } catch (err) {
      alert(err);
    }
    finally {
      cardDeleteConfimBtn.textContent = 'Delete';
    }
  });
}

pofilePicUpdateButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupChangeAvatar.open();
});

async function changeAvatar() {
  try {
    saveBtnForEditProfilePic.textContent = 'Saving...';
  const response = await api.setUserAvatar(popupProfilePicInput.value);  // This is the URL of the new avatar
  if (response) {
    userInfo.setUserInfo({ name: response.name, description: response.about, avatar: response.avatar, id: response._id });
    popupChangeAvatar.close();
  }
  } catch (err) {
    alert(err);
  }
  finally {
    saveBtnForEditProfilePic.textContent = 'Save';
  }
}

// This Creates the Initial Cards on the Page.
function createCard(cardData) {
  return new Card(cardData, templateElementSelector, imagePopup.open, addLike,removeLike, openDeleteConfirmPopup, userInfo).renderCard();
}

const cardRenderer = new Section({
  renderer: (element) => {
    const newCard = createCard(element);
    cardRenderer.addItem(newCard);
  }
}, '.cards__list');
/////////////////////////////////End of Functions/////////////////////////////////////////

// Validations
const profileFormValidator = new FormValidator(formSettings, profilePopupForm);
const cardFormValidator = new FormValidator(formSettings, addCardPopupForm);
const avatarFormValidator = new FormValidator(formSettings, changeAvatarForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation()
