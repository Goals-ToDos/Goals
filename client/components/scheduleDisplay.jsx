/************************************* scheduleDisplay **************************/


import React from 'react';

const scheduleDisplay = (props) => {
  console.log('props in scheduleDisplay:', props)

/***************************************************** style *******************************/
const scheduleDisplayStyle= { 
  border: "1px solid black",
  backgroundColor: "rgba(255, 255, 255, 0.639)",
  width: "95%",
  padding: "10px",
  boxShadow: "10px 15px 39px rgba(0, 0, 0, .2)",
  borderRadius: "5px",
  display: "flex",
  marginLeft:"13px",
  flexDirection: "row",
}
const smallBox= {
  width: "3%",
  marginRight: "3%",
  marginLeft: "3.5%",
  marginBottom: "0%",
  alignSelf: "flex-start",
  textAlign: "center",
}
const smallBox2= {
    width: "3%",
    marginRight: "3%",
    marginBottom: "0%",
    alignSelf: "flex-start",
    textAlign: "center",
  }

  /************************************************ return ****************************/  
  return (
    <div style={scheduleDisplayStyle}>
      <span>
        <input id ="priority" className="smallBox" style ={smallBox} placeholder = "#"></input>
        <label>Goal: </label>{props.scheduleObject.goalName} <label>Action: </label>{props.scheduleObject.action} <label>Duration: </label>{props.scheduleObject.duration}mins <label>Done By: </label>{props.scheduleObject.doer} <label>Due on: </label> {props.scheduleObject.dueDate} 
        <label> Completed?</label>
        <input id ="completed" className="smallBox" style ={smallBox2} placeholder = "Y/N"></input></span>
    </div>
  );
};

export default scheduleDisplay;
