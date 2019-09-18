import getSearchedImageService from '../service/getSearchedImage';
export default function getSearchedImage(query) {
  return (dispatch, getState) => {
    dispatch({ type: 'SEARCHING_IMAGE' });

    getSearchedImageService(query)
      .then(res => {
        dispatch({
          type: 'SEARCHED_IMAGE',
          payload: {
            searchedImage: res.data.results
          }
        });
      })
      .catch(err => {
        dispatch({ type: 'FAILED_TO_SEARCH_IMAGE' });
      });
  };
}
