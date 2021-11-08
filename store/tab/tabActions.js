export const SET_TRADE_MODAL_VISIBLITIY = "SET_TRADE_MODAL_VISIBLITIY";

export const setTradeModalVisibility = (isVisible) => (dispatch) => {
  dispatch({
    type: SET_TRADE_MODAL_VISIBLITIY,
    payload: { isVisible }
  })
}

// export function setModalVisibity(isVisible) {
//   return dispatch => {
//     dispatch(setTradeModalVisibilitySuccess(isVisible))
//   }
// }