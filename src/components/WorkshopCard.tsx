import { faClock, faCalendarTimes } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartContext from "../store/cart-context";
import { getCategoryIcon } from "./CategoryRow";
import styles from "./WorkshopCard.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Button from "./Button";

function WorkshopCard(props: any) {

    const cartContext = useContext(CartContext);
    const history = useNavigate();
    const defaultImage = "https://secure.meetupstatic.com/photos/event/2/d/8/e/highres_482651662.jpeg";

    const addToCart = () => {
        if (!cartContext.isInCart(props?.value.id)) { // Is the workshop already in the cart ?
            let workshop = props?.value; // Assign the workshop prop to new var
            workshop.amount = 1; // Add a quantity property so we can easily calculate the total price later on
            cartContext.addToCart(workshop); // Add the workshop to the context state
        }
        if (!cartContext.cartActive)
            cartContext.toggleCart();
    }

    // Open the detailed page for each workshop, using id to easily fetch the right workshop from the URL later on
    const openWorkshopDetails = () => {
        history("/workshop/" + props?.value.id)
    }

    // Parse the date from db
    let data = new Date(props?.value.date);
    let time = data.toLocaleString('en-GB', { timeZone: 'CET' });

    return (
        <div className={styles.workshopCard}>
            {/* Use the default image in case we don't have a value from passed props */}
            <div className={styles.workshopCard__startContainer}>
                <img onClick={openWorkshopDetails} className={styles.workshopCard__image} src={props.value.imageUrl ? props.value.imageUrl : defaultImage} alt="IMG" />
                {/* Get the icon from CategoryRow.tsx to reduce component size */}
                <div className={styles.workshopCard__categoryIcon}>
                    <FontAwesomeIcon icon={getCategoryIcon(props?.value.category)} size="sm" color="white" />
                </div>
            </div>
            <div className={styles.workshopCard__infoContainer}>
                <div className={styles.workshopCard__time}>
                    <FontAwesomeIcon icon={faCalendarTimes} />
                    <span>{time.split(",")[0]}.</span>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{time.split(",")[1].substring(0, 6)}h</span>
                </div>
                <h3 onClick={openWorkshopDetails} >{props?.value.title}</h3>
                {/* Hardcoding the currency here, since we don't have a value to fetch from database */}
                <div className={styles.workshopCard__price}>
                    <h2>{props?.value.price}</h2> <span>EUR</span>
                </div>
            </div>
            {/* Wrapping the button in a div so we can use the onClick callback, we are adding the workshop to the cart here by passing the data to the context state */}
            <div onClick={addToCart}>
                <Button title="Add to Cart" width="14vw" margin="2vh" />
            </div>
        </div>
    );
}

export default WorkshopCard;