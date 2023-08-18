import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");

  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export default function getAuthorizationToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getTokenDuration();

  if (duration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthorizationToken();
}

export function checkAuthorizationLoader() {
  const token = getAuthorizationToken();

  if (!token) {
    throw redirect("/auth?message=You must login first!!!");
  }

  return null;
}
