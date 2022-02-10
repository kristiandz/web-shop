import { Link } from "react-router-dom";
import Button from "../components/Button";
import styles from "./ErrorPage.module.css";
import logo from "../assets/logo.png";
import artwork from "../assets/artwork.png";

// Return the user back towards correct routing
// TODO: Use history to return to previous page, not only home

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