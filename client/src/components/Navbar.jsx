import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return(
      <div className={styles.main}>
        <h1>Jobfinder</h1>
        <div className={styles.actionBtns}>
            <button className={styles.login}>Login</button>
            <button className={styles.register}>Register</button>
        </div>
      </div>
  )
};

export default Navbar;
