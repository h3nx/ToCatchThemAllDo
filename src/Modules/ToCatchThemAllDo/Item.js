import { default as UUID } from "node-uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSpinner, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { InputForm } from "./InputForm"


const ItemState = {
    UNFINISHED: "Unfinished",
    FINISHED: "Finished"
}
const SpriteState = {
    LOADING: "Loading",
    NOSPRITE: "N/A",
}
function ItemData(name, sprite) {
    // UUID.v4() generating 32 characters (0-f) for unique ID, overkill for this, but easiest to use
    this.id = UUID.v4();
    this.name = name;
    this.state = ItemState.UNFINISHED;
    // if sprite is not supplied set as loading
    this.sprite = sprite === undefined ? SpriteState.LOADING : sprite;
    this.editing = false;
}

function renderSprite(itemData) {
    
    if(itemData.sprite === SpriteState.LOADING) {
        // render loading icon if loading
        return (
            <FontAwesomeIcon className="logo-spin" icon={faSpinner} style={{paddingRight:"5px",height:"100%"}}/>
        );
    } else if(itemData.sprite === SpriteState.NOSPRITE) {
        // empty space if no sprite available, currently not in use anywhere
        return(
            <div></div>
        )
    } else {
        // render sprite as img
        return(
            <img src={itemData.sprite} alt={"Sprite of "+itemData.name}/>
        )
    }
}
function renderText(itemData, onSubmit) {
    if(itemData.editing) {
        return(
            <InputForm 
                onSubmit={(value, onSuccess, onError) => onSubmit(value, onSuccess, onError)} 
                style={{height:"80%", margin:"5px", flex:24}} 
                startValue={itemData.name} 
                error={itemData.error}
            />
        )
    } else {
        return (
            <p>{itemData.name}</p>
        )
    }
}

function Item({itemData, onDelete, onChange, onEdit, onCancelEdit, onFinishEdit}) {
    return(
    <div className={"f r sb item " +itemData.state} style={{order:itemData.state===ItemState.FINISHED ? "1":"0"}}>
        {/* checkbox for completing task */}
        <input type="checkbox" onChange={()=>{onChange()}} style={{width:"20px"}}></input>
        
        {/* render sprite with name or editbox*/}
        <div className="f r" style={{ paddingLeft:"5px", paddingRight:"20px", flex:10}}>
            {renderSprite(itemData)}
            {renderText(itemData, onFinishEdit)}
        </div>
        
        {/* button for editing name, changes into cancel icon while editing */}
        <button className="iconButton" onClick={() => {itemData.editing ? onCancelEdit() : onEdit()}}>
            <FontAwesomeIcon icon={itemData.editing ? faTimes:faEdit}/>
        </button>
        
        {/* button for deleting task*/}
        <button className="iconButton" onClick={() => {onDelete()}}>
            <FontAwesomeIcon icon={faTrashAlt}/>
        </button>
    </div>
    );
}

export {Item, ItemData, ItemState};
