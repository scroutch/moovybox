import axios from 'axios';

import { LOGIN, enterMove } from 'src/store/actions';

const prodURL = 'http://18.206.96.118';

export default (store) => (next) => (action) => {
  console.log('MW Auth');

  switch (action.type) {
    case LOGIN: {
      axios
        .post('http://localhost:5050/signin', {
          email: store.getState().email,
          password: store.getState().password,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            store.dispatch(enterMove(action.history));
            console.log('Authenticated');
          }
          else {
            console.error('impossible de se connecter', response);
          }

          // store.dispatch(enterMove(action.history));
          // console.log('Authenticated - email');
        }).catch((error) => {
          console.log('Error on Authentication');
        });

      return;
    }

    default: {
      next(action);
    }
  }
};
