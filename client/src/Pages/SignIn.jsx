import React, { useEffect, useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import UserService from "../Services/UserService";
import { toast } from "react-toastify";
import { setLocalStorageUser } from "../Utils/localStorageUtils";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync } from "../Redux/Actions/userActions";
import { useDispatch } from "react-redux";

/**
 * Login Component - Allows users to log in to their accounts.
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.onLogin - Callback function for successful login
 * @returns {JSX.Element} Login component
 */
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Get the dispatch function
  const dispatch = useDispatch();

  /**
   * Handles the login process when the "Login" button is clicked.
   * @function
   * @async
   * @returns {void}
   */
  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const user = {
        username: username,
        password: password,
      };
      console.log("Logging in with:", username, password);

      try {
        const result = await UserService.authenticate({ user });
        console.log("Authentication Response:", result);

        if (result?.data?.message === "Successful") {
          let authenticatedUser = result?.data?.user;
          authenticatedUser.token = result?.data?.token;

          console.log("User Data:", authenticatedUser);

          // Dispatch the loginUserAsync action
          dispatch(loginUserAsync(user));

          // Now, you can proceed with your other logic
          setLocalStorageUser(authenticatedUser);
          onLogin();
          navigate("/");
        } else {
          // console.error("Authentication failed:", result?.data?.message);
          toast.error(result?.data?.message || "Login failed", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_LEFT,
          });
          reset();
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_LEFT,
        });
        reset();
      }
    }
  };
      /**
   * Resets the username and password fields.
   * @function
   * @returns {void}
   */
    const reset = () => {
        setUsername("");
        setPassword("");
    }

    return(
        <>
      <div className="central-container">
        <h2>Login</h2>
        <hr style={{ color: "#333", borderStyle: "dotted" }} />
        <div>
          <FiUser className="input-icon" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <hr style={{ color: "#333", borderStyle: "dotted" }} />
        <div>
          <FiLock className="input-icon" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <hr style={{ color: "#333", borderStyle: "dotted" }} />
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <br />
        <br />
        <div style={{ fontSize: "14px" }}>
          <p>Have no account yet? <Link to="/register" style={{ color: "#098765" }}>Create account</Link></p>
        </div>
      </div>
        </>
    )
}

export default Login;