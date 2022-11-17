const scaleControlSmallerNode = document.querySelector('.scale__control--smaller');
const scaleControlBiggerNode = document.querySelector('.scale__control--bigger');
const scaleControlValueNode = document.querySelector('.scale__control--value');
const imgPreviewNode = document.querySelector('.img-upload__preview')
  .querySelector('IMG');
const effectsListNode = document.querySelector('.effects__list');
const sliderNode = document.querySelector('.effect-level__slider');
const levelEffectInput = document.querySelector('.effect-level__value');
const filterDefault = document.querySelector('#effect-none');
const defaultScale = scaleControlValueNode
  .value
  .split('')
  .filter((item) => +item === +item)
  .join('');
const TypeChangeScale = {
  REDUCE: 'reduce',
  INCREASE: 'increase',
};
const SettingsSlider = {
  MIN: 0,
  MAX: 100,
  STEP: 0.1,
  STEP_MARVIN: 1,
  START_VALUE: 100,
};
const ClassesEffect = {
  NONE: 'effect-none',
  CHROME: 'effects__preview--chrome',
  SEPIA: 'effects__preview--sepia',
  MARVIN: 'effects__preview--marvin',
  PHOBOS: 'effects__preview--phobos',
  HEAT: 'effects__preview--heat'
};
const FilterStyles = {
  CHROME: 'grayscale(0)',
  SEPIA: 'sepia(0)',
  MARVIN: 'invert(0)',
  PHOBOS: 'blur(0)',
  HEAT: 'brightness(1)',
};
const SCALE_STEP = 25;

let scale = defaultScale;

// Работа с маштабом для изображения

// Изменение маштаба в стилях
const editImageScale = (value) => {

  // Конвертирование значения для стилей
  const convertScaleValue = (scaleVal) => {
    if (scaleVal >= 100) {
      return `scale(${scaleVal / 100})`;
    }

    return `scale(0.${scaleVal})`;
  };

  imgPreviewNode.style.transform = convertScaleValue(value);
};

// Проверка на минимум, изменение значения Scale
const changeMinScale = () => {
  if (scale <= 25) {
    return;
  }

  scale = +scale - SCALE_STEP;
};

// Проверка на максимум, изменение значения Scale
const changeMaxScale = () => {
  if (scale >= 100) {
    return;
  }

  scale = +scale + SCALE_STEP;
};

const changeScaleValue = (type) => {
  if (type === TypeChangeScale.REDUCE) {
    changeMinScale();
  }
  if (type === TypeChangeScale.INCREASE) {
    changeMaxScale();
  }

  scaleControlValueNode.value = `${scale}%`;
  editImageScale(scale);
};

const reduceScaleHandler = () => changeScaleValue(TypeChangeScale.REDUCE);
const increaseScaleHandler = () => changeScaleValue(TypeChangeScale.INCREASE);

// Смена фильтра изображения
const changeImgEffectHandler = (evt) => {

  if (evt.target.nodeName === 'INPUT') {
    sliderNode.setAttribute('disabled', true);
    imgPreviewNode.removeAttribute('class');
    sliderNode.noUiSlider.updateOptions({
      start: SettingsSlider.START_VALUE,
    });

    if (evt.target.value !== 'none') {
      sliderNode.removeAttribute('disabled');
      imgPreviewNode.classList.add(`effects__preview--${evt.target.value}`);
    }

    if (evt.target.value === 'marvin') {
      sliderNode.noUiSlider.updateOptions({
        step: SettingsSlider.STEP_MARVIN,
      });
    }

    if (evt.target.value !== 'marvin') {
      sliderNode.noUiSlider.updateOptions({
        step: SettingsSlider.STEP,
      });
    }
  }
};

// Добавление обработчиков на контроллеры масштаба
const manageScaleToggle = () => {
  scaleControlSmallerNode.addEventListener('click', reduceScaleHandler);
  scaleControlBiggerNode.addEventListener('click', increaseScaleHandler);
  effectsListNode.addEventListener('click', changeImgEffectHandler);
};

// Работа со слайдером
noUiSlider.create(sliderNode, {
  start: [SettingsSlider.START_VALUE],
  connect: 'lower',
  range: {
    'min': SettingsSlider.MIN,
    'max': SettingsSlider.MAX
  },
  step: SettingsSlider.STEP,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Сброс фильтров
const resetEffectValue = () => {
  imgPreviewNode.style.filter = FilterStyles.CHROME;
  imgPreviewNode.style.filter = FilterStyles.SEPIA;
  imgPreviewNode.style.filter = FilterStyles.MARVIN;
  imgPreviewNode.style.filter = FilterStyles.PHOBOS;
  imgPreviewNode.style.filter = FilterStyles.HEAT;
};

// Изменение выбранного фильтра
const changeValueEffect = (level) => {
  const getCurrentEffect = imgPreviewNode.classList.value;

  switch (getCurrentEffect) {
    case ClassesEffect.CHROME:
      resetEffectValue();
      imgPreviewNode.style.filter = `grayscale(${level / 100})`;
      break;
    case ClassesEffect.SEPIA:
      resetEffectValue();
      imgPreviewNode.style.filter = `sepia(${level / 100})`;
      break;
    case ClassesEffect.MARVIN:
      resetEffectValue();
      imgPreviewNode.style.filter = `invert(${level}%)`;
      break;
    case ClassesEffect.PHOBOS:
      resetEffectValue();
      imgPreviewNode.style.filter = `blur(${level / 34}px)`;
      break;
    case ClassesEffect.HEAT:
      resetEffectValue();
      imgPreviewNode.style.filter = `brightness(${level / 48 + 1})`;
      break;
    default:
      resetEffectValue();
  }
};

// Отслеживание Значение слайдера
const changeSliderHandler = (values, handle) => {
  levelEffectInput.value = values[handle];
  changeValueEffect(values[handle]);
};

// Сброс полей
const resetUploadForm = () => {

  scale = defaultScale;
  editImageScale(scale);
  scaleControlValueNode.value = `${scale}%`;
  imgPreviewNode.removeAttribute('class');
  sliderNode.setAttribute('disabled', true);
  sliderNode.noUiSlider.updateOptions({
    start: SettingsSlider.START_VALUE,
  });
};

// Удаление обработчиков
const removeUploadFormHandlers = () => {
  effectsListNode.removeEventListener('click', changeImgEffectHandler);
  scaleControlSmallerNode.removeEventListener('click', reduceScaleHandler);
  scaleControlBiggerNode.removeEventListener('click', increaseScaleHandler);
};

// Сброс всей формы и обработчиков
const resetLogicForm = () => {
  resetUploadForm();
  removeUploadFormHandlers();
  resetEffectValue();
};

sliderNode.noUiSlider.on('update', changeSliderHandler);
sliderNode.setAttribute('disabled', true);
manageScaleToggle();

export {
  manageScaleToggle,
  resetLogicForm,
};
