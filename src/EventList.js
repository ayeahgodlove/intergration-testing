// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events, numberOfEvents } = this.props;
    return (
      <ul className="EventList">
          {events.map(event =>
            <li key={event.id}>
                <Event event={event} />
            </li>
          )}
          <li key="numberOfEvents">{numberOfEvents}</li>
      </ul>
    );
  }
}

export default EventList;