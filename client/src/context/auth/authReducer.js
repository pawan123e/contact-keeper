import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     CLEAR_ERRORS,
     AUTH_ERROR,
     LOADED_USER,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOG_OUT
        } from '../types';

export default (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:     
        localStorage.setItem('token', action.payload.token)
        return {
            ...state,
            ...action.payload,
            loading: false,
            isAuthenticated: true,
        }

        case REGISTER_FAIL: 
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOG_OUT:
        localStorage.removeItem('token')
        return {
            ...state,
            error: action.payload,
            token: null,
            loading: false,
            isAuthenticated: false,
            user: null
        }
        
        case LOADED_USER: 
          return {
              ...state,
              user: action.payload,
              loading: false,
              isAuthenticated: true    
          }

        case CLEAR_ERRORS: 
        return {
            ...state,
            error: null
        }
        default: 
        return state;
    }
}