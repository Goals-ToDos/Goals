import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changePage} from '../actions/actions2.js'
import {addUser} from '../actions/actions2.js'
import {loginUser} from '../actions/actions2.js'
import {verifyUser} from '../actions/actions2.js'
import store from '../store';
const bcrypt = require('bcryptjs');


const mapStateToProps = (state) => ({
    currentPage: state.app.currentPage,
    nextPage: state.login.currentPage,
    errorMessage: state.login.errorMessage,
    marketList: state.login.membersList,
});
        
const mapDispatchToProps = (dispatch) => ({
    changePage: (location) => dispatch(changePage(location)),
});

//changing the background image
document.body.className= "loginBody";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
    }

    login(){
        let usernameEntry= document.querySelector("#username").value;
        let passwordEntry= document.querySelector("#password").value;
        let newThis =this;
        let url = '/user/login/'+usernameEntry;
        
        fetch(url).then(response => response.json()).then(hash=> {
      
          if(hash){ 
            store.dispatch(addUser(usernameEntry,hash));
            bcrypt.compare(passwordEntry, hash, function(err, res) {
              let isMember = res;
              store.dispatch(verifyUser(usernameEntry,isMember));
              if(newThis.props.currentPage !== newThis.props.nextPage){
                newThis.props.changePage("goals");
              }
              else{            
                document.querySelector("#errorMessage").innerHTML=newThis.props.errorMessage;
             }
            });
          }
          else{
            store.dispatch(verifyUser(usernameEntry,false));
          }
            document.querySelector("#errorMessage").innerHTML=newThis.props.errorMessage;

        })        
    }
 
    addNewUser(){
        let usernameEntry= document.querySelector("#username").value;
        let passwordEntry= document.querySelector("#password").value; 
        let url = '/user/create';
          let data = {'username':usernameEntry, password:passwordEntry};
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data is username and password
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(result=> { 
            store.dispatch(loginUser(result.username, result.password))
          })
          .then(()=>{
            document.querySelector("#errorMessage").innerHTML=this.props.errorMessage;
          });   
     }

  render() {    
    return (
      <div className="container">
        <div className="loginBox">
          <p className="loginLogo"><em>Goals</em></p>
          <form className="loginInputs" >
              <label>Username: </label>
              <input id="username"></input>
              <br/>
              <label>Password: </label>
              <input id="password" type="password"></input>
          </form>
          <button onClick={() => this.login()}>Login</button>
          <div>
              Not registered? <button className="signup" onClick={() => this.addNewUser()} > Create an account</button>
          </div>
          <div id="errorMessage"></div>
        </div>
      </div>
    );
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
//I want to be able enter username and password
//verify username matches password
//go to goals page if username matches password
//else state an error
//if username name is not found state account does not exist for user
//if password for user does not match then state user and password combination does not match 