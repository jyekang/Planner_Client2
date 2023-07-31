import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/events`);
      setEvents(response.data);
    };
    getEvents();
  }, []);

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
            <div>{event.location}</div>
            <div>
              Attendees:
              {event.attendees.length === 0 ? (
                <span>None</span>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>RSVP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.attendees.map((attendee, index) => (
                      <tr key={index}>
                        <td>{attendee.full_name}</td>
                        <td>
                          <input type="checkbox" checked={attendee.rsvp} readOnly />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              Expenses:
              {event.expenses.length === 0 ? (
                <span>None</span>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.expenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.custom_item_name}</td>
                        <td>{expense.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              Tasks:
              {event.tasks.length === 0 ? (
                <span>None</span>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Assigned To</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.tasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.description}</td>
                        <td>{task.assigned_to}</td>
                        <td>
                          <input type="checkbox" checked={task.complete} readOnly />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>Budget: {event.budget}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
