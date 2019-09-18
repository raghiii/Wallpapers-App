import getImagesService from '../service/getImages';
export default function getImages() {
  return dispatch => {
    dispatch({ type: 'FETCHING_IMAGES' });
    getImagesService()
      .then(res => {
        dispatch({
          type: 'FETCHED_IMAGES',
          payload: {
            images: res.data
          }
        });
      })
      .catch(err => {
        dispatch({ type: 'FAILED_TO_FETCH_IMAGES' });
      });
  };
}
