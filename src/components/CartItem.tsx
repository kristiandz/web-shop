import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import CartContext from "../store/cart-context";
import styles from "./CartItem.module.css";
import { useContext } from "react";

function CartItem(props: any) {

    const cartContext = useContext(CartContext);
    const defaultImage = "https://secure.meetupstatic.com/photos/event/2/d/8/e/highres_482651662.jpeg";

    // Get the updated selection from the dropdown and update the workshop in the context state
    const handleChange = (e: any) => {
        let cartItem = props?.data
        cartItem.amount = e.target.value;
        cartContext.updateWorkshop(cartItem);
    };

    // Remove the items from the cart based on the current id for each component by comparing it to the context workshop id
    const removeFromCart = () => {
        cartContext.removeFromCart(props?.data.id);
    }

    return (
        <div className={styles.cartItem}>
            <div className={styles.cartItem__imageContainer}>
                {/* If the imageUrl is not defined, render the provided default image */}
                <img className={styles.workshopCard__image} src={props.data.imageUrl ? props?.data.imageUrl : defaultImage} alt="IMG" />
            </div>
            <div className={styles.cartItem__infoContainer}>
                <div>
                    <h4>{props?.data.title}</h4>
                </div>
                <div>
                    {/* Select the amount of tickets we want to buy for each workshop */}
                    <select value={props?.data.amount} className={styles.cartItem__dropdown} onChange={handleChange} >
                        <option value={1}>1</option><option value={2}>2</option>
                        <option value={3}>3</option><option value={4}>4</option>
                        <option value={5}>5</option><option value={6}>6</option>
                    </select>
                    <h5>{props?.data.price}</h5>
                    {/* Hardcoding the currency since we don't have a default value from a database */}
                    <span> EUR</span>
                </div>
            </div>
            <div className={styles.cartItem__removeItem} >
                <FontAwesomeIcon icon={faTrashAlt} size="sm" className={styles.cartItem__removeItem__icon} onClick={removeFromCart} />
            </div>
        </div>
    );
}

export default CartItem;