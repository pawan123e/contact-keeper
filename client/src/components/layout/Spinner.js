import React from 'react'
import spinner from './spinner.gif'
const Spinner = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
       <img src={spinner} alt='' className="img-fluid" style={{width: '500px'}}/>
       </div>
    )
}

export default Spinner