export default class Card {
  constructor(cardData, templateElementSelector, onImageClick, addLike, removeLike, openDeleteConfirmPopup, userInfo) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = document.querySelector(templateElementSelector).content.querySelector('.card');
    this._onImageClick = onImageClick;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._openDeleteConfirmPopup = openDeleteConfirmPopup;
    this._myId = userInfo._profileId;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._trashBtn = this._element.querySelector('.card__erase');

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardImagePopupButton();
    });

    this._likeBtn.addEventListener('click', async (evt) => {
      if (!this._likeBtn.classList.contains('card__like-button_active')) {
        try {
          const likes = await this._addLike(this._cardId);
          if (likes) {
            evt.target.classList.add('card__like-button_active');
            this._likeCount.textContent = likes.length;
            this._likeCount.style.display = 'block';
          }
        }
        catch (err) {
          alert(err);
          console.log(err);
        }
      } else {
        try {
          const likes = await this._removeLike(this._cardId);
          if (likes) {
            evt.target.classList.remove('card__like-button_active');
            this._likeCount.textContent = likes.length;
            if (likes.length === 0) {
              this._likeCount.style.display = 'none';
            }
          }
        }
        catch (err) {
          alert(err);
          console.log(err);
        }
      }
    });

    this._trashBtn.addEventListener('click', () => {
      this._openDeleteConfirmPopup(this._element, this._cardId);
    });
  }

  _getUserLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._likeBtn.classList.add('card__like-button_active');
      }
    });
  }

  _handleCardImagePopupButton() {
    this._onImageClick({ link: this._link, text: this._name });
  }

  renderCard() {
    this._element = this._template.cloneNode(true);
    this._likeCount = this._element.querySelector('.card__like-count');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
    if (this._likes.length > 0) {
      this._likeCount.textContent = this._likes.length;
      this._likeCount.style.display = 'block'
    }
    else {
      this._likeCount.style.display = "none";
    }

     if (this._ownerId !== this._myId) {
       this._element.querySelector('.card__erase').style.display = "none";
     } else {
      this._element.querySelector('.card__erase').style.display = "block";
     }
    this._setEventListeners();
    this._getUserLikes();

    return this._element;
    }
}
