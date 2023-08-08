const FILTERS = {
  none: {
    name: 'none',
    min: 1,
    max: 100,
    step: 1,
    start: 100,
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const DEFAULT_FILTER = FILTERS.none;

const uploadForm = document.querySelector('.img-upload__form');
const uploadPrewiew = uploadForm.querySelector('.img-upload__preview img');
const filterSlider = uploadForm.querySelector('.effect-level__slider');
const filterLevelValue = uploadForm.querySelector('.effect-level__value');
const filterLevel = uploadForm.querySelector('.effect-level');
const filterForm = document.querySelector('.effects');

let currentFilter = DEFAULT_FILTER;

noUiSlider.create((filterSlider), {
  range: {
    min: DEFAULT_FILTER.min,
    max: DEFAULT_FILTER.max,
  },
  step: DEFAULT_FILTER.step,
  start: DEFAULT_FILTER.max,
  connect: 'lower',
});

const updateSlider = () => {
  filterSlider.classList.remove('hidden');
  filterLevel.classList.remove('hidden');
  filterSlider.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max,
    },
    step: currentFilter.step,
    start: currentFilter.max,
  });

  if (currentFilter === DEFAULT_FILTER) {
    filterSlider.classList.add('hidden');
    filterLevel.classList.add('hidden');
  }
};

const onFiltersChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentFilter = FILTERS[evt.target.value];
    updateSlider();
  }
};

const onFiltersUpdate = () => {
  uploadPrewiew.style.filter = 'none';
  uploadPrewiew.className = '';
  filterLevelValue.value = '';
  if (currentFilter === DEFAULT_FILTER) {
    return;
  }
  const sliderValue = filterSlider.noUiSlider.get();
  uploadPrewiew.style.filter = `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  uploadPrewiew.classList.add(`effects__preview--${currentFilter.name}`);
  filterLevelValue.value = sliderValue;
};

filterForm.addEventListener('change', onFiltersChange);
filterSlider.noUiSlider.on('update', onFiltersUpdate);

const resetEffects = () => {
  currentFilter = DEFAULT_FILTER;
  updateSlider();
};

export { resetEffects };
