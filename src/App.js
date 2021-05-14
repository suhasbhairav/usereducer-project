import React, { useState, useReducer } from 'react';
import './App.css';

function App() {

  const initialState = [{
    id: Date.now(),
    name: "suhas",
    email: "suhas@suhas.com"
  }];

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return [...state, action.payload];

      case "delete":
        return state.filter(contact => {
          return contact.id !== action.payload.id;
        });

      // eslint-disable-next-line no-fallthrough
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addContact = (e) => {
    e.preventDefault();
    const contact = {
      id: Date.now(),
      name, email
    }
    setName("");
    setEmail("");
    dispatch({
      type: "add", payload: contact});
  };

  return (
    <div className="App">
      <h1>Use Reducer</h1>
      <h2>Add Contact</h2>
      <form onSubmit={addContact}>
        <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <div>
          <button type="submit">Add Contact</button>
        </div>
      </form>


      <ul>
        {state.map((contact) => {
          return (
            <li key={contact.id}>
              <h2>{contact.name}</h2>
              <h2>{contact.email}</h2>
              <div><button onClick={() => dispatch({ type: 'delete', payload: { id: contact.id } })} >Delete Contact</button></div>
            </li>);
        })}
      </ul>
    </div>
  );
}

export default App;
