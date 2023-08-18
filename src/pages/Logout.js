import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
};

export const loader = () => {
  console.log("running in parallel");
  return null;
};
