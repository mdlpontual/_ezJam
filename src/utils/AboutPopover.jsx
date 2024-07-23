import React from "react";
import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

function AboutPopover(props) {
    
    React.useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
          .forEach(popoverNode => new Popover(popoverNode))
    }) 
 
    return(
        <div>
            <button id="about-button" type="button" 
            className="btn btn-primary" 
            data-bs-container="body" 
            data-bs-toggle="popover" 
            data-bs-placement="bottom" 
            title=""
            data-bs-content={props.content}>
                About
            </button>
        </div>
    )
}          

export default AboutPopover;