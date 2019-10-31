import { SET_CENTER, SET_ACTIVE } from '../../actions/types';

const INITIAL_STATE = {
    center: [-66.34999212613764, 18.2235432514004],
    active: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CENTER:
            return {
                ...state,
                center: action.payload
            };
        case SET_ACTIVE:
            return {
                ...state,
                active: !state.active
            };
        default:
            return state;
    }
};
