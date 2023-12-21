import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import UserService from "../Services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setLocalStorageUser } from "../Utils/localStorageUtils";
import { loginUserAsync } from "../Redux/Actions/userActions";
import { useDispatch } from "react-redux";

/**
 * Register Component - Allows users to register for an account.
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.onRegister - Callback function for successful registration
 * @param {Function} props.onLogin - Callback function for successful login
 * @returns {JSX.Element} Register component
 */
const Register = ({ onRegister, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();

    /**
   * Handles the registration process when the "Register" button is clicked.
   * @function
   * @async
   * @returns {void}
   */
  const handleRegister = async () => {
    if (username !== "" && password !== "") {
      const user = {
        name: username,
        password,
        bio: "A Mathminds player",
        wins: 0,
        losses: 0,
        isAdmin: 0,
      };

      try {
        const response = await UserService.registerUser({ user });

        if (response.status === 201) {
          setRegistrationSuccess(true); // Set registration success to true
          loginUserAsync(user, onLogin, navigate); // Call loginUserAsync directly
          toast.success("Registration successful", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.success("Registration successful. Log in to view the full site.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Registration failed", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };
  
  const isRegisterDisabled = username === "" || password === "";
  
  return (
    <>
      <div className="central-container">
        <h2>Register</h2>
        <hr style={{ color: "#333", borderStyle: "dotted" }} />
        <div>
          <FiUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <hr style={{ color: "#333", borderStyle: "dotted" }} />
        <div>
          <FiLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <hr style={{ color: "#333", borderStyle: "dotted" }} />
        {registrationSuccess ? ( // Display success message conditionally
          <div>Registration successful!</div>
        ) : (
          <Link to="/login" className={`btn ${isRegisterDisabled ? "disabled" : ""}`} onClick={handleRegister} disabled={isRegisterDisabled}>
            Register
          </Link>
        )}
        <br />
        <br />
        <div style={{ fontSize: "14px" }}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#098765" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
