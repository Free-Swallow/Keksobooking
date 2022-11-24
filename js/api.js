import {renderCards} from './picture-card.js';
import {renderFullPicture} from './full-picture.js';
import {createMessage, TypesMessage} from './message.js';
import {setFilterChange} from './filter.js';

const URL_DATA = 'https://24.javascript.pages.academy/kekstagram/data';

fetch(URL_DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Ошибка загрузки данных, попробуйте обновить страницу.
    Статус ошибки: ${response.status} ${response.statusText}`);
  })
  .then((data) => {
    renderCards(data);
    renderFullPicture(data);
    setFilterChange(data);
  })
  .catch((err) => {
    createMessage(err, TypesMessage.ERROR);
  });
