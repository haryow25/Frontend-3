import { SET_MONOPOLI_SCORE } from '../constants/monopoliScoreConstants';

export const setMonopoliScore = (score) => ({
  type: SET_MONOPOLI_SCORE,
  payload: score,
});
