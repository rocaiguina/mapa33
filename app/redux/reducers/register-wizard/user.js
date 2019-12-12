const REGISTER_WIZARD_SET_USER = 'REGISTER_WIZARD_SET_USER';

const initialState = {
  name: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
  zip: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_WIZARD_SET_USER:
      return action.payload;
    default:
      return state;
  }
};
