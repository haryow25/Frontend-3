import { SET_MONOPOLI_SCORE } from '../constants/monopoliScoreConstants';

// monopoliScoreReducer
const initialState = {
  monopoliScore: 0,
};

export const monopoliScoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MONOPOLI_SCORE:
      return { ...state, monopoliScore: action.payload };
    default:
      return state;
  }
};
