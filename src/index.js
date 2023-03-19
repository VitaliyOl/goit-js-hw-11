import { imagesMarkup } from './js/renderImages';
import { ApiServices } from './js/fetcImages';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  renderImages: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.visibility = 'hidden';

const apiServices = new ApiServices();

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onMoreImages);

function onMoreImages() {
  if (!apiServices.limitPerHostImages()) {
    refs.loadMoreBtn.style.visibility = 'hidden';
    Notify.failure(
      '"We re sorry, but you ve reached the end of search results."'
    );
    return;
  }

  apiServices.fetchImages().then(renderImages);
}

function onSubmit(e) {
  e.preventDefault();

  const { elements } = e.currentTarget;
  apiServices.query = elements.searchQuery.value.trim();
  if (!apiServices.query) {
    return Notify.failure(
      '"Sorry, there are no images matching your search query. Please try again."'
    );
  }
  apiServices.resetPage();
  apiServices.fetchImages().then(images => {
    clearForm();
    renderImages(images);
    refs.loadMoreBtn.style.visibility = 'visible';
    Notify.success(`"Hooray! We found ${apiServices.total} images."`);
  });
}

function renderImages(images) {
  return refs.renderImages.insertAdjacentHTML(
    'beforeend',
    imagesMarkup(images)
  );
}

function clearForm() {
  refs.renderImages.innerHTML = '';
}

//////////////////////////

// const refs = {
//   renderImages: document.querySelector('.gallery'),
//   form: document.querySelector('.search-form'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// refs.loadMoreBtn.style.visibility = 'hidden';

// const apiServices = new ApiServices();
// let limitImages = 0;

// refs.form.addEventListener('submit', onSubmit);
// refs.loadMoreBtn.addEventListener('click', onMoreImages);

// function onMoreImages() {

// if (limitImages <= 0) {
//   refs.loadMoreBtn.style.visibility = 'hidden';
//   Notify.failure(
//     '"We re sorry, but you ve reached the end of search results."'
//   );
//   return;
// }

//   apiServices.fetchImages().then(renderImages);
//   limitImages -= apiServices.per_page;

// }

// function onSubmit(e) {
//   e.preventDefault();

//   const { elements } = e.currentTarget;
//   apiServices.query = elements.searchQuery.value.trim();
//   if (!apiServices.query) {
//     return Notify.failure(
//       '"Sorry, there are no images matching your search query. Please try again."'
//     );
//   }
//   apiServices.resetPage();
//   apiServices.fetchImages().then(images => {
//     console.log(images);
//     clearForm();
//     renderImages(images);
//     refs.loadMoreBtn.style.visibility = 'visible';
//     Notify.success(`"Hooray! We found ${apiServices.hits} images."`);
//      limitImages = apiServices.hits - apiServices.per_page;

//   });
// }

// function renderImages(images) {
//   return refs.renderImages.insertAdjacentHTML(
//     'beforeend',
//     imagesMarkup(images)
//   );
// }

// function clearForm() {
//   refs.renderImages.innerHTML = '';
// }
