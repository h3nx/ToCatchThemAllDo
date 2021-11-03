import { useState, useEffect } from "react"; 
import {Item, ItemData, ItemState} from "./Item";
import {InputForm} from "./InputForm";
import data from "./temp.json"
//Styles
import "./ToDo.css"


function ToDo() {
    
    const [listData, setListData] = useState([
        // new ItemData("Bulba","Grass"),
        // new ItemData("Charmander","Fire"),
        // new ItemData("Squirtle","Water")
    ]);
    
    
    // useEffect(() => {
    //     fetch( "https://pokeapi.co/api/v2/generation/1", { method: 'GET', headers: {  'Content-Type': 'application/json', }} )
    //     .then(result => result.json())
    //     .then(
    //         (result) => {
    //             console.log(result);
                
    //         },
    //         (error) => {
                
    //             console.log("potato",error);
    //             // setIsLoaded(true);
    //             // setError(error);
    //         }
    //     )
    // }, []);
    
    function addItem(input) {
        
        fetchData("https://pokeapi.co/api/v2/pokemon/" + input, (result) => {
            console.log(result);            
            var item = new ItemData(input); 
            item.sprite = result.sprites.front_default;
            setListData([...listData, item]);
            // fetchTypeSprite(item.id,result.types);
        })
        
    }
    function fetchData(url, func) {
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
        .catch((error) => {});
    }
    
    function fetchTypeSprite(id, urls) {
        console.log(id);
        urls.forEach((element) => {
            console.log(element);
            // fetchData(url, (result) => {
            
            // })
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
        setListData(listData.map((item) => (item.id === id) ? {...item, editing:false} : item));
        
    }
    function finishEditing(id, name) {
        fetchData("https://pokeapi.co/api/v2/pokemon/" + name, (result) => {
            console.log(result);            
            setListData(listData.map((item) => (item.id === id) ? {...item, name:name, sprite:result.sprites.front_default, editing:false} : item ));
        })
    }
    console.log(listData)
    return( <div className="f c list">
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
            style={{paddingBottom:"50px"}}
        />
        
                
    </div>);
}

export {ToDo};






