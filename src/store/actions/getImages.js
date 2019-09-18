import getImagesService from '../service/getImages';
export default function getImages() {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCHING_IMAGES' });

    getImagesService()
      .then(res => {
        dispatch({
          type: 'FETCHED_IMAGES',
          payload: {
            images: res.data
            // images: [...getState().images.allImages, ...res.data]
          }
        });
      })
      .catch(err => {
        dispatch({ type: 'FAILED_TO_FETCH_IMAGES' });
      });
  };
}
