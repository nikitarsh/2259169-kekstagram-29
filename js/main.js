import './form.js';
import './scale.js';
import './filters.js';
import './gallery.js';
import './messages.js';

import { createImages } from './create-miniature-images.js';
import { getData } from './api.js';
import { errorAlert } from './util.js';


try {
  const data = await getData();
  createImages(data);
} catch (err) {
  errorAlert(err.message);
}
