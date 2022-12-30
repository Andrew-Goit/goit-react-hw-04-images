import axios from 'axios';

const API_KEY = '30826874-2b839a0aa57b08568fdc96116';

async function fetchPictures(searchQuery, pageNumber) {
  const base_url = 'https://pixabay.com/api/?';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageNumber,
    per_page: 12,
  });
  const data = await axios.get(`${base_url}${searchParams}`);
  // console.log(data.data.hits, pageNumber);
  return data.data.hits;
}

export default fetchPictures;