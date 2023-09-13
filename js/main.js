import './form.js';
import './scale.js';
import './effects.js';
import './open-photo.js';
import './messages.js';

import { createImages } from './create-miniature-images.js';
import { getData } from './api.js';
import { errorAlert } from './util.js';
import { closeEditingModal } from './form.js';
import { showFilters, setDebouncedFilter } from './miniature-images-filter.js';
import { setPreviewPictureListener } from './upload.js';
import { openPicture } from './open-photo.js';

setPreviewPictureListener();
closeEditingModal();

try {
  const data = await getData();
  createImages(data);
  showFilters();
  setDebouncedFilter(data);
  openPicture(data);
} catch (err) {
  errorAlert(err.message);
}
