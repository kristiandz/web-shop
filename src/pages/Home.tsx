import { useState, useEffect, useContext } from "react";
import WorkshopCard from "../components/WorkshopCard";
import CategoryRow from "../components/CategoryRow";
import CartContext from "../store/cart-context";
import Spinner from "../components/Spinner";
import Checkout from "../layout/Checkout";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./Home.module.css";

function Home() {

    const cartContext = useContext(CartContext);
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setselectedCategories] = useState("All");
    // Display the first 9 workshops, later on load more and change the state
    const [wsRange, setWsRange] = useState<any>({ start: 0, end: 9 });

    useEffect(() => {
        // GET workshops and categories from the database and store it in the state
        const getWorkshops = async () => {
            const workshopsFromServer = await fetchWorkshops();
            setWorkshops(workshopsFromServer);
        };
        const getCategories = async () => {
            const categoriesFromServer = await fetchCategories();
            setCategories(categoriesFromServer);
        }
        getWorkshops();
        getCategories();
    }, [])

    // Try fetching the data, await for it to arrive from the databse, handle the errors if any arise, does not include status errors.
    const fetchWorkshops = async () => {
        try {
            const res = await fetch("http://localhost:3001/workshops")
            const data = res.json();
            return data;
        }
        catch (error) {
            throw new Error("Cannot fetch workshops from the DB");
        }
    }
    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:3001/categories");
            const data = res.json();
            return data;
        }
        catch (error) {
            throw new Error("Cannot fetch the categories from the DB");
        }
    }

    // Sort and slice the workshops that should be displayed by applying the filters
    function sortWorkshops() {
        return workshops.filter((el) => el.category === selectedCategory || selectedCategory === "All")
            .slice(wsRange.start, wsRange.end)
            .sort((a, b) => { return Date.parse(b.date) - Date.parse(a.date) });
    }

    const loadMore = () => {
        // Simply extending the range we will use for slice() to render more workshops
        let newRange = wsRange;
        newRange.end += 9;
        setWsRange({ ...newRange });
    }

    return (
        // Doing all the layout work here, didn't want to use a layout component with children components, since I started working
        // on the extended version of the assignment which includes two layouts, so it would bring unnesscary complexity.
        <div className={styles.home}>
            <Navbar />
            {/* Show the spinner if no workshops are loaded yet */}
            {!workshops[0] ? <Spinner /> : ""}
            {/* Depending on the context state we are showing the checkout screen here from main, for simple parent window sizing */}
            {cartContext.checkoutActive ? <Checkout /> : ""}
            {/* Main layout */}
            <div className={styles.home__main}>
                {/* Category sidebar */}
                <div className={styles.home__workshopSideMenu}>
                    <div className={styles.home__workshopSideMenu__fixed}>
                        <h5>Filter by category: </h5>
                        {/* "All" category is rendered with <CategoryRow/> if it doesnt contain props */}
                        <CategoryRow selection={setselectedCategories} />
                        {/* Don't display anything if the categories are not loaded. Using the index for the key for simplicity */}
                        {!categories[0] ? "" : categories.map((element, i) => { return (<CategoryRow selection={setselectedCategories} title={element} key={i} />) })}
                    </div>
                </div>
                {/* Workshops and information */}
                <div className={styles.home__workshopContainer}>
                    <div className={styles.home__header}>
                        <h2>Workshops</h2>
                        {/* Get the length of the filtered array, should store the length instead of calling the function again for better performance! */}
                        <span>Broj radionica: {sortWorkshops().length}</span>
                    </div>
                    <div className={styles.home__workshops}>
                        {/* Get the sorted array and then map it to render all workshop cards */}
                        {sortWorkshops().map((element) => { return (<WorkshopCard value={element} key={element.id} />) })}
                    </div>
                    {/* Load more workshops, wrapping it for finer css control */}
                    <div className={styles.home__loadMore}>
                        {workshops.length < wsRange.end ? "" : <span onClick={loadMore}>Load more</span>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;

