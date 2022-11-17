import {KeysClose} from './util.js';

const templateSuccessNode = document.querySelector('#success').content;
const templateErrorNode = document.querySelector('#error').content;
const messageSuccessNode = templateSuccessNode.querySelector('section');
const messageErrorNode = templateErrorNode.querySelector('section');
const TypesMessage = {
  ERROR: 'Error',
  INFO: 'Informative',
  SUCCESS: 'Success',
};

const createMessage = (text, type) => {
  const message = document.createElement('div');
  const messageText = document.createElement('div');
  const messageLiner = document.createElement('div');
  let timer = 98;

  const timerLiner = () => {
    if (timer <= 0) {
      message.remove();
      return;
    }

    timer = timer - 0.5;
    messageLiner.style.width = `${timer}%`;
    setTimeout(timerLiner, 25);
  };

  message.style.width = '300px';
  message.style.minHeight = '60px';
  message.style.top = '40px';
  message.style.left = '40px';
  message.style.backgroundColor = 'white';
  message.style.borderRadius = '10px';
  message.style.borderBottomLeftRadius = '0';
  message.style.position = 'absolute';
  message.style.color = 'black';
  message.style.fontSize = '16px';
  message.style.textTransform = 'none';

  messageText.textContent = `${text}`;
  messageText.style.padding = '20px';
  messageText.style.paddingBottom = '0';

  if (type === TypesMessage.ERROR) {
    messageLiner.style.backgroundColor = '#CB4154';
  }

  if (type === TypesMessage.INFO) {
    messageLiner.style.backgroundColor = '#00BFFF';
  }

  messageLiner.style.width = '98%';
  messageLiner.style.height = '3px';
  messageLiner.style.marginBottom = '0';
  messageLiner.style.marginTop = '20px';

  document.body.appendChild(message);
  message.appendChild(messageText);
  message.appendChild(messageLiner);
  timerLiner();
};

const renderMessage = (popup, type) => {
  const cloneMessage = popup.cloneNode(true);
  cloneMessage.style.zIndex = '100';
  let closeButton;

  if (type === TypesMessage.SUCCESS) {
    closeButton = cloneMessage.querySelector('.success__button');
  }
  if (type === TypesMessage.ERROR) {
    closeButton = cloneMessage.querySelector('.error__button');
  }

  document.body.append(cloneMessage);

  function closeMessage() {
    cloneMessage.remove();
    closeButton.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', closeMessageKeyHandler);
  }

  function closeMessageClickHandler() {
    closeMessage();
  }

  function closeMessageKeyHandler(evt) {
    if (evt.key === KeysClose.ESC) {
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessageClickHandler);
  document.addEventListener('keydown', closeMessageKeyHandler);
};

const renderSuccessMessage = () => renderMessage(messageSuccessNode, TypesMessage.SUCCESS);
const renderErrorMessage = () => renderMessage(messageErrorNode, TypesMessage.ERROR);

export {
  createMessage,
  TypesMessage,
  renderSuccessMessage,
  renderErrorMessage
};
