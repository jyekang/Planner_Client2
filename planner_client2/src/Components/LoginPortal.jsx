import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
 
const LoginPortal = () => {

    const admins = [
        {
            username: 'admin1',
            password: 'password1',
        },
        {
            username: 'admin2',
            password: 'password2',
        },
        {
            username: 'admin3',
            password: 'password3',
        },
    ]

    const default_input = {
        username: '',
        password: '',
    }
    
    const [buttonStatus, setButtonStatus] = useState(true);
    const [formState, setFormState] = useState(default_input)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }

    useEffect(() => {
        if (admins.find(admin => admin.username === formState.username && admin.password === formState.password)) {
            setButtonStatus(false)
        } else {
            setButtonStatus(true)
            console.log(formState.username)
            console.log(formState.password)
        }
    },[formState])

    return (
        <div className='login-route-body' >
            <label htmlFor='username'>Username:</label>
            <input id='username' type='text' onChange={handleChange} value={formState.username}/>
           
            <label htmlFor='password'>Password:</label>
            <input id='password' type='password' onChange={handleChange} value={formState.password}/>
            
            <button disabled={buttonStatus} onClick={() => navigate('/admin')}>Login</button>
        </div>
    )
}
export default LoginPortal