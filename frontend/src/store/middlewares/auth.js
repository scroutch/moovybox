import axios from 'axios';

import { LOGIN, SYNC_PSEUDO, SYNC_PASSWORD, SYNC_ISLOGGED, SYNC_USER_ID, enterMove } from 'src/store/actions';

const prodURL = 'http://18.206.96.118';

axios.defaults.withCredentials = true; 

export default (store) => (next) => (action) => {
  //console.log('MW Auth');

  switch (action.type) {
    case LOGIN: {
      axios
        .post('http://localhost:5050/signin', {
          email: store.getState().email,
          password: store.getState().password,
        })
        .then((response) => {
          console.log(response.data)
          const { pseudo, id } = response.data;
          //console.log('pseudo', pseudo);
          //console.log('action history', action);
          //store.dispatch(syncPseudo({pseudo}))
          if (response.status == 200) {
            //console.log('action', action)
            store.dispatch({ type: SYNC_ISLOGGED, isLogged: true });
            store.dispatch(enterMove(action.history));
            //store.dispatch(syncPseudo({pseudo}))
            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id})
            //console.log('Authenticated');
            
          }
          else {
            console.error('impossible de se connecter', response);
          }
          //store.dispatch({ type: SYNC_PASSWORD, password: '' })

          // store.dispatch(enterMove(action.history));
          // console.log('Authenticated - email');
        }).catch((error) => {
          console.log('Error on Authentication', error);
        });

      return;
    }

    default: {
      next(action);
    }
  }
};
