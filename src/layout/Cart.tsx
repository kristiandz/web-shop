import { faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartContext from "../store/cart-context";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import styles from "./Cart.module.css";
import { useContext } from "react";

function Cart() {

    const cartContext = useContext(CartContext);

    // className based on the state from context, changing the className to retain simple animation via css
    let styleClass;
    cartContext.cartActive === true ? styleClass = styles.cart__active : styleClass = styles.cart;

    // Caculate the total price we need to checkout
    let total = 0;
    cartContext.cartItems.forEach((element: any) => {
        total += element.amount * element.price;
    });

    return (
        // Prop based className from above, to achieve animation
        <div className={styleClass}>
            <div className={styles.cart__header}>
                <div className={styles.cart__header__title}>
                    {/* Display the cart status circle if the cart is not empty */}
                    <span className={cartContext.cartLength !== 0 ? styles.cart__header__status : ""}></span>
                    <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                    <h5>{cartContext.cartLength} {cartContext.cartLength !== 1 ? "Workshops" : "Workshop"}</h5>
                </div>
                {/* Close the cart by clicking on the "times" button and calling the context toggleCart !state change */}
                <FontAwesomeIcon icon={faTimes} size="sm" color="var(--darker-grey)" onClick={cartContext.toggleCart} className={styles.cart__header__exit} />
            </div>
            {/* Render every cart item from the context state and pass in the props to display it further */}
            <div className={styles.cart__container}>
                {cartContext.cartItems.map((element: any) => { return (<CartItem data={element} key={element.id} />) })}
            </div>
            {/* Hardcoding the currency here, since we don't have a value to fetch from database */}
            <div className={styles.cart__checkout}>
                <h6>SUBTOTAL</h6>
                <div>
                    <h4>{total}</h4>
                    <h5>EUR</h5>
                </div>
                {/* Wrapping the Button component inside a div so we can use onClick and open the checkout by calling the toggle from context */}
                <div onClick={cartContext.toggleCheckout}>
                    <Button
                        className={styles.cart__checkout__button}
                        margin="0" title="Checkout"
                        width="100%" height="50px"
                        background="var(--blue)"
                        color="var(--white)"
                    />
                </div>
            </div>
        </div>
    );
}

export default Cart;