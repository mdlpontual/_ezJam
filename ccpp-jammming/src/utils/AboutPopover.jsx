import React from "react";
import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

function AboutPopover(props) {
    
    React.useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
            .forEach(popoverNode => {
                const popoverInstance = new Popover(popoverNode);
                popoverNode.addEventListener('shown.bs.popover', () => {
                    const popoverElement = document.querySelector('.popover');
                    if (popoverElement) {
                        popoverElement.style.width = "fit-content"; // Allows popover to grow with content
                        popoverElement.style.minWidth = "250px";    // Ensures a minimum width
                    }
                });
            });
    }, []);
 
    return(
        <div>
            <button
                id="about-button"
                type="button"
                className="btn btn-primary btn-block custom-popover"
                data-bs-container="body"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-html="true"
                title="<h4>Welcome to ezJam!</h4>"
                data-bs-content={props.content}
                onClick={(e) => e.stopPropagation()}>
                    About
            </button>
        </div>
    )
}          

export default AboutPopover;