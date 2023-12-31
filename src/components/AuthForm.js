import {
  Form,
  useSearchParams,
  Link,
  useActionData,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const navigation = useNavigation();
  const message = useLoaderData();
  const invalidationData = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      {message && <h3 style={{ color: "red" }}>{message}</h3>}
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {invalidationData && invalidationData.errors && (
          <ul>
            {Object.values(invalidationData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {invalidationData && invalidationData.message && (
          <p>{invalidationData.message}</p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`/auth?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
