const favoritesReducer = (state, action) => {
    switch (action.type) {
      case 'FAVORITES':
        return {
          ...state,
          favorites: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  