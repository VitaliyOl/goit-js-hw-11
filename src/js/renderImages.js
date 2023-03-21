export function imagesMarkup(images) {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `      
          <div class="photo-card" >
          <a href="${largeImageURL}" alt="${tags}" >  
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class='gallery__image'/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes : ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views : ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments : ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads : ${downloads}</b>
          </p>
        </div>
      </div>
      
          `;
      }
    )
    .join('');
}
