import { default as UUID } from "node-uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faSpinner, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { InputForm } from "./InputForm"


const ItemState = {
    UNFINISHED: "Unfinished",
    FINISHED: "Finished"
}
const SpriteState = {
    LOADING: "Loading",
    NOSPRITE: "N/A",
}
function ItemData(name, info) {
    this.id = UUID.v4();
    this.name = name;
    this.state = ItemState.UNFINISHED;
    this.info = info;
    this.sprite = SpriteState.LOADING;
    this.typeSprites = [SpriteState.LOADING];
    this.editing = false;
    this.editingError = false;
}

function noImage() {
    
}
function imageLoading() {
}
function imageLoaded(itemData) {
}

function renderSprite(itemData) {
    if(itemData.sprite === SpriteState.LOADING) {
        return (<FontAwesomeIcon className="logo-spin" icon={faSpinner} style={{paddingRight:"5px",height:"100%"}}/>);
    } else if(itemData.sprite === SpriteState.NOSPRITE) {
        return(<div></div>)
    } else {
        return(<img src={itemData.sprite} alt={"Sprite of "+itemData.name}/>)
    }
}

function renderTextPart(itemData, onSubmit) {
    if(itemData.editing) {
        return(
            <InputForm onSubmit={(value) => onSubmit(value)} style={{height:"80%", margin:"5px", flex:24}} startValue={itemData.name} error={itemData.error}/>
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
        <input type="checkbox" onChange={()=>{onChange()}} style={{width:"20px"}}></input>
        <div className="f r" style={{ paddingLeft:"5px", paddingRight:"20px", flex:10}}>
            {renderSprite(itemData)}
            {renderTextPart(itemData, onFinishEdit)}
            {/* {renderTypeSprite(itemData)} */}
            
        </div>
        
        <button className="iconButton" onClick={() => {itemData.editing ? onCancelEdit() : onEdit()}}>
            <FontAwesomeIcon icon={itemData.editing ? faTimes:faEdit}/>
        </button>
        <button className="iconButton" onClick={() => {onDelete()}}>
            <FontAwesomeIcon icon={faTrashAlt}/>
        </button>
    </div>
    );
}




function renderTypeSprite(itemData) {
    
    if(itemData.typeSprite === SpriteState.LOADING) {
        return (<FontAwesomeIcon className="logo-spin" icon={faSpinner} style={{paddingLeft:"5px",height:"100%"}}/>);
    } else if(itemData.typeSprite === SpriteState.NOSPRITE) {
        return(<div></div>)
    } else {
        return (<div>{itemData.map((element) => {
            return(<img src={itemData.typeSprite} alt={"Type sprite of "+itemData.name}/>)
        })}</div>)
        
    }
}

export {Item, ItemData, ItemState};
