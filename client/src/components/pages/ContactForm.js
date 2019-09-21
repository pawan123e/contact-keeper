import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const {addContact, current, clearCurrent, updateContact} = contactContext;
    
    useEffect(() => {
        if(current !== null){
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'Personal'
            })
        }
    }, [contactContext, current])
    
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'Personal'
    })
    
    const {name, email, phone, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        } else {
            updateContact(contact);
            clearCurrent();
        }
        
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'Personal'
        })
        
    }

    return (
        <div className="contactsform ">
            <h2 className="text-info text-center mb-4">{current !== null ? 'Edit Contact' : 'Add Contact'}</h2>
            <form className="mb-2" onSubmit={onSubmit}>
                <input type="text" name="name" className="form-inputs" placeholder="Name" value={name} onChange={onChange} required/>
                <input type="email" name="email" className="form-inputs" placeholder="Email" value={email} onChange={onChange} required/>
                <input type="text" name="phone" className="form-inputs" placeholder="Phone" value={phone} onChange={onChange} required/>
                <label>Contact Type</label><br/>
                <input type="radio" name="type" value='Personal' checked={type === 'Personal'} onChange={onChange}/>Personal {' '}
                <input type="radio" name="type" value='Professional' checked={type === 'Professional'} onChange={onChange}/>Professional
                <input type="submit" className="btns" value={current !== null ? 'Edit Contact' : 'Add Contact'}/>
            </form>
                {current && <button className="btns btn-simple" onClick={() => clearCurrent() }>Clear</button>}
        </div>
    )
}

export default ContactForm
