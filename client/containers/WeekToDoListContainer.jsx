import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changePage} from '../actions/actions2.js';
import ScheduleDisplay from '../components/scheduleDisplay.jsx';
import store from '../store';
import {setSchedule} from '../actions/actions2.js';


const mapStateToProps = (state)=>({
  scheduleArray: state.week.scheduleArray,
  currentUser: state.login.currentUsername,
})

const mapDispatchToProps = (dispatch) => ({
       changePage: (location) => dispatch(changePage(location))
    });
document.body.className= "goalsBody";
class WeekToDoListContainer extends Component {
  constructor(props) {
    super(props);
    this.getSchedule= this.getSchedule.bind(this);
  }
  componentDidMount() {
    this.getSchedule();
  }

  getSchedule(){
    const url= '/user/actions/'+this.props.currentUser;
    fetch(url)
    .then(response => response.json())
    .then(result => { 
        store.dispatch(setSchedule(result))
    })
  }










  render() {
    /*********************************************** style ******************************************/
    const weekBox= { 
      border: "1px solid black",
      width: "95vw",
      backgroundColor: "rgba(255, 255, 255, 0.639)",
      padding: "10px",
      marginTop: "10px",
      boxShadow: "10px 15px 39px rgba(0, 0, 0, .2)",
      borderRadius: "5px",
    }
    const list={
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
    }
    const add_action_button ={
        padding: '10px 10px 10px 10px',
        width: "10%",
        marginLeft: "45%",
        borderRadius: "5px",
    }
    const week_container ={
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
    const go_back_to_goals ={
      color: "green",
      fontSize: "20px",
      float: "left",
      marginLeft: "20px",
      borderRadius: "5px",
      padding:"1px 1px 1px 1px",
    }
     /************************************************** coding in render *******************************************/
    // I need an array of all of the schedule items- create an action for it, the save button in schedule Display should saveSchedule and addScheduleItem
    let scheduleElements = [];
    for(let i=0; i < this.props.scheduleArray.length; i++){
        let key= "scheduleItem" +i;
        scheduleElements.push(<ScheduleDisplay key={key} scheduleObject={this.props.scheduleArray[i]}/>)
    }
    
     /************************************************** return ********************************/
    return (
      <div style={weekBox}>
        <div>
          <a href="" style={exit} onClick={() => this.props.changePage("login")}>X</a>
          <button style={go_back_to_goals} onClick={() => this.props.changePage("goals")}>Go Back to Goals</button>
        </div> 
        <br/>
        <div >
          <h1 id="header">This Week Schedule</h1>
          <br/>
          <button id="add_action" style={add_action_button} onClick={() => this.props.changePage("schedule")}>SCHEDULE A ACTION</button>
        </div>
        <div id="weekContainer" className="weekContainer" style={week_container}>
          {scheduleElements}
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(WeekToDoListContainer)