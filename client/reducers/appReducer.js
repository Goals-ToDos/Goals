import * as types from '../constants/actionTypes';

const initialState = {
  currentPage: "login",
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_PAGE:
            let currentPage = action.payload;
            return {... state, currentPage};
        default: return state
    }
    
};

export default appReducer;