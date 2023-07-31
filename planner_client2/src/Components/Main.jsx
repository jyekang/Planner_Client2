import { Route, Routes } from 'react-router-dom'
import EventList from "./EventList"
import Home from './Home'
import EventPage from './EventPage'
import LoginPortal from './LoginPortal'
import AdminPage from './AdminPage'

const Main = () => {

    return (
     
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/events' element={<EventList />} />
                <Route exact path='/events/:id' element={<EventPage />} />
                <Route exact path='/login' element={<LoginPortal/>} />
                <Route exact path='/admin' element={<AdminPage/>} />
            </Routes>
      
    )
}

export default Main