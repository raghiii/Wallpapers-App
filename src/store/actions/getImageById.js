import getImageByIdService from '../service/getImageById';
export default function getImageById(id) {
  return dispatch => {
    dispatch({ type: 'FETCHING_IMAGE' });
    getImageByIdService(id)
      .then(res => {
        dispatch({
          type: 'FETCHED_IMAGE',
          payload: {
            image: res.data
          }
        });
      })
      .catch(err => {
        dispatch({ type: 'FAILED_TO_FETCH_IMAGE' });
      });
  };
}
