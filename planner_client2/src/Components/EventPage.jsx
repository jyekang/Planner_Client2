import { useState, useEffect } from "react"
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios'

const EventPage = () => {
    const initialState = {
        "id": null,
        "event_name": "",
        "date": "",
        "time": "",
        "budget": 0,
        "location": "",
        "attendees": "",
        "tasks": "",
        "expenses": "expenses"
    }

    const [event, setEvent] = useState();
    let { id } = useParams()
    const [updateState, setUpdateState] = useState(initialState);

    useEffect(() => {
        const getEvents = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/events/${id}`)
            setUpdateState(response.data)
        }
        console.log('got events')
        getEvents()
    }, [id])

    const handleChange = (e) => {
        setUpdateState({...updateState, [e.target.id]: e.target.value})
        console.log(e.target.value)
        console.log(e.target.id)
    }

    const handleUpdate = async () => {
        console.log(id)
    
        try {
            await axios.put(`http://127.0.0.1:8000/events/${id}`, updateState)

        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
       
        setUpdateState(initialState)
    }

    if (!event) {
        return (
            <div className='route-body'>
                <div className="loading">Loading...</div>
            </div>
        )
    }
    console.log(event)
    return(
        <div>
        <div className='route-body'>
            <NavLink to="/events" className="back-link">Back</NavLink>
            <h2>{event.event_name}</h2>
            
            <br />
            <div className="date-time">Date: {event.date} | Time: {event.time}</div>
           <br />
            <div className="city-state">{event.location}</div>
            
        </div>
        <div>
                <div className="edit-div">
                        <label>Event Name: </label>
                        <input type="text" id="event_name" onChange={handleChange} value={updateState.event_name}/>
                    
                        <label>Date: </label>
                        <input type="date" id="date" onChange={handleChange} value={updateState.date}/>
                    
                        <label>Time: </label>
                        <input type="time" id="time" onChange={handleChange} value={updateState.time}/>
            
                        <label>Budget: </label>
                        <input type="number" id="budget" onChange={handleChange} value={updateState.budget}/>
    
                        <label>Location: </label>
                        <input type="text" id="location" onChange={handleChange} value={updateState.location}/>
                    
                    
                   
                        <button className="update-button" onClick={handleUpdate}>Update</button>
                        <button onClick={handleClose}>Close</button>
            
                </div>
                </div>
                </div>
    )
}

export default EventPage