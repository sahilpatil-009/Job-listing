import React from "react";
import styles from "../styles/dashboard.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const Dashboard = () => {
  return (
    <div className={styles.main}>
      <div className={styles.ControlBox}>
        <div className={styles.search}>
          <HiOutlineMagnifyingGlass size={25} style={{ color: "#9C9C9C" }} />
          <input type="text" placeholder="Type Any Job Title" />
        </div>
        <div className={styles.filter}>
          <select className={styles.skillsOptns}>
            <option value="">Skills</option>
            <option value="JavaScript">JavaSCript</option>
            <option value="html">Html</option>
          </select>
          <div>
            <button>Apply Filter</button>
            <button>clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
