import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changePage} from '../actions/actions2.js'
import {saveGoal} from '../actions/actions2.js'
import {addGoal} from '../actions/actions2.js'
import {addDetail} from '../actions/actions2.js'
import {addAction} from '../actions/actions2.js'
import {resetDetailAndAction} from '../actions/actions2.js'
import store from '../store';

const mapStateToProps = (state)=> ({
  goalCard: state.create.goalCard,
  goalArray: state.goal.goalArray,
  detailArray: state.create.goalCard.goalDetails,
  actionArray: state.create.goalCard.actions,
  currentUser: state.login.currentUsername,
})

const mapDispatchToProps = (dispatch) => ({
  changePage: (location) => dispatch(changePage(location)),
  addDetail: (value) => dispatch(addDetail(value)),
  addAction: (value) => dispatch(addAction(value)),
  resetDetailAndAction: () => dispatch(resetDetailAndAction()),

});


class CreateContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

// **************************************** Save Method *****************************
save(){
  //goal name
  const goalName =document.querySelector("#goalName").value.toUpperCase();


  const dueDate =document.querySelector("#datepicker").value;

  
  //array of goal details
  const detailValueArray=[];
  const goalDetailsArray =document.querySelectorAll(".goalDetail");
  goalDetailsArray.forEach((element)=>{
    detailValueArray.push(element.value);
  })

  //array of actions
  const actionValueArray=[];
  const actionArray =document.querySelectorAll(".action");
  actionArray.forEach((element)=>{
    actionValueArray.push(element.value);
  })

  let newThis =this;
  //save the goal
  //update the user goal
  let url = '/user/'+this.props.currentUser;


  //get access to this in the promise


  let save_promise = new Promise(
    function(resolve, reject) {
    store.dispatch(saveGoal({goalName:goalName, dueDate:dueDate, goalDetails:detailValueArray, actions:actionValueArray}))
    resolve("done");
    reject(new Error("Problem with saving the goal"));
  })  
  
  save_promise.then(()=>{ 
    let add_goal_promise = new Promise(
      function(resolve, reject) {
        store.dispatch(addGoal(newThis.props.goalCard))
        resolve("done");
        reject(new Error("Problem with adding a goal"));
      })

      add_goal_promise.then(()=>{
        let data = {goals: newThis.props.goalArray};

        fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(data), // data is username and password
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result=> ('patch the result is: ',result))
        .then(()=>{
          newThis.props.resetDetailAndAction();
          newThis.props.changePage("goals")
       })
    })
  })
}

// **************************************** Render Method *****************************
  render() {

    //************************ create extra detail feature
    let extraDetailArray = [];
    for(let i=1; i<this.props.detailArray.length; i++){
      let key = "detail"+i;
      let key2 = "break"+i;
      extraDetailArray.push(<span key={key}>  
        <label> Detail out the Goal: </label>
        <input className="goalDetail" placeholder="Flat Stomach"></input>
        </span>);
        extraDetailArray.push(<br key={key2}/>);
    }  
    
     //***************************** create extra action feature ******************
     let extraActionArray = [];
     for(let i=1; i<this.props.actionArray.length; i++){
       let key = "action"+i;
       let key2 = "break2"+i;
       extraActionArray.push(<span key={key}>  
         <label> Action: </label>
         <input className="action" placeholder="Ab Exercise"></input>
         </span>);
         extraActionArray.push(<br key={key2}/>);
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

  // ************************************* RETURN **********************************
    return (
      <div className="container">
        <div style={outerBox} className="outerBox">
          <h1 id="header">Create a Goal</h1>
          <div>
          <label>Goal (Insert 1 to 3 Words):</label>
          <input id="goalName" placeholder="Sexy As Hell" ></input>
          </div>
          <div id="add_detail_here">
            <span> 
            <label> Detail out the Goal: </label>
              <input className="goalDetail" placeholder="Flat Stomach"></input>
              <button onClick={()=>{this.props.addDetail("placeholder")}}>Add Detail</button>
            </span>
            {extraDetailArray}
          </div>
          <div id="schedule">
            <span> 
             <label> Due Date:</label>
              <input placeholder="12/12/2020" id="datepicker"></input>
            </span>
          </div>
          <div id="add_action_here">
          <span> 
              <label>Action Necessary to Complete Detail Task:</label>
              <input className="action" placeholder="Ab Exercise"></input>
              <button onClick={()=>{this.props.addAction("placeholder")}}>Add Action</button>
            </span>
            <br/>
            {extraActionArray}
          </div>
          <div id="button_container" >
          <button id="save_button" onClick={() => this.save()}>Save</button>
          <button id="cancel_button" onClick={() => this.props.changePage("goals")}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateContainer)