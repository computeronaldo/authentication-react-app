export default function getAuthorizationToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthorizationToken();
}
