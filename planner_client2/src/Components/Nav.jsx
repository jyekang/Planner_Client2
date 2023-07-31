import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className='nav-links'>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/login">Log In</Link>
            <Link to="/admin">AdminPage</Link>
        </div>
    )
}

export default Nav