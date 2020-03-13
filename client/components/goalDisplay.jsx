/************************************* goalDisplay **************************/

import React from 'react';


const goalDisplay = (props) => {
  const header ={
    textAlign: "center",
    margin: "0%",
    padding: "0%",
    fontSize: "20px",
    fontWeight: "bold",
    color: "rgb(4, 108, 94)",
}
const goalDisplayStyle= { 
  border: "1px solid black",
  width: "29%",
  // height: "50vw",
  backgroundColor: "rgba(255, 255, 255, 0.639)",
  padding: "10px",
  boxShadow: "10px 15px 39px rgba(0, 0, 0, .2)",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
}
const smallBox= {
  width: "3%",
  marginRight: "3%",
  marginLeft: "3.5%",
  marginBottom: "0%",
  alignSelf: "flex-start",
  textAlign: "center",
}
  let goalDetailArray =[];

    for(let i=0; i < props.goalObject.goalDetails.length; i++){
      let key= "detail" +i;
      goalDetailArray.push(<span key={key} className="details" >- {props.goalObject.goalDetails[i]}</span>)
    }
    let actionArray =[];

    for(let i=0; i < props.goalObject.actions.length; i++){
      let key= "action" +i;
      actionArray.push(<span key={key} className="actionItems">- {props.goalObject.actions[i]}</span>)
    }
  return (
    <div style={goalDisplayStyle}>
      <input id ="priority" className="smallBox" style ={smallBox} placeholder = "#"></input>
      <p id ="goal" style={header}>{props.goalObject.goalName}</p>
      <hr/>
      <span><label>Here are your goal details:</label></span>
      {goalDetailArray}
      <span><label>Due Date:</label>
      <span id="details" className="details" >{props.goalObject.dueDate}</span></span>
      <span><label>Here are your action items:</label></span>
      {actionArray}
    </div>
  );
};

export default goalDisplay;
