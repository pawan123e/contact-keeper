import React,{useContext, useState} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContact} = contactContext;
    const [search, setSearch] = useState('');
    
    const onChange = e => {
        setSearch(e.target.value);
        filterContact(e.target.value)   
    }

    return (
        <div className="contactsform">
            <input type="text" placeholder="Filter Contacts..." 
            className="form-inputs" 
            value={search}
            onChange={onChange}/>
        </div>
    )
}

export default ContactFilter
