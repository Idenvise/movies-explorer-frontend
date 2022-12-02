import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    const {nondisplay} = props;
    return (
        <div className={`preloader ${nondisplay ? nondisplay : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
