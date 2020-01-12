import * as types from '../constants/actionTypes';

const initialState = {
  goalCard: {
      goalName: "",
      goalDetails: ["dummy detail"],
      dueDate: new Date(),
      actions: ["dummy action"],
  },
};

const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_GOAL:
            const goalCardDetails = {...state.goalCard};
            goalCardDetails.goalName = action.payload.goalName.slice();
            goalCardDetails.goalDetails = [...action.payload.goalDetails];
            goalCardDetails.dueDate = action.payload.dueDate.slice();
            goalCardDetails.actions = [...action.payload.actions];
            
            return {... state, goalCard:goalCardDetails};

        case types.ADD_DETAIL:
            const goalCardDetails2 = {...state.goalCard};
            goalCardDetails2.goalDetails.push(action.payload);
            return {... state, goalCard:goalCardDetails2};

        case types.ADD_ACTION:
            const goalCardDetails3 = {...state.goalCard};
            goalCardDetails3.actions.push(action.payload);
            return {... state, goalCard:goalCardDetails3};

        case types.RESET_DETAIL_ACTION:
            const goalCardDetails4 = {...state.goalCard};
            goalCardDetails4.goalDetails = [...action.payload.goalDetails];     
            goalCardDetails4.actions = [...action.payload.actions];
            return {... state, goalCard:goalCardDetails4};
       
        default: return state
    }
    
};

export default createReducer;