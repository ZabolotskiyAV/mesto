let container = document.querySelector('.container');
let songsContainer = container.querySelector('.songs-container');

let addButton = container.querySelector('.form__submit-btn_action_add');
let resetButton = container.querySelector('.form__submit-btn_action_reset');

function renderAdded() {
  let songs = songsContainer.querySelectorAll('.song');
  let noSongsElement = container.querySelector('.no-songs');
  
  if (songs.length === 0) {
    resetButton.setAttribute('disabled', true);
    resetButton.classList.add('form__submit-btn_disabled');
    noSongsElement.classList.remove('no-songs_hidden');
  }
  else {
    resetButton.removeAttribute('disabled', true);
    resetButton.classList.remove('form__submit-btn_disabled');
    noSongsElement.classList.add('no-songs_hidden');
  }
}

function addSong() {
  let artist = document.querySelector('.input__text_type_artist');
  let song = document.querySelector('.input__text_type_song');
  songsContainer.insertAdjacentHTML ('beforeend', `
    <div class="song">
      <h4 class="song__artist">${artist.value}</h4>
      <p class="song__title">${song.value}</p>
      <button class="song__like"></button>
    </div>
    `);
  renderAdded();
}

addButton.addEventListener('click', addSong);

renderAdded();