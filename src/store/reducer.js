import {
  SYNC_PSEUDO,
  SYNC_EMAIL,
  SYNC_PASSWORD,
  SYNC_PASSWORDVAL,
} from './actions';

const initialState = {
  counter: 0,
  pseudo: '',
  email: '',
  password: '',
  passwordVal: '',

};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SYNC_PSEUDO: {
      return { ...state, pseudo: action.pseudo };
    }
    case SYNC_EMAIL: {
      return { ...state, email: action.email };
    }
    case SYNC_PASSWORD: {
      return { ...state, password: action.password };
    }
    case SYNC_PASSWORDVAL: {
      return { ...state, passwordVal: action.passwordVal };
    }
    case 'INCREMENT': {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    default: {
      return state;
    }
  }
};
