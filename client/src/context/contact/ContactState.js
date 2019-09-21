import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios'
import {
    ADD_CONTACT,
    FILTER_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    GET_CONTACTS,
    CONTACT_ERROR
} from '../types'
import uuid from 'uuid'

const ContactState = props => {
    const initialState = {
       contacts: null,
        filtered: null,
        current: null,
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    
    const getContacts =async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({type: GET_CONTACTS, payload: res.data.contacts})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.message})
        }
    }

    const addContact =async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({type: ADD_CONTACT, payload: res.data.contact})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.message})
        }
        
    }
    
    const filterContact = search => {
        dispatch({type: FILTER_CONTACT, payload: search})
    }
    
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type: DELETE_CONTACT, payload: id})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.message})
        }
        
    }
    
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }
    
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }
    
    const updateContact =async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await axios.patch(`/api/contacts/${contact._id}`, contact, config)
            dispatch({type: UPDATE_CONTACT, payload: contact})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.message})
        }
        
    }
   
    return(
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            filtered: state.filtered,
            current: state.current,
            error: state.error,
            loading: state.loading,
            addContact,
            filterContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            getContacts
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;