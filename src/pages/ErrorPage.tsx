import styles from "./ErrorPage.module.css";
import artwork from "../assets/artwork.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// Return user home if the routing is not found

function ErrorPage() {
    return (
        <>
            <div className={styles.errorPage}>
                <Link to="/"><img src={logo} alt="Logo" /></Link>
                <h1>404 Not Found</h1>
                <Link to="/"><Button title="Return Back" width="15vw" /></Link>
            </div>
            <img className={styles.errorPage__artwork} src={artwork} alt="art" />
        </>
    );
}

export default ErrorPage;