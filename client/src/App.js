import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./components/Header";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };

  return (
    <div>
      <Header/>
    <div className="App noSelect">
    <div>
        <input
          className='formContent'
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          className='formContent'
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          className='formContent'
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button className="btn btn-primary" onClick={createUser}> Create User </button>
      </div>

      <div className="mainSection">
        {listOfUsers.map((user) => {
          return (
            <div className="subSection">
              <h3>Name: {user.name.toUpperCase()}</h3>
              <h3>Age: {user.age}</h3>
              <h4>Username: {user.username}</h4>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
