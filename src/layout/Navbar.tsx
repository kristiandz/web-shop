import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CartContext from "../store/cart-context";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import Cart from "./Cart";

function Navbar() {

    const cartContext = useContext(CartContext);

    // Change the style based on the state of the cart, using this for a simple css animation
    let style;
    !cartContext.cartActive ? style = styles.navbar__items__cart : style = styles.navbar__items__cart__inactive;

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__logo}>
                {/* Return home by clicking on the link */}
                <Link to="/"><img src={logo} alt="Logo" /></Link>
            </div>
            <div className={styles.navbar__items}>
                <div className={styles.navbar__items__user}>
                    <FontAwesomeIcon icon={faUser} size="1x" />
                    <span>User</span>
                </div>
                <div onClick={cartContext.toggleCart} className={style}>
                    <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                    {/* Display the cart status circle if the cart is not empty */}
                    <span className={cartContext.cartLength !== 0 ? styles.navbar__items__cart__status : ""}></span>
                    {/* Logic to render the correct content on navbar */}
                    {/* Display nothing if the cart is empty otherwise display the length */}
                    <span>{cartContext.cartLength === 0 ? "" : cartContext.cartLength}</span>
                    {/* If the cart is not empty display either "workshops" if the length > 1, else "workshop" */}
                    {cartContext.cartLength === 0 ? <span>Cart is empty</span> :
                        <span>{cartContext.cartLength !== 1 ? "Workshops in Cart" : "Workshop in Cart"} </span>
                    }
                </div>
            </div>
            {/* Render the cart from here, based on the state in context */}
            <Cart />
        </div>
    );
}

export default Navbar;