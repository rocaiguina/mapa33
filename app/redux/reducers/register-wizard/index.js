import userReducer from './user';

const REGISTER_WIZARD_SET_USER = 'REGISTER_WIZARD_SET_USER';

const initialState = {
  user: null,
  owner: null,
  catastro_number: '',
  owner_phone_number: '',
  owner_full_name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_WIZARD_SET_USER:
      return {
        ...state,
        user: userReducer(state.user, action)
      };
    default:
      return state;
  }
};
