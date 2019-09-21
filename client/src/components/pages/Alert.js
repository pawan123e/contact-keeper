import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alerts} = alertContext;
    return (
        
        alerts.length > 0 && alerts.map(alert => <div key = {alert.id} className={`background-${alert.type} `}>

         <p className="alert-msg">{alert.msg}!</p>
        </div>)
        
        
    )
}

export default Alert
