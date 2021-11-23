function popupMenuOpen(popupMenu) { // This opens the popup menus
  popupMenu.classList.add('popup-menu_opened');
  document.addEventListener('keydown', pressEscapeBtn);
  popupMenu.addEventListener('click', mouseClick);
}

function pressEscapeBtn(evt) { // This handles what happens upon pressing the escape key
  const escKeycode = 27;
  if (evt.keyCode === escKeycode) {
    popupMenuClose(document.querySelector('.popup-menu_opened'));
  }
}

function mouseClick(evt) { // This handles what happens upon mouse click, outside of the zoomed image
  if (evt.target.classList.contains('popup-menu_opened')) {
    popupMenuClose(evt.target);
  }
}

function popupMenuClose(popupMenu) { // This opens the popup menus
  popupMenu.classList.remove('popup-menu_opened');
  document.removeEventListener('keydown', pressEscapeBtn);
  popupMenu.removeEventListener('click', mouseClick);
}

export { popupMenuOpen, pressEscapeBtn, mouseClick, popupMenuClose };
