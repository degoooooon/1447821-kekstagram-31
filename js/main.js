import { createPhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initFilters } from './filters.js';
import { initUpload } from './upload.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { initValidation } from './validation.js';
import { initFormSubmit } from './form.js';

const photos = createPhotos();
renderThumbnails(photos);
initFilters(photos);

initScale();
initEffects();
initUpload();
initValidation();
const pristine = initValidation();
initFormSubmit(pristine);