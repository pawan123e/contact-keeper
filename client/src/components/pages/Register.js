import React,{useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = props => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;
    const authContext = useContext(AuthContext);
    const {registerUser, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }

        if(error !== null&& error !== 'Unauthorized access..'){
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const {name, email, password, confirmPassword} = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setAlert('Password not matched', 'danger');
        }
        else {
            registerUser(user)
    }
    }

    return (
        <div className=" mt-5 register-page">
            <h3>Account <span className="blue">Register</span></h3>
            <br/>
            <form onSubmit={onSubmit} >
                <label >Name</label>
               <input  type="text" name="name" className="form-inputs" value={name} onChange={onChange} required/>
               <label >Email</label>
               <input type="email" name="email" className="form-inputs" value={email} onChange={onChange} required/>
               <label >Password</label>
               <input type="password" name="password" className="form-inputs" value={password} onChange={onChange} required/>
               <label >Confirm Password</label>
               <input type="password" name="confirmPassword" className="form-inputs" value={confirmPassword} onChange={onChange} required/>
               <input type="submit" className="btns" value='Register'/>
            </form>
        </div>
    )
}

export default Register
