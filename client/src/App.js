import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notification, setNotification] = useState('');
  const [phoneBook, setPhoneBook] = useState([]);

  const addNewNumber = async () => {
    try {
      await Axios.post('http://localhost:8080/add-phone', {name, phone});
      setNotification('Number added successfully');
      setName('');
      setPhone('');
      fetchPhoneBook();
    } catch (error) {
      setNotification('Failed to add number');
    }
  }

  const fetchPhoneBook = async () => {
    try {
      const response = await Axios.get('http://localhost:8080/get-phone');
      console.log(response.data);
      // setPhoneBook(response.data.phoneNumbers);
      setPhoneBook(Array.isArray(response.data.phoneNumbers) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch phone book: ', error);
      setPhoneBook([]);
    }
  };

  useEffect(() => {
    fetchPhoneBook();
  }, []);

  return (
    <div className='container'>
      <label htmlFor=''>Name: </label>
      <input type='text' onChange={(e) => {setName(e.target.value)}} /><br /><br />

      <label htmlFor=''>Phone: </label>
      <input type='number' onChange={(e) => {setPhone(e.target.value)}} /><br /><br />

      <button onClick={addNewNumber}>Add New Number</button>

      {notification && <p>{notification}</p>}

      <h1>PhoneBook List</h1>
      <ul>
        {Array.isArray(phoneBook) && phoneBook.length > 0 ? (
          phoneBook.map((phone) => (
            
          )
        )}
      </ul>
    </div>
  )
}

export default App;
