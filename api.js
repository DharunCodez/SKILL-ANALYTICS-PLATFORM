const API_URL = 'http://localhost:4000';

export function setToken(token) { localStorage.setItem('token', token); }
export function getToken() { return localStorage.getItem('token'); }
export function logout() { localStorage.removeItem('token'); }

async function request(path, options = {}) {
  const headers = options.headers || {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}

export async function register(payload) { return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }); }
export async function login(payload) { const data = await request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }); setToken(data.token); return data; }

export async function addSkill(payload) { return request('/skills', { method: 'POST', body: JSON.stringify(payload) }); }
export async function getSkills() { return request('/skills'); }
export async function updateSkill(id, payload) { return request(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); }
export async function deleteSkill(id) { return request(`/skills/${id}`, { method: 'DELETE' }); }
export async function getAnalytics() { return request('/analytics'); }
export async function getSuggestions(goal) { return request(`/analytics/suggestions${goal?`?goal=${encodeURIComponent(goal)}`:''}`); }
