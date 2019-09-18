const initState = {
  allImages: [],
  oneImage: [],
  searchedImages: [],
  loading: false
};
export default function images(state = initState, { type, payload }) {
  switch (type) {
    case 'FETCHING_IMAGES':
      return Object.assign({}, state, {
        loading: true
      });
    case 'FETCHED_IMAGES':
      return Object.assign({}, state, {
        allImages: payload.images,
        loading: false
      });
    case 'FAILED_TO_FETCH_IMAGES':
      return Object.assign({}, state, {
        loading: false
      });
    case 'FETCHING_IMAGE':
      return Object.assign({}, state, {
        loading: true
      });
    case 'FETCHED_IMAGE':
      return Object.assign({}, state, {
        oneImage: payload.image,
        loading: false
      });
    case 'FAILED_TO_FETCH_IMAGE':
      return Object.assign({}, state, {
        loading: false
      });
    case 'SEARCHING_IMAGE':
      return Object.assign({}, state, {
        loading: true
      });
    case 'SEARCHED_IMAGE':
      return Object.assign({}, state, {
        searchedImages: payload.searchedImage,
        loading: false
      });
    case 'FAILED_TO_SEARCH_IMAGE':
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}
