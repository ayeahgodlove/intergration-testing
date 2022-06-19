import React, { Component } from 'react';

class NumberOfEvents extends Component {


  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.infoText}/>
        <p className="numbercount">Number of events</p>
        <input
          type="number"
          className="numberinput"
          onChange={this.handleInputChanged}
          value={this.state.numberOfEvents}
        />
      </div>
    );
  }
}

export default NumberOfEvents;