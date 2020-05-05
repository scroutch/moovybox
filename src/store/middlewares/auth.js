import axios from 'axios';

import { LOGIN, enterMove } from 'src/store/actions';

export default (store) => (next) => (action) => {
  console.log('MW Auth');

  switch (action.type) {
    case LOGIN: {
      axios
        .post('http://18.206.96.118:3000/signup', {
          email: store.getState().email,
        }, {
          withCredentials: true,
        })
        .then((response) => {
          store.dispatch(enterMove(action.history));
        });
        
      return;
    }

    default: {
      next(action);
    }
  }
};
