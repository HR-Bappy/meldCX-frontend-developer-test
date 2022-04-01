import React, { useEffect, useState } from "react";
import { onSubmitLogin } from "../helpers/API/Auth";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";

export default function SignInUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {}, []);

  const submitLoginForm = () => {
    let values = {
      email: email,
      password: password,
    };

    // login form submitting
    if (values.email && values.password) {
      onSubmitLogin(values)
        .then((res) => {
          if (res.status === 200) {
            notification("success", "Login Successfully. Redirecting... ");
            setTimeout(() => {
              window.location.href = "/device";
            }, 1500);
          } else {
            notification("fail", res.message);
          }
        })
        .catch((err) => {
          if (err.response.status === 401)
            notification("fail", err.response.data);
        });
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>

      <section id="sign-in-up">
        <div className="content">
          <div className="form ptb-100">
            <h1>Login</h1>
            <form>
              <div class="input-field">
                <svg viewBox="0 0 512 512">
                  <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="input-field">
                <svg viewBox="0 0 512 512">
                  <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <button
                className="signin-btn"
                type="button"
                onClick={submitLoginForm}
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
