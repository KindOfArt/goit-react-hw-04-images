import axios from 'axios';

export default function fetchImagesAPI(query, pageNumber) {
  axios.defaults.baseURL = 'https://pixabay.com/api';

  const params = {
    key: '28415242-e0e8b03e245983e2ec7e6c358',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  };

  return axios
    .get(`/?q=${query}&page=${pageNumber}`, {
      params,
    })
    .then(res => {
      const { hits } = res.data;

      return hits;
    });
}
