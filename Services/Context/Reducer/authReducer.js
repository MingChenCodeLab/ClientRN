const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_UP':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        userInfo: action.user,
      };
    case 'UPDATE_USER_INFO':
      return {
       ...state,
        userInfo: {...state.userInfo,...action.payload },
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    case 'USER_INFO':
      return {
        ...state,
        userInfo: action.user,
      };
    default:
      return state;
  }
};

export default authReducer;
