function openPopup(popupMenu) { // This opens the popup menus
  popupMenu.classList.add('popup-menu_opened');
  document.addEventListener('keydown', handleEscapeBtn);
  popupMenu.addEventListener('click', handleMouseClick);
}

function handleEscapeBtn(evt) { // This handles what happens upon pressing the escape key
  const escKeycode = 27;
  if (evt.keyCode === escKeycode) {
    closePopup(document.querySelector('.popup-menu_opened'));
  }
}

function handleMouseClick(evt) { // This handles what happens upon mouse click, outside of the zoomed image
  if (evt.target.classList.contains('popup-menu_opened')) {
    closePopup(evt.target);
  }
}

function closePopup(popupMenu) { // This opens the popup menus
  popupMenu.classList.remove('popup-menu_opened');
  document.removeEventListener('keydown', handleEscapeBtn);
  popupMenu.removeEventListener('click', handleMouseClick);
}

export { openPopup, handleEscapeBtn, handleMouseClick, closePopup };
