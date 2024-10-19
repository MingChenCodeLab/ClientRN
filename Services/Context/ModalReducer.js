
const modalReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          isVisible: true,
          modalType: action.modalType,
          modalData: action.modalData,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          isVisible: false,
          modalType: null,
          modalData: null,
        };
      case 'UPDATE_MODAL_DATA':
        return {
          ...state,
          modalData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;
  