const bodyPage = document.body;
const ClassList = {
  HIDDEN_CLASS: 'hidden',
  MODAL_CLASS: 'modal-open',
};
const StateWords = {
  ADD: 'add',
  REMOVE: 'remove'
};
const KeysClose = {
  ESC: 'Escape'
};

// Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomPositiveInteger = (valueA = 0, valueB = 25) => {
  const lower = Math.ceil(Math.min(Math.abs(valueA), Math.abs(valueB)));
  const upper = Math.floor(Math.max(Math.abs(valueA), Math.abs(valueB)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки максимальной длины строки

const isCheckLength = (checkString, maxLength = 200) => checkString.length <= maxLength;

// Управление модальными окнами
// Перевод старницы в состояние модал.окна, показ окна

const controlModalState = (modal, state) => {
  if (state === StateWords.ADD) {
    bodyPage.classList.add(ClassList.MODAL_CLASS);
    modal.classList.remove(ClassList.HIDDEN_CLASS);
  }
  if (state === StateWords.REMOVE) {
    bodyPage.classList.remove(ClassList.MODAL_CLASS);
    modal.classList.add(ClassList.HIDDEN_CLASS);
  }
};

// Добавление обработчиков закрытия на модальные окна

const addModalListener = (addState, removeState, closeButton, reset) => {
  function closeModalHandle() {
    closeModal();
  }

  function closeKeyModalHandle(evt) {
    if (evt.target.matches('input:focus') || evt.target.matches('textarea:focus')) {
      return false;
    }

    if (evt.key === KeysClose.ESC) {
      evt.preventDefault();
      closeModal();

    }
  }

  function closeModal() {
    removeState();
    reset();
    closeButton.removeEventListener('click', closeModalHandle);
    document.removeEventListener('keydown', closeKeyModalHandle);
  }

  closeButton.addEventListener('click', closeModalHandle);
  document.addEventListener('keydown', closeKeyModalHandle);

  addState();
};

// Поискать карточки в списке по айди таргета

const findCard = (evt, list) => {
  const map = new Map(list.map((item) => [item.id, item]));
  const id = Number(evt.target.id);

  return map.get(id);
};

const getUniqIds = (maxLength) => {
  const uniqListId = new Set;
  while (uniqListId.size < 10) {
    uniqListId.add(getRandomPositiveInteger(0, maxLength));
  }

  return uniqListId;
};

export {
  getRandomPositiveInteger,
  isCheckLength,
  ClassList,
  controlModalState,
  StateWords,
  KeysClose,
  addModalListener,
  findCard,
  getUniqIds,
};
