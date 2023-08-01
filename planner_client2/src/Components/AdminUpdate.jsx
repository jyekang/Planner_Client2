import { useContext, useState, useEffect } from "react"
import AxiosContext from "../AxiosContext";
import axios from 'axios'

const AdminUpdate = ({id, event_name, date, time, budget, location, attendees, tasks, expenses}) => {

    const initialState = {
        "id": id,
        "event_name": event_name,
        "date": date,
        "time": time,
        "budget": budget,
        "location": location,
        "attendees": attendees,
        "tasks": tasks,
        "expenses": expenses
    }

    const [updateState, setUpdateState] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const { setAxiosAction } = useContext(AxiosContext)

    const handleChange = (e) => {
        setUpdateState({...updateState, [e.target.id]: e.target.value})
        console.log(e.target.value)
        console.log(e.target.id)
    }

    const handleUpdate = async () => {
        console.log(id)
        console.log(updateState)
        try {
            await axios.put(`http://127.0.0.1:8000/events/${id}`, updateState)

            console.log(updateState.field)

            setEditMode(false)
            setAxiosAction(true)

        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setEditMode(false)
        setUpdateState(initialState)
    }


    if (!editMode) {
        return <button className='admin-edit-button' onClick={() => setEditMode(true)}>Edit</button>
    }

    return (
        <>
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
                
                    <label>Attendees: </label>
                    <input type="text" id="attendees" onChange={handleChange} value={updateState.attendees}/>
                
                    <label>Tasks: </label>
                    <input type="text" id="tasks" onChange={handleChange} value={updateState.tasks}/>

                    <label>Expenses: </label>
                    <textarea id="expenses" onChange={handleChange} value={updateState.expenses}/>
               
                    <button className="update-button" onClick={handleUpdate}>Update</button>
                    <button onClick={handleClose}>CLOSE</button>
        
            </div>
           
        </>
       
    )
}


export default AdminUpdate