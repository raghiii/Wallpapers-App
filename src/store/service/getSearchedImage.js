import axios from 'axios';
export default function getSearchedImageService(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://api.unsplash.com/search/photos/?query=' +
          `${query}` +
          '&per_page=20&client_id=' +
          'a87ce2969e51acf89894a8aa76db4b33676e40cf54dfacd3f073fd202639f2a9'
      )
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
