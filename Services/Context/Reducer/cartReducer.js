const cartReducer = (state, action) => {
    switch (action.type) {
      case 'INFOCART':
        return {
          ...state,
          infoCart: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  