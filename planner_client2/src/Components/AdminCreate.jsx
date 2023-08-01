import { useContext, useState, useEffect } from "react"
import AxiosContext from "../AxiosContext";
import axios from 'axios'

const AdminEventCreate = () => {

    const [events, setEvents] = useState();

    useEffect(() => {
        const getEvents = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/events`)
            setEvents(response.data)
        }
        getEvents()
    },[])

    const initialState = {
        "id": null,
        "name": '',
        "date": '',
        "time": '',
        "budget": 0,
        "location": '',
        "attendees": '',
        "tasks": '',
        "expenses": '',
    }

    const { setAxiosAction }  = useContext(AxiosContext)
    const [formState, setFormState] = useState(initialState)

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);

        await axios.post(`http://127.0.0.1:8000/events`, formState);

        setFormState(initialState);
        setAxiosAction(true)
    };

    if (!events) { return <div className='admin-create'>Loading...</div> }

    return (
        <div className="admin-create">
            <form onSubmit={handleSubmit}>
                <div>Add An Event</div>
                
                <div>Name:</div>
                <input type="text" id="name" onChange={handleChange} value={formState.event_name}/>
                <div>Date:</div>
                <input type="date" id="date" onChange={handleChange} value={formState.date}/>
                <div>Time:</div>
                <input type="time" id="time" onChange={handleChange} value={formState.time}/>
                <div>Budget:</div>
                <input type="number" id="budget" onChange={handleChange} value={formState.budget}/>
                <div>Location:</div>
                <input type="text" id="location" onChange={handleChange} value={formState.location}/>
                <div>Attendee:</div>
                <input type="text" id="attendee" onChange={handleChange} value={formState.attendees}/>
                <div>Tasks:</div>
                <input type="url" id="tasks" onChange={handleChange} value={formState.tasks}/>
                <div>Expenses:</div>
                <input id="expenses" onChange={handleChange} value={formState.expenses}/>
                <button className="event-submit" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AdminEventCreate