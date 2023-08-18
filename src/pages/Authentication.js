import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export function loader({ request }) {
  console.log("running in parallel");
  const searchParams = new URL(request.url).searchParams;
  const message = searchParams.get("message");
  return message;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // We will use this response to show some UI element indicating 401 invalid credentials error
  // or 422 for invalid input fields which can either be email or password.
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  // Now we have successfully extracted auth token from response and we will need this
  // authentication token to make future requests to our protected routes as those endpoints
  // do expect this auth token to process the request.

  // Question arises where do we store this token so that we can use it later to make requests?
  // Let's chose what's easy for now let's store this inside localStorage.
  const authorizationToken = resData.token;
  localStorage.setItem("token", authorizationToken);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
