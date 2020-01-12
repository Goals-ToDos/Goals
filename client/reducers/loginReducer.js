import * as types from '../constants/actionTypes';



const initialState = {
  currentUsername: "",
  currentPassword: "",
  membersList: {},
  errorMessage:"",
  currentPage:"login",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      const newUsername = action.payload.username;
      const newPassword = action.payload.password;
      let membersList = {...state.membersList};
      membersList[newUsername]=  newPassword;
      return {...state, membersList};

    case types.LOGIN_USER:
      const loginUsername = action.payload.username;
      const loginPassword = action.payload.password;
      let updatedMembersList = {...state.membersList};
      updatedMembersList[loginUsername]=  loginPassword;
      const newErrorMessage = "You can now login in";
      return {...state, currentUsername: loginUsername, currentPassword: loginPassword, errorMessage:newErrorMessage, membersList:updatedMembersList};

    case types.VERIFY_USER:
        let username = action.payload.username;
        let verified = action.payload.isMember;
        let currentPage;
        let errorMessage;
        if(state.membersList.hasOwnProperty(username)){
          if(verified){
              //go to the goals page
              currentPage = "goals";
              errorMessage = "";
              return {...state, currentUsername: username, currentPage, errorMessage}
            }
            else{
            //password error message
             errorMessage = 'Username and Password combination does not exist. Please try again';
             return {...state, errorMessage};
            } 
       }
       else{
         //error user does not exist message
          errorMessage = 'User does not exist. Please click "Create an account" link above';
          return {...state, errorMessage};
       }
    default: return state;
  }
}
   
export default loginReducer;

