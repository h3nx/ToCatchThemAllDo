import './App.css';
import { ToCatchThemAllDo } from "./Modules/ToCatchThemAllDo/List"


function App() {
  return (
    <div className="App">
        <div className="title">
          To <sub style={{color:"gray", fontSize:"30px"}}>Catch them all</sub> Do
        </div>
        <ToCatchThemAllDo/>
    </div>
  );
}

export default App;