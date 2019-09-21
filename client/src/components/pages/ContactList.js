import React, {useContext} from 'react'
import ContactFilter from './ContactFilter'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
const ContactList = () => {

    const contactContext = useContext(ContactContext);
    const {contacts, filtered} = contactContext;
    if(contacts.length === 0){
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
            {filtered !== null ? filtered.map(contact => (
                <ContactItem key={contact.id} contact={contact}/>
            )) : contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact}/>
            ))}
            <br/>
        </div>
    )
}

export default ContactList
