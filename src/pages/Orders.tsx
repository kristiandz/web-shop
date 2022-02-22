import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataRow from "../components/DataRow";
import styles from "./Orders.module.css";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";

interface IOrders {
    products: [],
    total: number,
    time: string,
    date: string
}

function Orders() {

    const [orders, setOrders] = useState<IOrders[]>([]);

    useEffect(() => {
        // GET workshops and categories from the database and store it in the state
        const getWorkshops = async () => {
            const ordersFromServer = await fetchOrders();
            let array:IOrders[] = [];
            Object.keys(ordersFromServer).forEach(function (key: string) {
                array.push(ordersFromServer[key]);
            });
            setOrders(array);
        };
        getWorkshops();;
    }, [])

    // Try to get the data from the database, catch errors
    const fetchOrders = async () => {
        try {
            const res = await fetch("https://web-shop-50827-default-rtdb.europe-west1.firebasedatabase.app/orders.json")
            const data = res.json();
            return data;
        }
        catch (error) {
            throw new Error("Cannot fetch orders from the DB");
        }
    }

    // Work in progress, this was not in this "sprint's" backlog
    return (
        // Currently only rendering id and amount from the orders in database, since we need to setup it differently from the given task
        // For now it serves to simply see the basic updates to the DB such as ID and Total price.
        <div className={styles.orders}>
            <Sidebar />
            <div className={styles.orders__container}>
                <div className={styles.orders__header}>
                    <div className={styles.orders__return}>
                        {/* Return home by clicking on the arrow icon */}
                        <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="lg" /></Link>
                        <h4>Back</h4>
                    </div>
                    <h1>My orders</h1>
                </div>
                <div className={styles.orders__desc}>
                    <span>NUMBER</span>
                    <span>DATE</span>
                    <span>TIME</span>
                    <span>PRICE</span>
                    <span>ACTIONS</span>
                </div>
                {!orders[0] ? <h5>No orders yet...</h5> :
                    <>
                        {orders.map((element: IOrders, i: number) => { return (<DataRow value={element} id={i} key={i} />) })}
                    </>
                }
            </div>
        </div>
    );
}

export default Orders;