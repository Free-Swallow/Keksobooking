import {renderCards} from './picture-card.js';
import {getUniqIds} from './util.js';

const filterNode = document.querySelector('.img-filters');
const filterForm = filterNode.querySelector('.img-filters__form');
const filterList = filterNode.querySelector('.img-filters__form').children;
const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const setFilterChange = (list) => {
  const changeFilterHandler = (evt) => {
    if (evt.target.nodeName === 'BUTTON') {

      for (let i = 0; i <= filterList.length - 1; i++) {
        filterList[i].classList.remove('img-filters__button--active');
      }

      evt.target.classList.add('img-filters__button--active');

      if (evt.target.id.includes(FilterType.DEFAULT)) {
        renderCards(list);
      }

      if (evt.target.id.includes(FilterType.DISCUSSED)) {
        renderCards(list.slice().sort((a, b) => b.comments.length - a.comments.length
        ));
      }

      if (evt.target.id.includes(FilterType.RANDOM)) {
        const uniqList = getUniqIds(list.length - 1);
        renderCards(list.filter((item) => uniqList.has(item.id)));
      }
    }
  };

  filterForm.addEventListener('click', changeFilterHandler);
};

export {setFilterChange};
