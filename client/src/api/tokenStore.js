let token = null;


export function getToken() {
  return token;
}

export function setToken(next) {
  token = next;
}

export function clearToken() {
  token = null;
}
