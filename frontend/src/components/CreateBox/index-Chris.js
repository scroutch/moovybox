import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [label, setLabel] = useState('');
  const [destination_room, setDestinationRoom] = useState('');
  const [fragile, setFragile] = useState('');
  const [floor, setFloor] = useState('');
  // // const [user_id, setUserId] = useState('');
  const [move_id, setMoveId] = useState('');
  const [heavy, setHeavy] = useState('');
  const [user_id, setUserId] = useState('');
 
  function handleLabelChange(e) {
    console.log('input au onChange label ', e.target.value);
    setLabel(e.target.value);
  }
  function handleDestinationRoomChange(e) {
    console.log('input au onChange', e.target.value);
    setDestinationRoom(e.target.value);
  }
  function handleFragileChange(e) {
    console.log('input au onChange', e.target.value);
    setFragile(e.target.value);
  }
  function handleFloorChange(e) {
    console.log('input au onChange', e.target.value);
    setFloor(e.target.value);
  }
  function handleMoveIdChange(e) {
    console.log('input au onChange', e.target.value);
    setMoveId(e.target.value);
  }
  function handleHeavyChange(e) {
    console.log('input au onChange', e.target.value);
    setHeavy(e.target.value);
  }
  function handleUserIdChange(e) {
    console.log('input au onChange userID', e.target.value);
    setUserId(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    console.log('input au onSubmit', label, destination_room, heavy, fragile, floor, move_id, user_id); // destination_room, heavy, fragile, floor,
    axios
      .post(`http://18.206.96.118/box`, { label, destination_room, heavy, fragile, floor, move_id, user_id},{credentials: true})  // ,{credentials: true}
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }
  return (
    <form onSubmit={handleSubmit}>

      <input placeholder="label" value={label} onChange={handleLabelChange} />{' '}
      <input placeholder="destination_room" value={destination_room} onChange={handleDestinationRoomChange} />{' '}
      <input placeholder="fragile" value={fragile} onChange={handleFragileChange} />{' '}
      <input placeholder="heavy" value={heavy} onChange={handleHeavyChange} />{' '}
      <input placeholder="floor" value={floor} onChange={handleFloorChange} />{' '}
      <input placeholder="user_id" value={user_id} onChange={handleUserIdChange} />{' '}
      <input placeholder="move_id" value={move_id} onChange={handleMoveIdChange} />{' '}
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
