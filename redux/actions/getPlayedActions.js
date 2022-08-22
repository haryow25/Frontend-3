import { GAME_DATA_LOADED } from '../constants/getPlayedConstants';

export function getPlayedGame() {
  let apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  return function (dispatch) {
    return fetch(`${apiUrl}/user/playedGame`, {
      method: 'get', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GAME_DATA_LOADED,
          payload: json.data,
        });
      });
  };
}
