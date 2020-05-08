export const ENTER_MOVE = 'actions/ENTER_MOVE';
export const LOGIN = 'actions/LOGIN';
export const SYNC_PSEUDO = 'actions/SYNC_PSEUDO';
export const SYNC_EMAIL = 'actions/SYNC_EMAIL';
export const SYNC_PASSWORD = 'actions/SYNC_PASSWORD';
export const SYNC_PASSWORDVAL = 'actions/SYNC_PASSWORDVAL';

export const login = (history) => ({ type: LOGIN, history });

export const enterMove = (history) => ({ type: ENTER_MOVE, history });
