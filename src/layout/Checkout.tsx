import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../store/cart-context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import Button from '../components/Button';

interface IWorkshops {
    id: number,
    title: string,
    desc: string,
    price: number,
    date: string,
    category: string,
    userId: number,
    imageUrl: string,
    amount: number
}

function Checkout() {

    const history = useNavigate();
    const cartContext = useContext(CartContext);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState<boolean>(false);

    // Checkbox toggle
    const handleToggle = () => {
        setIsChecked(!isChecked);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent default browser submit
        event.preventDefault();

        // Checkbox toggled ? 
        if (!isChecked)
            return;

        // Caculate the total price we need to checkout
        let price = 0;
        cartContext.cartItems.forEach((element: IWorkshops) => {
            price += element.amount * element.price;
        });
        // Set time and date for orders preview
        let time = new Date().toLocaleString('en-GB', { timeZone: 'CET' }).split(",")[1].substring(0, 6);
        let date = new Date().toISOString().slice(0, 10);

        // Making the object to POST into the databse
        let checkout:{} = { products: cartContext.cartItems, total: price, time: time, date: date };
        // Posting the object to the database, if there are no errors, show the success screen
        await fetch("https://web-shop-50827-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(checkout)
        })
            .then(() => setIsCheckoutSuccessful(true))
            .catch((error) => console.log(error.message));
    }

    // Finish the checkout by clicking on the return home button, push the history back to workshops/home,
    // close the checkout screen, clear the cart and close it as well
    const returnHome = () => {
        history("/");
        cartContext.toggleCheckout();
        cartContext.toggleCart();
        cartContext.clearCart();
        window.scrollTo(0, 0);
    }

    if (!isCheckoutSuccessful) {
        return (
            <div className={styles.checkoutScreen}>
                <div className={styles.checkout}>
                    <div className={styles.checkout__container}>
                        <div className={styles.checkout__header}>
                            <h2>Checkout</h2>
                            <FontAwesomeIcon onClick={cartContext.toggleCheckout} icon={faTimes} size="lg" />
                        </div>
                        <h6>Please fill in the form to complete the checkout and purchase your tickets</h6>
                        <form action="" onSubmit={onSubmit} autoComplete="off" className={styles.checkout__form}>
                            <div className={styles.checkout__control}>
                                <label htmlFor="name">First Name</label>
                                <input type="text" required id="name" placeholder="Type your first name here" />
                            </div>
                            <div className={styles.checkout__control}>
                                <label htmlFor="surname">Last Name</label>
                                <input type="text" required id="surname" placeholder="Type your last name here" />
                            </div>
                            <div className={styles.checkout__control}>
                                <label htmlFor="email">Email Address</label>
                                <input type="mail" required id="email" placeholder="Type your email address here" />
                            </div>
                            <div className={styles.checkout__multiColumn}>
                                <div className={styles.checkout__control}>
                                    <label htmlFor="date">Date of Birth</label>
                                    <input type="date" required id="date" />
                                </div>
                                <div className={styles.checkout__control}>
                                    <label htmlFor="gender">Gender</label>
                                    <select required id="gender" className={styles.cartItem__dropdown} >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.checkout__control}>
                                <label htmlFor="address">Address</label>
                                <input type="text" required id="address" placeholder="Type your adress here" />
                            </div>
                            <div className={styles.checkout__control}>
                                <label htmlFor="zip">Zip Code</label>
                                <input type="text" required id="zip" placeholder="e.g. 21312" />
                            </div>
                            <div className={styles.checkout__checkbox}>
                                {!isChecked ?
                                    <FontAwesomeIcon className={styles.checkout__checkbox__icon} onClick={handleToggle} icon={faSquare} size="2x" color="white" /> :
                                    <FontAwesomeIcon className={styles.checkout__checkbox__icon} onClick={handleToggle} icon={faCheckSquare} size="2x" color="white" />
                                }
                                <span>I agree</span>
                                <span className={styles.checkout__checkbox__bg}></span>
                            </div>
                            {/* Using default button for  */}
                            <button type="submit">Checkout</button>
                        </form>
                    </div>
                </div >
            </div >
        );
    }
    else {
        return (
            <div className={styles.checkoutScreen}>
                <div className={styles.checkout}>
                    <div className={styles.checkout__container__success}>
                        <h2>Thank you</h2>
                        <span>Esse cillum incididunt qui do ea et sunt proident ut et qui nulla enim. Ad excepteur in amet adipisicing sint.</span>
                        <div className={styles.checkout__button__container} onClick={returnHome}>
                            <Button title="Back to shop" width="90%" margin="0" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;