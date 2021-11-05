import { useState } from "react"; 
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";


function InputForm({onSubmit, style, placeHolder, startValue}) {
    
    // 
    const [data, setName] = useState(startValue);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    function updateName(event) {
        setName(event.target.value);
    } 
    function clear() {
        setName("");
    }
    function renderError() {
        if(error) {
            return ( 
                <div style={{position:"absolute", top:"35px", background:"white", border:"black 1px solid", zIndex:"5", borderRadius:"3px"}}>
                    <p style={{color:"red", padding:"2px", margin:"0"}}>{errorMessage}</p>
                </div>
            )
        }
    }
    
    return(
        <form 
            className="f sb" style={{...style, position:"relative"}}
            onSubmit={
                (event) => {
                    event.preventDefault();
                    onSubmit(
                        DOMPurify.sanitize(data.toLowerCase()),
                        // on success
                        () => {
                            clear();
                            setError(false)
                        },
                        // on error
                        (state, errorMessage) => {
                            setError(state);
                            if(errorMessage !== undefined) {
                                setErrorMessage(errorMessage)
                                console.log("click");
                            }
                        }
                    )
                }
            }
        >
        <input 
            type="text" 
            value={data} 
            onChange={updateName} 
            style={{flex:10, border:error ? "solid 1px red" : ""}} 
            placeholder={placeHolder}
        />
        {/* button with SVG as submit, not sure if ok to do this according to comment here: https://stackoverflow.com/a/26218654 */ }
        <button 
            type="submit"
            className="iconButton" 
        >
            <FontAwesomeIcon icon={faPlus}/>
        </button>  
        {renderError()} 
        </form>  
    )
}

export {InputForm};