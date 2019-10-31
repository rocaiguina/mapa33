import { SET_ACTIVE, SET_CENTER } from './types';

export const setActive = () => {
    return {
        type: SET_ACTIVE
    };
};

export const setCenter = coords => {
    console.log(coords[0]);
    return {
        type: SET_CENTER,
        payload: coords
    };
};
