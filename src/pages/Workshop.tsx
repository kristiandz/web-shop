import { faClock, faCalendarTimes } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getCategoryIcon } from "../components/CategoryRow";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from 'react-router-dom'
import CartContext from "../store/cart-context";
import styles from "./Workshop.module.css";
import Button from "../components/Button";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import WorkshopCard from "../components/WorkshopCard";

function Workshop() {

    // Get the argument from the URL, so we can fetch the specific workshop
    let { id } = useParams();
    const cartContext = useContext(CartContext);
    const defaultImage = "https://secure.meetupstatic.com/photos/event/2/d/8/e/highres_482651662.jpeg";

    const [workshop, setWorkshop] = useState<any>({});
    const [allWorkshops, setAllWorkshops] = useState<any[]>([]);
    const [speaker, setSpeaker] = useState<any>({});

    useEffect(() => {
        // GET all workshops and the specific one from the id and store it in the state
        const getWorkshop = async () => {
            const workshopFromServer = await fetchWorkshop(id);
            workshopFromServer.amount = 1;
            setWorkshop(workshopFromServer);
        };
        const getAllWorkshops = async () => {
            const workshopsFromServer = await fetchWorkshops();
            setAllWorkshops(workshopsFromServer);
        };
        getWorkshop();
        getAllWorkshops();
    }, [id])

    useEffect(() => {
        // Moving the fetch inside since we depend on the workshop
        const fetchSpeaker = async () => {
            try {
                const res = await fetch("https://web-shop-50827-default-rtdb.europe-west1.firebasedatabase.app/users/" + workshop?.userId + ".json");
                const data = await res.json();
                setSpeaker(data);
            }
            catch (error) { throw new Error("Cannot fetch user: " + id + " from the DB"); }
        }
        fetchSpeaker();
    }, [workshop, id])

    // Try fetching the data, await for it to arrive from the databse, handle the errors if any arise, does not include status errors.
    const fetchWorkshop = async (id: any) => {
        try {
            const res = await fetch("https://web-shop-50827-default-rtdb.europe-west1.firebasedatabase.app/workshops/" + (id - 1) + ".json");
            const data = res.json();
            return data;
        }
        catch (error) { throw new Error("Cannot fetch workshop: " + id + " from the DB"); }
    }
    const fetchWorkshops = async () => {
        try {
            const res = await fetch("https://web-shop-50827-default-rtdb.europe-west1.firebasedatabase.app/workshops.json");
            const data = res.json();
            return data;
        }
        catch (error) { throw new Error("Cannot fetch workshops from the DB"); }
    }

    const addToCart = () => {
        if (!cartContext.isInCart(workshop.id)) { // Is the workshop already in the cart ?
            cartContext.addToCart(workshop); // Add the workshop to the context state
        }
        if (!cartContext.cartActive) // Togle the cart if its not already open, and don't close it otherwise
            cartContext.toggleCart();
    }

    // Get the updated selection from the dropdown and update the workshop in the context state
    const handleChange = (e: any) => {
        let cartItem = workshop
        cartItem.amount = parseInt(e.target.value); // Just in case
        setWorkshop({ ...cartItem });
    };

    // Parse the date from db
    let data = new Date(workshop.date);
    let time = data.toLocaleString('en-GB', { timeZone: 'CET' });

    return (
        <div className={styles.workshopLayout}>
            <Navbar />
            <div className={styles.workshop}>
                <div className={styles.workshop__side}>
                    <div className={styles.workshop__return}>
                        <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="lg" /></Link><h4>Back</h4>
                    </div>
                </div>
                <div className={styles.workshop__main}>
                    <img className={styles.workshop__main__image} src={workshop.imageUrl ? workshop.imageUrl : defaultImage} alt="IMG" />
                    <div className={styles.workshop__main__content}>
                        <div className={styles.workshop__main__info}>
                            <div className={styles.workshop__main__header}>
                                <FontAwesomeIcon icon={getCategoryIcon(workshop.category)} className={styles.workshop__main__categoryIcon} size="2x" color="black" />
                                <FontAwesomeIcon icon={faCalendarTimes} size="1x" />
                                <span>{time.split(",")[0]}.</span>
                                <FontAwesomeIcon icon={faClock} size="1x" />
                                <span>{time.split(",")[1]?.substring(0, 6)}h</span>
                            </div>
                            <h1>{workshop.title}</h1>
                            <div className={styles.workshop__main__speaker}>
                                <span>WITH</span>
                                <h3>{speaker?.name}</h3>
                            </div>
                            <p>{workshop?.desc}</p>
                        </div>
                        <div className={styles.workshop__main__tickets__container}>
                            <div className={styles.workshop__main__tickets}>
                                <h3>Buy your ticket</h3>
                                <div className={styles.workshop__main__price}>
                                    <h3>{workshop.price},00</h3> <span>EUR</span>
                                </div>
                                <div className={styles.workshop__main__select}>
                                    <select aria-label="ticket" className={styles.workshop__main__dropdown} onChange={handleChange} >
                                        <option value={1}>1</option><option value={2}>2</option>
                                        <option value={3}>3</option><option value={4}>4</option>
                                        <option value={5}>5</option><option value={6}>6</option>
                                    </select>
                                    <div onClick={addToCart}><Button title="Add to Cart" width="12vw" /></div>
                                </div>
                                <span>Subtotal: {workshop?.price * workshop?.amount} EUR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.workshop__main__moreWorkshops}>
                <h1>Similar workshops</h1>
                <div className={styles.workshop__main__moreWorkshops__cards}>
                    {allWorkshops.filter((el) => el.category === workshop?.category).slice(0, 5)
                        .map((element) => { return (<WorkshopCard value={element} key={element.id} />) })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Workshop;