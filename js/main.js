import './data.js';
import './form.js';
import {printPhotos} from './data.js';
import {createImages} from './create-miniature-images.js';

createImages(printPhotos());
