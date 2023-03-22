import axios from 'axios';
const API_KEY = '34499187-b966d60bee54df692b8f37eb6';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class ApiServices {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    const params = {
      key: `${API_KEY}`,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: this.per_page,
      page: this.page,
    };

    const { data } = await axios({ params });

    return data;

    // return await axios({params}).then(response => {
    //   return response;
    // });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

///////////////////////////

// const URL = 'https://pixabay.com/api/';
// const API_KEY = '34499187-b966d60bee54df692b8f37eb6';

// export class ApiServices {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.per_page = 5;
//   }

//   fetchImages() {
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
//         this.page += 1;
//         this.totalHits = data.totalHits;
//         this.total = data.total;

//         return data.hits;
//       });
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   limitPerHostImages() {
//     return this.page <= Math.ceil(this.totalHits / this.per_page);
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
