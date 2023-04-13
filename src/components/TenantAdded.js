import React, { Component }  from 'react';
import {Link} from 'react-router-dom';
import TenantAcss from "./TenantA.css";
function TenantAdded(){
    return(
        <div className='addedTenant'>
            
           
            <div className='TenantA '>
            <h4>Tenant Added Successfully</h4>
            </div>
            
           <div>
           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAbBJREFUaEPtVwtuwzAIpSdbd7JtJ9t2sk1PGlWUYvMAO1E0W6paKSm8D2D7Jhdft4vjl0XgbAeXA8uBogKrhIoClv/+bx24i8jbRr7vv9/vZUmDAaIOKHB8t9aHiBxGJEIAoLaq97R6FZGvoJip1yMEfgIZAB4kpi+WQER9BX2ICzMJHOICSyBSPurAKAIYGM1+mkkARNj4rV7R0m1ONjbBp4j0RqcFoOrAvu9MEiyBTBNX9oNWvqfBwBKA+nAhstjY+5gt8CUHkCTiQlb9EPhMkzEkGPDWZAmDzxBQu5HsZdPYOuYA3jtCWJMlBb5CINIL23etyYLn1hmLcbI8pyNEIoOAAh91AADwQelgWfsCEmOhjKxSGtVDD+GYUcfcAVobmdUTPRK08prQI8Ao5pWRBcqKGwbvldAI8ErOI5EC3yMQaTjPAX1u3Q/06pm+grZKKHN484hUD3dmfIvADPV7LnjEu88tAiNrf588XestFkcTGF5GFoHM9ZEtg8sT8EY3K0R3J57pwCEEwiqc+QfvKHEmNir3IkDJNPGl5cBEcanQywFKpokvLQcmikuF/gWxRFMxjdO7wwAAAABJRU5ErkJggg==" alt="My Image" title="Tenant Added sucessfully" />"
           </div>

           <div>Tenant Name: <b>Aparajita Mehrotra</b> </div>

           <button className='TenantBtn' style={{  fontWeight: "900" }}><Link to="/Dashboard">Go To Dashboard</Link></button>


        </div>
       

    );
}
export default TenantAdded;