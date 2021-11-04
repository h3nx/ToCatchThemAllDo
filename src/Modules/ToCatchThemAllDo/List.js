import { useState, useEffect } from "react"; 
import {Item, ItemData, ItemState} from "./Item";
import {InputForm} from "./InputForm";

//Styles
import "./ToCatchThemAllDo.css"


function ToCatchThemAllDo() {
    
    const [listData, setListData] = useState([]);
    const [inputError, setError] = useState(false); 
    function addItem(input) {
        
        fetchData("https://pokeapi.co/api/v2/pokemon/" + input, (result) => {
            console.log(result);            
            var item = new ItemData(result.name); 
            item.sprite = result.sprites.front_default;
            setListData([...listData, item]);
            setError(false)
            // fetchTypeSprite(item.id,result.types);
        }, (error) => {
            setError(true);
        })
        
    }
    function fetchData(url, func, onError) {
        fetch(url,{ method: 'GET', headers: {  'Content-Type': 'application/json', }})
        .then((result)=> {
            if(result.ok) {
                return result;
            } else {
                throw new Error("does not exist");
            }
        })
        .then(result => result.json())
        .then((result) => {
            func(result);
        })
        .catch((error) => {onError()});
    }
    
    function fetchTypeSprite(id, urls) {
        console.log(id);
        urls.forEach((element) => {
            console.log(element);
            // fetchData(url, (result) => {
            
            // })
        },(error) => {
            
        })
        
    }
    
    function removeItem(id) {
        console.log(typeof(id));
        console.log("remove item with id:" + id);
        let list = listData.filter((value, index, arr) => {return value.id!==id})
        setListData(list);
    }
    function updateItemState(id, newState) {
        setListData(listData.map((item) => (item.id === id) ? {...item, state:newState} : item ));
    }
    function updateItemSprite(id,sprite) {
        setListData(listData.map((item) => (item.id === id) ? {...item, sprite:sprite} : item ));
    }
    function updateItemTypeSprite(id,type) {
        setListData(listData.map((item) => (item.id === id) ? {...item, typeSprite:type} : item ));
    }
    function setItemEditing(id) {
        setListData(listData.map((item) => (item.id === id) ? {...item, editing:true} : item));
    }
    function setItemCancelEditing(id) {
        setListData(listData.map((item) => (item.id === id) ? {...item, editing:false, error:false} : item));
        
    }
    function finishEditing(id, name) {
        fetchData("https://pokeapi.co/api/v2/pokemon/" + name, (result) => {
            console.log(result);            
            setListData(listData.map((item) => (item.id === id) ? {...item, name:result.name, sprite:result.sprites.front_default, editing:false} : item ));
            
        },(error)=> {
            setListData(listData.map((item) => (item.id === id) ? {...item, error:true} : item ));
            
        })
    }
    console.log(listData)
    return( <div className="f c v list">
        {
            listData.map((item) => {
                return (
                    <Item
                        key={item.id}    
                        itemData={item}
                        onDelete={() => {removeItem(item.id)}}
                        onChange={() => {updateItemState(item.id, (item.state === ItemState.FINISHED) ? ItemState.UNFINISHED : ItemState.FINISHED)}}
                        onEdit={() => setItemEditing(item.id)}
                        onCancelEdit={() => setItemCancelEditing(item.id)}
                        onFinishEdit={(name) => finishEditing(item.id, name)}
                    />
                )                
            })
        }
        
        <InputForm
            onSubmit={(value)=>{addItem(value)}}
            style={{marginBottom:"50px", width:"200px"}}
            placeHolder="pokemon name or id"
            error={inputError}
        />
        
                
    </div>);
}

export {ToCatchThemAllDo};






