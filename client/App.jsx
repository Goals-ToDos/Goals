/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginContainer from './containers/LoginContainer.jsx';
import GoalsContainer from './containers/GoalsContainer.jsx';
import CreateContainer from './containers/CreateContainer.jsx';
import WeekToDoListContainer from './containers/WeekToDoListContainer.jsx';
import ScheduleContainer from './containers/ScheduleContainer.jsx';

const mapStateToProps = (state) => ({
  currentPage: state.app.currentPage
})

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if(this.props.currentPage === "login"){
      return (
        <div>
          <LoginContainer />
        </div>
      );
    }
    else if (this.props.currentPage === "goals"){
      return (
        <div>
          <GoalsContainer />
        </div>
     );
    }
    else if (this.props.currentPage === "create"){
      return (
        <div>
          <CreateContainer />
        </div>
     );
    }
    else if (this.props.currentPage === "weekToDo"){
      return (
        <div>
          <WeekToDoListContainer />
        </div>
     );
    }
    else if (this.props.currentPage === "schedule"){
      return (
        <div>
          <ScheduleContainer />
        </div>
     );
    }
    
}
}

export default connect(mapStateToProps)(App);
