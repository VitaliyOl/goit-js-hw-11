import 'simplelightbox/dist/simple-lightbox.min.css';
import { imagesMarkup } from './js/renderImages';
import { ApiServices } from './js/fetcImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  headerHeight: document.querySelector('.header'),
};

const { height: pageFormHeight } = refs.headerHeight.getBoundingClientRect();
document.body.style.paddingTop = `${pageFormHeight}px`;

refs.loadMoreBtn.style.visibility = 'hidden';

const apiServices = new ApiServices();

let gallery = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
  captionsData: 'alt',
});

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onMoreImages);

async function onMoreImages() {
  apiServices.incrementPage();

  if (!apiServices.limitPerHostImages()) {
    refs.loadMoreBtn.style.visibility = 'hidden';
    Notify.failure(
      '"We re sorry, but you ve reached the end of search results."'
    );
    return;
  }
  try {
    const { hits } = await apiServices.fetchImages();

    renderImages(hits);

    gallery.refresh();
  } catch (error) {
    Notify.failure('"Ups, something wrong!"');
  }
}

async function onSubmit(e) {
  e.preventDefault();

  const { elements } = e.currentTarget;
  apiServices.query = elements.searchQuery.value.trim();

  if (!apiServices.query) {
    return Notify.failure(
      '"Sorry, there are no images matching your search query. Please try again."'
    );
  }
  try {
    apiServices.resetPage();

    const { hits, total, totalHits } = await apiServices.fetchImages();

    apiServices.total(totalHits);

    clearForm();

    renderImages(hits);

    gallery.refresh();

    refs.loadMoreBtn.style.visibility = 'visible';

    Notify.success(`"Hooray! We found ${total} images."`);
  } catch (error) {
    Notify.failure('"Ups, something wrong!"');
  }
}
// function scrollOn() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

function renderImages(images) {
  return refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup(images));
}

function clearForm() {
  refs.gallery.innerHTML = '';
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

/////////////////////////

// const refs = {
//   gallery: document.querySelector('.gallery'),
//   form: document.querySelector('.search-form'),
//   loadMoreBtn: document.querySelector('.load-more'),
//   headerHeight: document.querySelector('.header'),
// };

// const { height: pageFormHeight } = refs.headerHeight.getBoundingClientRect();
// document.body.style.paddingTop = `${pageFormHeight}px`;

// refs.loadMoreBtn.style.visibility = 'hidden';

// const apiServices = new ApiServices();

// let gallery = new SimpleLightbox('.photo-card a', {
//   captionDelay: 250,
//   captionsData: 'alt',
// });

// refs.form.addEventListener('submit', onSubmit);
// refs.loadMoreBtn.addEventListener('click', onMoreImages);

// function onMoreImages() {
//   if (!apiServices.limitPerHostImages()) {
//     refs.loadMoreBtn.style.visibility = 'hidden';
//     Notify.failure(
//       '"We re sorry, but you ve reached the end of search results."'
//     );
//     return;
//   }

//   apiServices.fetchImages().then(images => {
//     renderImages(images);
//     gallery.refresh();
//   });
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
//     clearForm();
//     renderImages(images);
//     gallery.refresh();
//     refs.loadMoreBtn.style.visibility = 'visible';
//     Notify.success(`"Hooray! We found ${apiServices.total} images."`);
//   });
// }

// function renderImages(images) {
//   return refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup(images));
// }

// function clearForm() {
//   refs.gallery.innerHTML = '';
// }
