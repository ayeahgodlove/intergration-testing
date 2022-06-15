import React, { Component } from 'react';
import { mockData } from './mock-data';

class Event extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  showSummary = () => {
    if (this.state.collapsed === false) {
      return mockData[0].description;
    }
  };

  dateNewFormat = (eventDate) => {
    const newDate = `${new Date(eventDate)}`;
    return newDate;
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h3 className="title">{event.summary}</h3>
        <p className="start-time">{this.dateNewFormat(event.start.dateTime)}</p>
        <p className="location">{event.location}</p>
        <button className="btn-details" onClick={this.handleClick}>
          show details
        </button>
        <p className="event-details">{this.showSummary()}</p>
      </div>
    );
  }
}
export default Event;
