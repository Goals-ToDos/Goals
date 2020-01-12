import * as types from '../constants/actionTypes';

export const changePage = (pageLocation) => ({
  type: types.CHANGE_PAGE,
  payload: pageLocation,
});

export const addUser = (username, password) => ({
  type: types.ADD_USER,
  payload: {username, password},
});

export const loginUser = (username, password) => ({
  type: types.LOGIN_USER,
  payload: {username, password},
});

export const verifyUser = (username,isMember) => ({
    type: types.VERIFY_USER,
    payload: {username,isMember},
});

export const addGoal = (goal) => ({
  type: types.ADD_GOAL,
  //goal is an object
  payload: goal,
});

export const setGoal = (goals) => ({
  type: types.SET_GOAL,
  //goal is an array of goals
  payload: goals,
});

export const saveGoal = (goalInput) => ({
  type: types.SAVE_GOAL,
  //goal is an object
  payload: goalInput,
});

export const addDetail = (placeholder) => ({
  type: types.ADD_DETAIL,
  //add a placeholder for new detail
  payload: placeholder,
});

export const addAction = (placeholder) => ({
  type: types.ADD_ACTION,
  //add a placeholder for new detail
  payload: placeholder,
});

export const resetDetailAndAction = () => ({
  type: types.RESET_DETAIL_ACTION,
  //reset the detail and action arrays
  payload: {goalDetails: ["dummy detail"], actions:["dummy detail"] },
});

export const saveGoalName = (goalName) => ({
  type: types.SAVE_GOAL_NAME,
  //scheduleItem is an object
  payload: goalName,
});
export const saveScheduleItem = (scheduleItemInput) => ({
  type: types.SAVE_SCHEDULE,
  //scheduleItemInput is an object
  payload: scheduleItemInput,
});

export const addSchedule = (scheduleItem) => ({
  type: types.ADD_SCHEDULE,
  //scheduleItem is an object
  payload: scheduleItem,
});

export const setSchedule = (scheduleArray) => ({
  type: types.SET_SCHEDULE,
  //goal is an array of goals
  payload: scheduleArray,
});

