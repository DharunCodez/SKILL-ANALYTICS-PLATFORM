import { getToken } from '../services/api';

export function isLogged() { return !!getToken(); }
