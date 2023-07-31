import { useState, useEffect } from "react"
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios'

const EventPage = () => {

    const [event, setEvent] = useState();
    let { id } = useParams()

    useEffect(() => {
        const getEvents = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/events`)
            setEvent(response.data.find((eve) => eve.name === id ))
        }
        console.log('got events')
        getEvents()
    }, [id])

    if (!event) {
        return (
            <div className='route-body'>
                <div className="loading">Loading...</div>
            </div>
        )
    }

    return(
        
        <div className='route-body'>
            <NavLink to="/events" className="back-link">Back</NavLink>
            <h2>{event.event_name}</h2>
            
            <br />
            <div className="date-time">Date: {event.date} | Time: {event.time}</div>
           <br />
            <div className="city-state">{event.location}</div>
            
        </div>
       
    )
}

export default EventPage