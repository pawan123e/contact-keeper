import React,{useContext} from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({contact}) => {
    
    
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent} = contactContext;
    const {_id, name, email, phone, type} = contact;
    
  
        return (
            <div className="contactcard">            
            <div className="carddetail">
            <div className="top">
            <h6 className="headings">{name}
            <span style={{float: 'right'}} className="badges">{type}</span></h6>
            </div>
            <h6><i className="fas fa-envelope-open"></i>{' '}{email}</h6>
            <h6><i className="fas fa-phone"></i>{' '}{phone}</h6>
            <div >
                <button className="btns-dark" onClick = {() => setCurrent(contact)}>Edit</button>
                <button className= "btns-danger" onClick = {() => deleteContact(_id)}>Delete</button>
            </div>
            </div>
        </div>
    ) 
    }


export default ContactItem
