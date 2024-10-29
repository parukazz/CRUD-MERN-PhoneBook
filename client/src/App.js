import React, { useState } from 'react';
import Axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [notification, setNotification] = useState('');

  const addNewNumber = async () => {
    try {
      await Axios.post('http://localhost:8080/add-phone', {name, phone});
      setNotification('Number added successfully');
      setName('');
      setPhone(0);
    } catch (error) {
      setNotification('Failed to add number');
    }
  }

  return (
    <div className='container'>
      <label htmlFor=''>Name: </label>
      <input type='text' onChange={(e) => {setName(e.target.value)}} /><br /><br />

      <label htmlFor=''>Phone: </label>
      <input type='number' onChange={(e) => {setPhone(e.target.value)}} /><br /><br />

      <button onClick={addNewNumber}>Add New Number</button>

      {notification && <p>{notification}</p>}
    </div>
  )
}

export default App;
