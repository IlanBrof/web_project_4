const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    alt: "Yosemite"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    alt: "A Lake"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    alt: "Mountains"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    alt: "Latemar"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    alt: "Vanoise"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    alt: "The Lago"
  }
];


// profile-name and title edit menu
const popup = document.querySelector('.popup-menu');
const profileMenuEditForm = popup.querySelector('.popup-menu__edit-form');
const menuCloseButton = popup.querySelector('.popup-menu__close-button');
const menuInputName = popup.querySelector('.popup-menu__input_type_name');
const menuInputTitle = popup.querySelector('.popup-menu__input_type_title');
const profileName = document.querySelector('.profile-menu__full-name');
const profileTitleDescription = document.querySelector('.profile-menu__title');
const profileEditButton = document.querySelector('.profile-menu__edit-button');

// add-card menu
const popupAddCard = document.querySelector('#popup-menu_type_add-card');
const popupAddCardForm = document.querySelector('#add-card-form');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup-menu__close-button');
const popupAddCardTitleInput = popupAddCard.querySelector('.popup-menu__input_type_title');
const popupAddCardUrlInput = popupAddCard.querySelector('.popup-menu__input_type_url');
const addCardButton = document.querySelector('.profile-menu__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');
const cardsList = document.querySelector('.cards__list');
const likeButton = cardTemplate.querySelector('.card__like-button');

// image popup menu
const popupImageMenu = document.querySelector('#popup-menu_image');
const popupImageContainer = popupImageMenu.querySelector('.popup-menu_image-container');
const popupImageCloseBtn = popupImageMenu.querySelector('#image_close_button');
const popupImageBox = popupImageMenu.querySelector('.popup-menu__image-box');
const popupImage = popupImageMenu.querySelector('.popup-menu__image');
const popupImageText = popupImageMenu.querySelector('.popup-menu__text');



// popup open and close
function popupMenuOpen(popupMenu) {
  popupMenu.classList.add('popup-menu_opened');
  document.addEventListener('keydown', pressEscapeBtn);
  popupMenu.addEventListener('click', mouseClick);
}

function pressEscapeBtn(evt) {
  const escKeycode = 27;
  if (evt.keyCode === escKeycode) {
    popupMenuClose(document.querySelector('.popup-menu_opened'));
  }
}

function mouseClick(evt) {
  if (evt.target.classList.contains('popup-menu_opened')) {
    popupMenuClose(evt.target);
  }
}

function popupMenuClose(popupMenu) {
  popupMenu.classList.remove('popup-menu_opened');
  document.removeEventListener('keydown', pressEscapeBtn);
  popupMenu.removeEventListener('click', mouseClick);
}

function editProfileContent() {
  menuInputName.value = profileName.textContent;
  menuInputTitle.value = profileTitleDescription.textContent;
}

profileMenuEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = menuInputName.value;
  profileTitleDescription.textContent = menuInputTitle.value;
  popupMenuClose(popup);
});

profileEditButton.addEventListener('click', () => {
  editProfileContent();
  popupMenuOpen(popup);
  checkInitialformValidity(profileMenuEditForm, formElements);
});

menuCloseButton.addEventListener('click', () => {
  popupMenuClose(popup);
});

// add card menu
function editAddCardContent() {
  popupAddCardTitleInput.value = "";
  popupAddCardUrlInput.value = "";
};

addCardButton.addEventListener('click', () => {
  editAddCardContent();
  popupMenuOpen(popupAddCard);
  checkInitialformValidity(popupAddCard, formElements);
});

popupAddCardCloseButton.addEventListener('click', () => {
  popupMenuClose(popupAddCard);
});

popupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const createNewCard = addNewCard({
    name: popupAddCardTitleInput.value,
    link: popupAddCardUrlInput.value,
    alt: popupAddCardTitleInput.value
  });
  cardsList.prepend(createNewCard);
  popupMenuClose(popupAddCard);
});

// Template
function addNewCard({ name, link, alt }) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector('.card__image');
  img.src = link;
  img.alt = alt;
  card.querySelector('.card__text').textContent = name;

  const eraseButton = card.querySelector(".card__erase");
  eraseButton.addEventListener('click', function () {
    const eraseCard = eraseButton.closest(".card");
    eraseCard.remove();
});

  card.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active')
  });

  function popupImageOpen() {
    popupImageMenu.classList.add('popup-menu_opened');
    document.addEventListener('keydown', pressEscapeBtn);
    popupImageMenu.addEventListener('click', mouseClick);
  }


  card.querySelector('.card__image').addEventListener('click', () => {
    popupImageOpen();
    popupImage.src = img.src;
    popupImage.alt = img.alt;
    popupImageText.textContent = name;
  });

  return card;
}

initialCards.forEach((intialCardContent) => {
  cardsList.prepend(addNewCard(intialCardContent));
});

function popupImageClose() {
  popupImageMenu.classList.remove('popup-menu_opened');
  document.removeEventListener('keydown', pressEscapeBtn);
  popupImageMenu.removeEventListener('click', mouseClick);
}

popupImageCloseBtn.addEventListener('click', () => {
  popupImageClose();


});

