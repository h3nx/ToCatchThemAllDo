import { useState } from "react"; 
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




function InputForm({onSubmit, style}) {
    
    const [name, setName] = useState("");
    function updateName(event) {
        setName(event.target.value);
    } 
    function clear() {
        setName("");
    }
    return(
    <div className="f" style={style}>
        <input type="text" value={name} onChange={updateName}></input>
        <button className="iconButton" onClick={()=>{onSubmit(name);clear()}}>
            <FontAwesomeIcon icon={faPlus}/>
        </button>            
    </div>)
}

export {InputForm};