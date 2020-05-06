import { ENTER_MOVE } from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case ENTER_MOVE: {
      action.history.push('/move');
      break;
    }
    default: {
      // Si le middleware n'est pas intéressé par l'action reçue,
      // alors il laisse filer l'action vers la suite de son voyage.
      next(action);
    }
  }
};


// Structure de la définition d'un middleware pour Redux :
// function (store) {
//   return function(next) {
//     return function(action) {
//       // switch blabla
//     }
//   }
// }
