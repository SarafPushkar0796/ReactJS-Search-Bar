import './App.css';
import JSONDATA from './MOCK_DATA';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <input data-test="input-search" type="text" placeholder="Search by first name" onChange={event => {
        setSearchTerm(event.target.value)
      }}/>

      {/* Displaying Mock data and filtering the result out */}
      {JSONDATA.filter((data)=>{
        if(searchTerm === ""){
          return data;

          /**
           * .toLocaleLowerCase() doesnot modify the calling string
           * however, .toLowerCase() returns a new string representing the calling string converted to lower case.
           */
        } else if((data.first_name).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
          return data;
        }
      }).map((val, key) => {

        // key makes it the <div> uniquely identifiable
        return <div data-test="username-list" className="user" key={key}><p>{val.first_name}</p></div>
      })}
    </div>
  );
}

export default App;
