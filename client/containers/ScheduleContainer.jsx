import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changePage} from '../actions/actions2.js'
import {saveGoalName} from '../actions/actions2.js'
import {saveScheduleItem} from '../actions/actions2.js'
import {addSchedule} from '../actions/actions2.js'
import store from '../store';

const mapStateToProps = (state)=> ({
  goalArray: state.goal.goalArray,
  currentGoal: state.schedule.scheduleItem.goalName,
  currentUser: state.login.currentUsername,
  scheduleItem: state.schedule.scheduleItem,
  scheduleArray: state.week.scheduleArray,
})

const mapDispatchToProps = (dispatch) => ({
  changePage: (location) => dispatch(changePage(location)),
  saveGoalName: (goal)=> dispatch(saveGoalName(goal)),
});

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

// **************************************** Save Method to be transfer to schedule display *****************************

save(){
  //goal name
  const goalName =document.querySelector("#goalSelectedValue").value;

  const dueDate =document.querySelector("#dueDate").value;
 
  
  const action =document.querySelector("#actionSelectedValue").value;


  const duration =document.querySelector("#duration").value;


  const doer =document.querySelector("#doer").value;


  //get access to this in the promise
  let newThis =this;

  //save the schedule item


  let url = '/user/actions/'+this.props.currentUser;

  let save_promise = new Promise(
    function(resolve, reject) {
    store.dispatch(saveScheduleItem({goalName, dueDate, duration, action, doer}))
    resolve("done");
    reject(new Error("Problem with saving the schedule item"));
  })  
  save_promise.then(()=>{ 
    let add_goal_promise = new Promise(
      function(resolve, reject) {
        store.dispatch(addSchedule(newThis.props.scheduleItem))
        resolve("done");
        reject(new Error("Problem with adding a scheduleItem"));
      })

      add_goal_promise.then(()=>{
        let data = {actions: newThis.props.scheduleArray};
        fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(data), // data is username and password
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result=> {})
        .then(()=>{
          newThis.props.changePage("weekToDo")
       })
    })
  })
}

// **************************************** Render Method *****************************
  render() {
    //*********************** create options for goal select ********************************/
    let goalOptions = [];
    for(let i=0; i<this.props.goalArray.length; i++){
      let key = "goal_option"+i;
      let value = this.props.goalArray[i].goalName
      goalOptions.push(<option key={key} className="goalList" value={value}>
      {value}
      </option>);
    }

    //*********************** create options for action select ********************************/
   
    let actionArray = [];
    for(let i =0; i< this.props.goalArray.length; i++){
        if(this.props.goalArray[i].goalName === this.props.currentGoal){
            actionArray = this.props.goalArray[i].actions;
            break;
        }  
    } 
    const actionOptions = [];
    for(let i=0; i<actionArray.length; i++){
        let key = "action_option"+i;
        let value = actionArray[i]
        actionOptions.push(<option key={key} className="goalList" value={value}>
        {value}
        </option>);
    }

    // ******************************* styles ****************************
    const outerBox = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "400px",
        backgroundColor: "rgba(255, 255, 255, 0.639)",
        padding: "10px",
        boxShadow: "10px 15px 39px rgba(0, 0, 0, .2)",
        borderRadius: "5px",
      }
  
      const header={
        color:"blue",
      }

  // ************************************* RETURN **********************************
    return (
      <div className="container">
        <div style={outerBox} className="outerBox"> 
            <h3 style={header}>Schedule An Action</h3>   
            <br/>    
            <span>  
              <label>Goal: </label>
              <select id="goalSelectedValue">
                {goalOptions}
              </select>
              <button id="addGoalName" onClick={() => this.props.saveGoalName(document.querySelector('#goalSelectedValue').value)}>Save</button>
            </span>
            <br/>
            <span>
              <label>Action: </label>
              <select id="actionSelectedValue">
                {actionOptions}
              </select>
            </span>
            <br/>
            <span>
                <label>Duration</label>
                <input id ="duration" placeholder = "30"></input> mins
            </span>
            <span>
                <label>Who is doing the action?</label>
                <input id ="doer" placeholder = "me"></input>
            </span>
            <span>
                <label>Due Date:</label>
                <input id ="dueDate" placeholder = "12/10/2020"></input>
            </span>
          <div id="button_container">
          <button id="save_button" onClick={() => this.save()}>Save</button>
          <button id="cancel_button" onClick={() => this.props.changePage("weekToDo")}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(ScheduleContainer)
