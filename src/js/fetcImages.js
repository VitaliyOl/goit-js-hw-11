const URL = 'https://pixabay.com/api/';

export function fetchImages(searchQuery) {
  const searchParams = new URLSearchParams({
    key: '34499187-b966d60bee54df692b8f37eb6',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40',
    page: 1,
  });

  return fetch(`${URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
/////////////////////////////////////////////////////
// const URL = 'https://pixabay.com/api/';
// const API_KEY = '34499187-b966d60bee54df692b8f37eb6';

// export class ApiServices {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.per_page = 140;
//   }

//   fetchImages() {
//     // console.log(this);

//     const searchParams = new URLSearchParams({
//       key: API_KEY,
//       q: this.searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: this.per_page,
//       page: this.page,
//     });

//     return fetch(`${URL}?${searchParams}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .then(data => {
//         // console.log(data);
//         this.page += 1;
//         this.totalHits = data.totalHits;
//         // console.log(this);

//         return data.hits;
//       });
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

//   get hits() {
//     return this.totalHits;
//   }

//   set hits(newHits) {
//     this.totalHits = newHits;
//   }

// }
