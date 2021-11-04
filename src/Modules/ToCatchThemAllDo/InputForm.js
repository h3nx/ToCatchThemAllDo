import { useState } from "react"; 
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";



function InputForm({onSubmit, style, placeHolder, error, startValue}) {
    
    const [name, setName] = useState(startValue);
    // function cleanse(str)
    function updateName(event) {
        setName(event.target.value);
    } 
    function clear() {
        setName("");
    }
    
    
    
    return(
    <div className="f sb" style={style}>
        <input type="text" value={name} onChange={updateName} style={{flex:10,border:error?"solid 1px red":""}} placeHolder={placeHolder}></input>
        <button className="iconButton" onClick={()=>{onSubmit(DOMPurify.sanitize(name.toLowerCase()));clear()}}>
            <FontAwesomeIcon icon={faPlus}/>
        </button>         
    </div>)
}

export {InputForm};