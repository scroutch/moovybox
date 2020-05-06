import {
  SYNC_NICKNAME,
  SYNC_EMAIL,
  SYNC_PASSWORD,
} from './actions';

const initialState = {
  counter: 0,
  nickname: '',
  users: [
    {
      nickname: 'nirrep',
      email: 'nirrep@gmail.com',
    },
  ],
  email: '',
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SYNC_NICKNAME: {
      return { ...state, nickname: action.nickname };
    }
    case SYNC_EMAIL: {
      return { ...state, email: action.email };
    }
    case SYNC_PASSWORD: {
      return { ...state, password: action.password };
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
