import {
  SYNC_PSEUDO,
  SYNC_EMAIL,
  SYNC_PASSWORD,
  SYNC_PASSWORDVAL,
  SYNC_LABEL_BOX, 
  SYNC_LABEL_MOVE,
  SYNC_DESTINATION_ROOM,
  SYNC_FRAGILE,
  SYNC_HEAVY,
  SYNC_FLOOR,
  SYNC_DATE,
  SYNC_ADDRESS,
  SYNC_NAME_INVENTORY,
  SYNC_NAME_ITEM,
  SYNC_MOVE_ID,
  SYNC_USER_ID,
  SYNC_CODE,
} from './actions';

const initialState = {
  counter: 0,
  pseudo: '',
  email: 'carole@gmail.com',
  password: 'Azerty83*',
  passwordVal: '',
  move_id: '5',
  labelBox: '',
  labelMove: '',
  destination_room: '',
  fragile: '',
  heavy: '',
  floor: '',
  date: '',
  address: '',
  nameInventory: '',
  nameItem: '',
  user_id: '3',
  code: '0000000C',
  isLogged: false
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SYNC_PSEUDO: {
      return { ...state, pseudo: action.pseudo }; // ...state, pseudo: action.history.pseudo
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
    case SYNC_LABEL_BOX: {
      return { ...state, labelBox: action.labelBox };
    }
    case SYNC_LABEL_MOVE: {
      return { ...state, labelMove: action.labelMove };
    }
    case SYNC_DESTINATION_ROOM: {
      return { ...state, destination_room: action.destination_room };
    }
    case SYNC_FRAGILE: {
      return { ...state, fragile: action.fragile };
    }
    case SYNC_HEAVY: {
      return { ...state, heavy: action.heavy };
    }
    case SYNC_FLOOR: {
      return { ...state, floor: action.floor };
    }
    case SYNC_DATE: {
      return { ...state, date: action.date };
    }
    case SYNC_ADDRESS: {
      return { ...state, address: action.address };
    }
    case SYNC_NAME_INVENTORY: {
      return { ...state, nameInventory: action.nameInventory };
    }
    case SYNC_NAME_ITEM: {
      return { ...state, nameItem: action.nameItem };
    }
    case SYNC_MOVE_ID: {
      return { ...state, move_id: action.move_id };
    }
    case SYNC_USER_ID: {
      return { ...state, user_id: action.user_id };
    }
    case SYNC_CODE: {
      return { ...state, code: action.code };
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
