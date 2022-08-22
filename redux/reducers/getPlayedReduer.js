import { GAME_DATA_LOADED } from '../constants/getPlayedConstants';

// getPlayerReducer
const initialState = {
  playedGames: [],
};

export const getPlayedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_DATA_LOADED:
      return { ...state, playedGames: action.payload };
    default:
      return state;
  }
};
