import styles from "./Sidebar.module.css";
import logo from "../assets/logo-larger.png";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <img src={logo} alt="Logo" />
            <span>© TINEL Meetup 2022.</span>
        </div>
    );
}

export default Sidebar;