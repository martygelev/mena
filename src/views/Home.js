import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faUser, faKey, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./../css/Home.css";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Home() {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checked: false,
  });

  const [data, setData] = useState([]);
  const changeCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const addUser = () => {
    if (
      credentials.email !== "" &&
      credentials.password !== "" &&
      credentials.firstName !== "" &&
      credentials.lastName !== ""
    ) {
      if (credentials.checked) {
        if (EMAIL_REGEX.test(credentials.email)) {
          if (PASSWORD_REGEX.test(credentials.password)) {
            document.getElementById("error").innerText = "";
            document.getElementById("checkbox").checked = false;
            setData([
              ...data,
              {
                ...credentials,
                date: new Date().toLocaleString(),
              },
            ]);
            setCredentials({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              checked: false,
            });
          } else {
            document.getElementById("error").innerText =
              "Password should contain at least 8 symbols, at least one upper case, at least one lower case, at least one digit and at least one special symbol.";
          }
        } else {
          document.getElementById("error").innerText = "Fill Correct Email";
        }
      } else {
        document.getElementById("error").innerText =
          "Agree to the terms and conditions.";
      }
    } else {
      document.getElementById("error").innerText = "Fill All Fields";
    }
  };
  return (
    <div className="__Home">
      <div className="form">
        <h2>Sign Up</h2>
        <div className="form-div">
          <img src="gmail-logo.png" className="overlay" alt="overlay" />
        </div>
        <div className="fields">
          <div className="row">
          <div className="col">
              <input
                name="firstName"
                id="firstName"
                type="text"
                value={credentials.firstName}
                title={
                  credentials.firstName === ""
                    ? "Please enter first name!"
                    : ""
                }
                onChange={changeCredentials}
                placeholder="First Name"
                required
              />
              <label htmlFor="firstName">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </label>
            </div>
            <div className="col">
              <input
                name="lastName"
                id="lastName"
                type="text"
                value={credentials.lastName}
                title={
                  credentials.lastName === ""
                    ? "Please enter last name!"
                    : ""
                }
                onChange={changeCredentials}
                placeholder="Last Name"
                required
              />
              <label htmlFor="lastName">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                name="email"
                id="email"
                type="email"
                value={credentials.email}
                title={
                  credentials.email === ""
                    ? "Please enter email!" : ""
                }
                onChange={changeCredentials}
                placeholder="Email"
                required
              />
              <label htmlFor="email">
                <FontAwesomeIcon icon={faAt} className="icon" />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                name="password"
                id="password"
                type="password"
                value={credentials.password}
                title={
                  credentials.password === ""
                    ? "Please enter password!"
                    : ""
                }
                onChange={changeCredentials}
                placeholder="Password"
                required
              />
              <label htmlFor="password">
                <FontAwesomeIcon icon={faKey} className="icon" />
              </label>
            </div>
          </div>
          <div className="row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="checkbox"
                defaultChecked={credentials.checked}
                className="checkbox-input"
                required
                onChange={() => {
                  changeCredentials({
                    target: {
                      name: "checked",
                      value: !credentials.checked,
                    },
                  });
                }}
              />
              <span className="checkmark" />
              <FontAwesomeIcon icon={faCheck} className="icon" />
              <p>I agree with terms and conditions</p>
            </label>
          </div>
        </div>
        <div className="button-div">
          <button className="button" onClick={addUser}>
            Sign Up
          </button>
        </div>
        <span className="tagline" id="error"></span>
        <span className="tagline">Sponsored by</span>
        <div className="cards">
          <div className="col">
            <img src="google-logo.png" alt="google-logo.png" />
          </div>
          <div className="col">
            <img src="google-drive-logo.png" alt="drive-logo.png" />
          </div>
          <div className="col">
            <img src="gmail-logo.png" alt="gmail-logo.png" />
          </div>
        </div>
        <div className="tagline">
          Already have an account? <a href="/#">Sign In</a>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
