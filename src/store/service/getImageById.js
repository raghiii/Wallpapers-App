import axios from 'axios';
export default function getImageByIdService(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://api.unsplash.com/photos/' +
          `${id}` +
          '/?client_id=' +
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
