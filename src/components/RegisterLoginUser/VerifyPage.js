import React  from 'react';

function VerifyPage(){
    return (
        <div>
            <div>
                <h2>Verify your OTP!</h2>
            </div>
            

            <form action='/SuccessfulSignup'>

               
                <label for="otp"> <h4>Enter OTP send to your number</h4></label>
                <input type="text" id="otp" name="otp" maxlength="6" required/>


            

            
                <button>Verify</button>
            
            </form>

        </div>
    );
}
export default VerifyPage;