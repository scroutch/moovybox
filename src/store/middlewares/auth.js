import axios from 'axios';

import { LOGIN, enterMove } from 'src/store/actions';

export default (store) => (next) => (action) => {
  console.log('MW Auth');

  switch (action.type) {
    case LOGIN: {
      axios
        .post('http://localhost:3001/login', {
          email: store.getState().email,
          // password: store.getState().password,
        }, {
          withCredentials: true,
        })
        .then((response) => {
          store.dispatch(enterMove(action.history));
          console.log('Authenticated');
        }).catch(function(error) {
          console.log('Error on Authentication');
        });
        
      return;
    }

    default: {
      next(action);
    }
  }
};
