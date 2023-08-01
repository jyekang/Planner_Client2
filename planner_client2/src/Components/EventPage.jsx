// import { useState, useEffect } from "react"
// import { NavLink, useParams } from "react-router-dom";
// import axios from 'axios'

// const EventPage = () => {
//     const initialState = {
//         "id": null,
//         "event_name": "",
//         "date": "",
//         "time": "",
//         "budget": 0,
//         "location": "",
//         "attendees": "",
//         "tasks": "",
//         "expenses": "expenses"
//     }

//     const [event, setEvent] = useState();
//     let { id } = useParams()
//     const [updateState, setUpdateState] = useState(initialState);

//     useEffect(() => {
//         const getEvents = async() => {
//             const response = await axios.get(`http://127.0.0.1:8000/events/${id}`)
//             setEvent(response.data)
//         }
//         console.log('got events')
//         getEvents()
//     }, [id])

//     const handleChange = (e) => {
//         setUpdateState({...updateState, [e.target.id]: e.target.value})
//         console.log(e.target.value)
//         console.log(e.target.id)
//     }

//     const handleUpdate = async () => {
//         console.log(id)
    
//         try {
//             await axios.put(`http://127.0.0.1:8000/events/${id}`, updateState)

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const handleClose = () => {
       
//         setUpdateState(initialState)
//     }

//     if (!event) {
//         return (
//             <div className='route-body'>
//                 <div className="loading">Loading...</div>
//             </div>
//         )
//     }
//     console.log(event)
//     return(
//         <div>
//         <div className='route-body'>
//             <NavLink to="/events" className="back-link">Back</NavLink>
//             <h2>{event.event_name}</h2>
            
//             <br />
//             <div className="date-time">Date: {event.date} | Time: {event.time}</div>
//            <br />
//             <div className="city-state">{event.location}</div>
            
//         </div>
//         <div>
//                 <div className="edit-div">
//                         <label>Event Name: </label>
//                         <input type="text" id="event_name" onChange={handleChange} value={updateState.event_name}/>
                    
//                         <label>Date: </label>
//                         <input type="date" id="date" onChange={handleChange} value={updateState.date}/>
                    
//                         <label>Time: </label>
//                         <input type="time" id="time" onChange={handleChange} value={updateState.time}/>
            
//                         <label>Budget: </label>
//                         <input type="number" id="budget" onChange={handleChange} value={updateState.budget}/>
    
//                         <label>Location: </label>
//                         <input type="text" id="location" onChange={handleChange} value={updateState.location}/>
                    
                    
                   
//                         <button className="update-button" onClick={handleUpdate}>UPDATE</button>
//                         <button onClick={handleClose}>Close</button>
            
//                 </div>
//                 </div>
//                 </div>
//     )
// }

// export default EventPage




import { useContext, useState, useEffect } from "react"
import axios from 'axios'

const EventPage = ({ event }) => {

    const initialState = {
        "event_name": event.event_name,
        "date": event.date,
        "time": event.time,
        "budget": event.budget,
        "location": event.location,
        "attendees": event.attendees,
        "tasks": event.tasks,
        "expenses": event.expenses,
    }

    const [updateState, setUpdateState] = useState(initialState);
    const [editMode, setEditMode] = useState(false);


    const handleChange = (e) => {
        setUpdateState({...updateState, [e.target.id]: e.target.value})
        console.log(e.target.value)
        console.log(e.target.id)
    }

    const handleUpdate = async (id) => {
        console.log(event.id)
        console.log(updateState)
        try {
            await axios.put(`http://127.0.0.1:8000/events/${event.id}`, updateState)

            console.log(updateState.field)

            setEditMode(false)
    

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
        {editMode ? (
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
                    <input type="text" id="city" onChange={handleChange} value={updateState.location}/>
                
                    <label>Attendees: </label>
                    <input type="text" id="attendees" onChange={handleChange} value={updateState.attendees}/>
                
                    <label>Tasks: </label>
                    <input type="text" id="tasks" onChange={handleChange} value={updateState.tasks}/>

                    <label>Expenses: </label>
                    <textarea id="expenses" onChange={handleChange} value={updateState.expenses}/>
               
                    <button className="update-button" onClick={handleUpdate}>Update</button>
                    <button onClick={handleClose}>Close</button>
        
            </div>
        ) : (
            <button className="admin-edit-button" onClick={() => setEditMode(true)}>
          Edit
        </button>
      )}
        </>
       
    )
}


export default EventPage