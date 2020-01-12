import * as types from '../constants/actionTypes';

const initialState = {
  currentPage: "goals",
  goalArray: [],
};

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_GOAL:
            const goalList = [...state.goalArray];
            //the payload should be an object
            //the object will be passed to the goalDisplay as a prop and that will create the goal
            goalList[goalList.length] = action.payload;
            return {... state, goalArray:goalList};

        case types.SET_GOAL:
            const setGoalList = action.payload;
            //the payload should be an array
            return {... state, goalArray:setGoalList};
            
        default: return state
    }
    
};

export default goalReducer;