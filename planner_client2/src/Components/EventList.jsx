import React, { useEffect, useState } from "react";
import axios from "axios";
import EventPage from './EventPage'

const EventList = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/events`);
      setEvents(response.data);
    };
    getEvents();
  }, []);

  const handleDelete = async(id) => {
    try {
        console.log(id)
        await axios.delete(`http://127.0.0.1:8000/events/${id}`)
              setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id)
        );
        
    } catch (error) {
        console.log(error);
    }
}

return (
  <div className="event-list1">
    <h1 className="list-header">Events</h1>
    <div className="event-list">
      {events.map((event) => (
        <div key={event.id} className="event-link">
          <div style={{ fontWeight: "bold" }}>{event.event_name}</div>
          <div>
            {event.date} | {event.time}
          </div>
          {/* Other event details */}
          <EventPage event={event} />
          <button onClick={() => handleDelete(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);
};


export default EventList;
