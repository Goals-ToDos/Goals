import * as types from '../constants/actionTypes';

const initialState = {
  currentPage: "weekToDo",
  scheduleArray: [],
};

const weekReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_SCHEDULE:
            const scheduleList = [...state.scheduleArray];
            //the payload should be an object
            //the object will be passed to the goalDisplay as a prop and that will create the goal
            scheduleList[scheduleList.length] = action.payload;
            return {... state, scheduleArray:scheduleList};
        
        case types.SET_SCHEDULE:
            const newScheduleList = action.payload;
            //the payload should be an array
            return {... state, scheduleArray:newScheduleList};
        default: return state
    }
    
};

export default weekReducer;