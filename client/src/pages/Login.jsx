import React, { useState } from "react";
import styles from "../styles/login.module.css";
import loginImg from "../assets/login.png";
import { useNavigate } from "react-router";
import { userLogin } from "../services/userApi";

const login = () => {

  const [loginData, setLoginData] = useState({
    email:"",
    password:""
  })

  const [emailRquire, setEmailRequire] = useState(false);
  const [passwordRquire, setPasswordRequire] = useState(false);

  const navigate = useNavigate();

  const handleloginbutton = async (e) => {
    console.log("clicked");
    e.preventDefault();
    if (!loginData.email) setEmailRequire(true);
    if (!loginData.password) setPasswordRequire(true);
    if (loginData.email && loginData.password) {
      try {
        const res = await userLogin(loginData);
        console.log(res)
        if(res.status === 200){
          console.log(res)
          console.log(res.token);
          localStorage.setItem('token', res.token)
          alert("logged in succesfully")
          navigate('/register');
        }else{
          console.log("token in missing");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // setUserEmail("");
    // setUserPassword("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <form className={styles.formData}>
          <div className={styles.headtitle}>
            <h1>Already have an account ?</h1>
            <p>Your personal job finder is here</p>
          </div>
          <div className={styles.userInput}>
            <input
              type="Email"
              placeholder="Email"
              name="email"
              required
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})}
            />
            <p
              style={{ visibility: emailRquire ? "visible" : "hidden" }}
              className={styles.worningMsg}
            >
              Field is Required
            </p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, [e.target.name] : e.target.value})}
            />
            <p
              style={{ visibility: passwordRquire ? "visible" : "hidden" }}
              className={styles.worningMsg}
            >
              Field is Required
            </p>
          </div>
          <div className={styles.formBottom}>
            <button className={styles.submitBtn} onClick={handleloginbutton}>
              Sign in
            </button>
            <p>
              Don't have an account?{" "}
              <a onClick={() => navigate("/register")}>Sign Up</a>{" "}
            </p>
          </div>
        </form>
      </div>
      <div className={styles.cover}>
        <div className={styles.imageSection}>
          <h1>Your Personal Job Finder</h1>
          <img src={loginImg} alt="cover image" />
        </div>
      </div>
    </div>
  );
};

export default login;
