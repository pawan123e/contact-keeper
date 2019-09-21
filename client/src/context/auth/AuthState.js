import React, {useReducer} from 'react';
import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     CLEAR_ERRORS,
     LOADED_USER,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOG_OUT
    } from '../types';
import authReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'

const AuthState = props => {
    const initialState = {
        isAuthenticated: null,
        loading: true,
        token: localStorage.getItem('token'),
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
           const res = await axios.get('/api/users');
           dispatch({type: LOADED_USER, payload: res.data.user}) 
        } catch (error) {
            console.log(error)
           dispatch({type: AUTH_ERROR, payload:error.response.data.message}) 
        }
    }
    
    const registerUser =async user => {
        const config = { headers: {'Content-Type': 'application/json' }}
        try {
            const res = await axios.post('/api/users/signUp', user, config);
            dispatch({type: REGISTER_SUCCESS, payload: res.data.data})
            loadUser();
        } catch (err) {
            console.log(err)
            dispatch({type: REGISTER_FAIL, payload:err.response.data.message})
         }
    }
    
    const loginUser = async user => {
        const config = {headers: {'Content-Type': 'application/json'}}
        try {
            const res = await axios.post('/api/users/signIn', user, config);
            dispatch({type: LOGIN_SUCCESS, payload: res.data})
            loadUser();
        } catch (error) {
            dispatch({type: LOGIN_FAIL, payload: error.response.data.message})
        }
    }
    
    const logout = () => {
        dispatch({type: LOG_OUT})
    }

    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }

    return (
        <AuthContext.Provider 
         value={{
             loading: state.loading,
             isAuthenticated: state.isAuthenticated,
             error: state.error,
             token: state.token,
             user: state.user,
             registerUser,
             clearErrors,
             loadUser,
             loginUser,
             logout
         }} 
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;