import React, {useContext, useEffect} from 'react'
import ContactFilter from './ContactFilter'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import Spinner from '../layout/Spinner'
const ContactList = () => {

    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts, loading} = contactContext;

    useEffect(() => {
        getContacts();
    },[])

    if(contacts !== null && contacts.length === 0){
        return ( 
        <div>
        <ContactFilter/>
        <h3> Contact List is empty</h3>    
        </div> 
        )
    }
    else return (
        <div>
            <ContactFilter/>
            {contacts !== null && !loading ? 
            (filtered !== null ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact}/>
            )) : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact}/>
            ))) :( <Spinner/>)
        }
            
            <br/>
        </div>
    )
}

export default ContactList
