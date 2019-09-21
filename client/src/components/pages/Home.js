import React, {useContext, useEffect} from 'react'
import ContactForm from './ContactForm'
import ContactList from './ContactList'
import AuthContext from '../../context/auth/authContext';
const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
    }, [])  

    return (
        <div className="home">
            <ContactForm/>
            <ContactList/>
        </div>
    )
}

export default Home
