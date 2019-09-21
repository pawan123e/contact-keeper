import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    FILTER_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT
} from '../types'
import uuid from 'uuid'

const ContactState = props => {
    const initialState = {
       contacts:  [{
            id: 1,
            name: 'Pawan Kumar',
            type: 'Personal',
            email: 'pawan@gmail.com',
            phone: '4343-43434'
        },
        {   
            id: 2,
            name: 'Naman',
            type: 'Professional',
            email: 'pawan@gmail.com',
            phone: '4343-43434'
        },
        {   
            id: 3,
            name: 'Vijay Singh',
            type: 'Personal',
            email: 'pawan@gmail.com',
            phone: '4343-43434'
        }],
        filtered: null,
        current: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({type: ADD_CONTACT, payload: contact})
    }
    
    const filterContact = search => {
        dispatch({type: FILTER_CONTACT, payload: search})
    }
    
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }
    
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }
    
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }
    
    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact})
    }

    return(
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            filtered: state.filtered,
            current: state.current,
            addContact,
            filterContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;