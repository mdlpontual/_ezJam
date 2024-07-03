import React from "react";
import { Popover } from '../../node_modules/bootstrap/dist/js/bootstrap.esm.min.js';

function PopoverDemo() {
    
    React.useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
          .forEach(popoverNode => new Popover(popoverNode))
    }) 
 
    return(
        <div>
            <button type="button" 
            class="btn btn-dark me-2" 
            data-bs-container="body" 
            data-bs-toggle="popover" 
            data-bs-placement="left" 
            title="I am popover"
            data-bs-content="Left popover">
                Popover on left
                </button>
        </div>
    )
}          

export default PopoverDemo;