import axios from 'axios';

import { LOGIN, toSignin, SIGNUP, TO_SIGNIN, SYNC_PSEUDO, SYNC_PASSWORD, SYNC_ISLOGGED, SYNC_USER_ID, enterMove,SYNC_MOVES } from 'src/store/actions';

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
        .then((res) => {
          console.log("res.data",res.data)
          const { pseudo, id, moves} = res.data;
          //console.log('pseudo', pseudo);
          //console.log('action history', action);
          if (res.status == 200) {
            //console.log('action', action)
            store.dispatch({ type: SYNC_ISLOGGED, isLogged: true });
            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id});
            store.dispatch({ type: SYNC_MOVES, moves});
            store.dispatch(enterMove(action.history));
            //console.log('Authenticated');
            
          }
          else {
            console.error('impossible de se connecter', res);
          }
          
        }).catch((error) => {
          console.log('Error on Authentication', error);
        });

      return;
    };
    case SIGNUP: {
      axios
        .post(`http://localhost:5050/signup`, { 
          email: store.getState().email,
          password: store.getState().password,
          pseudo: store.getState().pseudo
        })
        .then(res => {
          const { pseudo, id, moves} = res.data;
          console.log("status :", res.status)
          if (res.status == 201) {
            // dispatch(login(history));
            
            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id});
            store.dispatch({ type: SYNC_MOVES, moves});
            store.dispatch(toSignin(action.history));
          }
          else {
            console.error('impossible de se connecter', res);
          }
          
        }).catch((error) => {
          console.log('Error on Authentication', error);
        });

      return;
      };
    default: {
      next(action);
    }
  }
};
        
        
