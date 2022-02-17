import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo-larger.png";
import arrow from "../assets/arrow-down.png";
import artwork from "../assets/artwork.png";
import Button from "../components/Button";
import styles from "./Login.module.css";
import eye from "../assets/eye.png";
import { useRef } from "react";

function Login(props: any) {

    const history = useNavigate();
    const passwordInputRef = useRef<any>(null);
    const nameInputRef = useRef<any>(null);

    const handleLogin = async (event: any) => {
        event.preventDefault();
        const name = nameInputRef.current?.value;
        const password = passwordInputRef.current?.value;

        const fetchWorkshops = async () => {
            try {
                const res = await fetch("http://localhost:3001/users/13")
                const data = res.json();
                return data;
            }
            catch (error) {
                throw new Error("Cannot fetch user from the DB");
            }
        }
        const data = await fetchWorkshops();

        if (data?.name === name && data?.password === password) {
            localStorage.setItem("username", data?.name);
            history("/");
            props.login(true);
        }
        else {
            alert("Incorrect login information!");
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__sideContainer}>
                <img src={logo} alt="Logo" />
                <img className={styles.login__artwork} src={artwork} alt="artwork" />
                <span>© TINEL Meetup 2022.</span>
            </div>
            <div className={styles.login__loginForm}>
                <h2>Sign in</h2>
                <span>Enter username: demoname and password: demopassword, or any other account from the DB</span>
                <h6>Enter your username</h6>
                <img className={styles.login__loginForm__icon} src={arrow} alt="arrow" />
                <input type="text" placeholder="Enter your username" ref={nameInputRef} />
                <h6>Enter your password (min. 8 characters)</h6>
                <img className={styles.login__loginForm__icon} src={eye} alt="eye" />
                <input type="password" placeholder="Enter your password" ref={passwordInputRef} />
                <Link to="#">Forgot your password? Click here.</Link>
                <div onClick={handleLogin}>
                    <Button title="Prijavi se" width="12vw" height="5vh" margin="1.4vh 0" />
                </div>
                <Link to="#">Don't have an user account yet? Click here.</Link>
            </div>
        </div>
    );
}

export default Login;