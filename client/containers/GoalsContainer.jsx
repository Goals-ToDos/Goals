import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changePage} from '../actions/actions2.js'
// import {addGoal} from '../actions/actions2.js'
import {setGoal} from '../actions/actions2.js'
import GoalDisplay from '../components/goalDisplay.jsx'
import store from '../store';

const mapStateToProps = (state) =>({
  currentPage: state.app.currentPage,
  nextPage: state.goal.currentPage,
  goalArray: state.goal.goalArray,
  currentUser: state.login.currentUsername,
})

const mapDispatchToProps = (dispatch) => ({
       changePage: (location) => dispatch(changePage(location))
    });

document.body.className= "goalsBody";
class GoalsContainer extends Component {
  constructor(props) {
    super(props);
    this.getGoals = this.getGoals.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
  }
  componentDidMount() {
    this.getGoals();
  }

  getGoals(){
    const url= '/user/'+this.props.currentUser;
    fetch(url)
    .then(response => response.json())
    .then(result => {
        store.dispatch(setGoal(result))
    })
  }

  deleteMe(){
    this.props.changePage("login");
    
    fetch('/user/'+this.props.currentUser,
    {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    } ).then(response=> location.reload())
    
  }
  render() {
    // ******************************** coding **********************************
    // setting goal array
    let goalElements = [];
    for(let i=0; i < this.props.goalArray.length; i++){
        let key= "goal" +i;
        goalElements.push(<GoalDisplay key={key} goalObject={this.props.goalArray[i]}/>)
    }
    // ******************************** style **********************************
    const goalsBox= { 
      border: "1px solid black",
      width: "95vw",
      backgroundColor: "rgba(255, 255, 255, 0.639)",
      padding: "10px",
      marginTop: "10px",
      boxShadow: "10px 15px 39px rgba(0, 0, 0, .2)",
      borderRadius: "5px"
    }
    const add_goal_button ={
        padding: '10px 10px 10px 10px',
        width: "10%",
        borderRadius: "5px",
    }
    const message_div ={
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    }
    const goal_container ={
        display: "flex",
        flexWrap: "wrap",
    }
    const exit ={
      color: "red",
      fontWeight: "bold",
      fontSize: "20px",
      textDecoration: "none",
      float: "right",
      marginRight: "10px",
    }
    const this_week ={
      color: "green",
      width: "200px",
      fontSize: "20px",
      float: "left",
      marginLeft: "20px",
      borderRadius: "5px",
      padding:"1px 1px 1px 1px",
    }
    const deleteMe={
      color: "red",
      fontWeight: "bold",
      fontSize: "20px",
      float: "right",
      marginRight: "10px",
      width:"auto",
      backgroundColor: "lightBlue",
      border:".5px solid red",
      borderRadius: "5px",
      padding:"1px 1px 1px 1px",
    }
    return (
        <div className="goalsBox" style={goalsBox}>  
            <div>
              <a href="" style={exit} onClick={() => this.props.changePage("login")}>X</a>
              <button style={deleteMe} onClick={() => this.deleteMe()}>Delete My Account</button>
              <button style={this_week} onClick={() => this.props.changePage("weekToDo")}>This Week Schedule</button>
            </div> 
            <br/>
          <h1 id="header" style={message_div}>Goals</h1>  
          <div id="inner_container">    
           {/* make it into a row and then each item is a column */}
          <div style={message_div}>
            <p className="message">Who do you want to be tomorrow? <br/> 
              Who do you want to be a year from now? <br/> 
              Are you ready to put in the work to meet your goals? <br/> 
              Are you ready to feel the pride in knowing you - made you great.<br/>
              So lets get started</p>
            <button id="add_goal" style={add_goal_button} onClick={() => this.props.changePage("create")}>ADD A GOAL</button>
          </div>
          </div>
        <div id="goalContainer" className="goalContainer" style={goal_container}>
          {goalElements}
        </div>
        
     </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(GoalsContainer)