import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleEmailChange(e) {
    console.log('input au onChange', e.target.value);
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    console.log('input au onChange', e.target.value);
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    console.log('input au onSubmit', email, password);
    axios
      .post('http://18.206.96.118/signin', { email, password })
      // .then(res => {
      //   console.log(res);
      //   console.log(res.data);
      // });
      .then((response) => {
        console.log(response);
        console.log('response.status',response.status);
        if (response.status === 200) {
          console.log('response.status',response.status);
          console.log('Authenticated');
        }
        else {
          console.error('impossible de se connecter', response);
        }
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={handleEmailChange} />{' '}
      <input placeholder="Password" value={password} onChange={handlePasswordChange} />{' '}
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
