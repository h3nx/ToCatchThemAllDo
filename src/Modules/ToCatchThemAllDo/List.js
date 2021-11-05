import { useState } from "react"; 
import { Item, ItemData, ItemState } from "./Item";
import { InputForm } from "./InputForm";

//Styles
import "./ToCatchThemAllDo.css"


function ToCatchThemAllDo() {
    // list containing ItemData from ./Item
    const [listData, setListData] = useState([]);
    
    
    // API USAGE
    function fetchData(url, func, onError) {
        // using fetch method to fetch data from API using supplied URL
        fetch(url,{ method: 'GET', headers: {  'Content-Type': 'application/json', }})
        .then((result)=> {
            // Check if API found data or not
            if(result.ok) {
                return result;
            } else {
                throw new Error("does not exist");
            }
        })
        .then(result => result.json())
        .then((result) => {
            // send found data into supplied function, example functions in "addItem" and "finishEditing"
            func(result);
        })
        .catch((error) => {onError(true, "Something went wrong")});
    }
    
    
    // MANIPULATION OF DATA
    
    function addItem(input, onSuccess, onError) {
        // fetch data from API
        fetchData("https://pokeapi.co/api/v2/pokemon/" + input, (result) => {
            // pokemon found in API, create new ItemData with name and sprite from API
            onSuccess();
            setListData([...listData, new ItemData(result.name, result.sprites.front_default)]);
        }, (error) => {
            // pokemon not found in API
            onError(true, "Pokemon not found");
        })
    }
    function removeItem(id) {
        // removes the item with the id "id" by returning the rest of the items
        setListData(listData.filter((value, index, arr) => {return value.id !== id}));
    }
    function updateItemState(id, newState) {
        // updates the item with the id by changing the data and then returning it, and just returning the rest
        setListData(listData.map((item) => (item.id === id) ? {...item, state:newState} : item ));
    }
    function updateItemSprite(id,sprite) {
        // updates the item with the id by changing the data and then returning it, and just returning the rest
        setListData(listData.map((item) => (item.id === id) ? {...item, sprite:sprite} : item ));
    }
    function updateItemTypeSprite(id,type) {
        // updates the item with the id by changing the data and then returning it, and just returning the rest
        setListData(listData.map((item) => (item.id === id) ? {...item, typeSprite:type} : item ));
    }
    function setItemEditing(id) {
        // updates the item with the id by changing the data and then returning it, and just returning the rest
        setListData(listData.map((item) => (item.id === id) ? {...item, editing:true} : item));
    }
    function setItemCancelEditing(id) {
        // updates the item with the id by changing the data and then returning it, and just returning the rest
        setListData(listData.map((item) => (item.id === id) ? {...item, editing:false, error:false} : item));
    }
    function finishEditing(id, name, onSuccess, onError) {
        // fetching the pokemon data from the API, then updating the item with id with the new data, then returning it, and just returning the rest
        fetchData("https://pokeapi.co/api/v2/pokemon/" + name, (result) => {         
            setListData(listData.map((item) => (item.id === id) ? {...item, name:result.name, sprite:result.sprites.front_default, editing:false} : item ));
        },(error)=> {
            // on error run the function sent by the input box letting it know to display and error
            onError(true, "Pokemon not found");
        })
    }
    
    
    
    return( 
        <div className="f c v list">
            {
                // render all items
                listData.map((item) => {
                    return (
                        <Item
                            key={item.id}    
                            itemData={item}
                            onDelete={() => {removeItem(item.id)}}
                            onChange={() => {updateItemState(item.id, (item.state === ItemState.FINISHED) ? ItemState.UNFINISHED : ItemState.FINISHED)}}
                            onEdit={() => setItemEditing(item.id)}
                            onCancelEdit={() => setItemCancelEditing(item.id)}
                            onFinishEdit={(name, onSuccess, onError) => finishEditing(item.id, name, onSuccess, onError)}
                        />
                    )                
                })
            }
            {/* input form for adding new items*/}
            <InputForm
                onSubmit={(value, onSuccess, onError) => {addItem(value, onSuccess, onError)}}
                style={{marginBottom:"50px", marginTop:"10px", width:"300px"}}
                placeHolder="pokemon name or id (1-898)"
                startValue=""
            />
        </div>
    );
}

export {ToCatchThemAllDo};






