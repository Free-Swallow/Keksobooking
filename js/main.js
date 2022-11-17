import {changeUploadFile, closeAndResetModal} from './upload-picture.js';
import {setUserFormSubmit} from './user-form.js';
import './image-editing.js';
import './api.js';
import './message.js';

changeUploadFile();

setUserFormSubmit(closeAndResetModal);
