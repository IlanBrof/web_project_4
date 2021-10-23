let popup = document.querySelector('.popup-menu');
let profileMenuEditForm = popup.querySelector('.popup-menu__edit-form');
let menuCloseButton = popup.querySelector('.popup-menu__close-button');
let menuInputName = popup.querySelector('.popup-menu__input_type_name');
let menuInputTitle = popup.querySelector('.popup-menu__input_type_title');
let profileName = document.querySelector('.profile-menu__full-name');
let profileTitleDescription = document.querySelector('.profile-menu__title');
let profileEditButton = document.querySelector('.profile-menu__edit-button');

function popupMenuOpen() {
  popup.classList.add('popup-menu_opened');
  menuInputName.value = profileName.textContent;
  menuInputTitle.value = profileTitleDescription.textContent;
}

function popupCloseMenu() {
  popup.classList.remove('popup-menu_opened');
}

profileEditButton.addEventListener('click', popupMenuOpen);
menuCloseButton.addEventListener('click', popupCloseMenu);

profileMenuEditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = menuInputName.value;
  profileTitleDescription.textContent = menuInputTitle.value;
  popupCloseMenu();
});
