import React,{useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = props => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;
    const authContext = useContext(AuthContext);
    const {loginUser, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }

        if(error !== null && error !== 'Unauthorized access..'){
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    
    const { email, password} = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        loginUser(user);
    }
    return (
        <div className="mt-4" style={{width: '30%', margin: 'auto'}}>
            <h3>Account <span className="blue">Login</span></h3>
            <br/>
            <form onSubmit={onSubmit}>
               <label >Email</label>
               <input type="email" name="email" className="form-inputs" value={email} onChange={onChange}/>
               <label >Password</label>
               <input type="password" name="password" className="form-inputs" value={password} onChange={onChange}/>
               <input type="submit" className="btns" value='Login'/>
            </form>
        </div>
    )
}

export default Login
