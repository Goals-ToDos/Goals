import * as types from '../constants/actionTypes';

const initialState = {
  scheduleItem: {
      goalName: "", 
      action: "",
      duration: 0, //in mins
      dueDate: new Date(),
      doer: "",
  },
};

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_SCHEDULE:
            const scheduleObj = {...state.scheduleItem};
            scheduleObj.goalName = action.payload.goalName.slice();
            scheduleObj.action = action.payload.action.slice();
            scheduleObj.duration = action.payload.duration.slice();
            scheduleObj.dueDate = action.payload.dueDate.slice();
            scheduleObj.doer = action.payload.doer.slice();
            return {... state, scheduleItem:scheduleObj};

        case types.SAVE_GOAL_NAME:
            const newScheduleObj = {...state.scheduleItem};
            newScheduleObj.goalName = action.payload;
            console.log('action.payload:', action.payload)
            return {... state, scheduleItem:newScheduleObj};
            
        default: return state
    }
    
};

export default scheduleReducer;