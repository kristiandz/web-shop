import styles from "./DataRow.module.css";
import { Link } from "react-router-dom";
import Button from "./Button";

interface IOrderInterface {
    date: string,
    time: string,
    total: number
}
// Data row for the extended assignment used for order previews etc.

function DataRow(props: { id: number, value: IOrderInterface }) {

    let color = "var(--lighter-grey)";
    props?.id % 2 ? color = "var(--white)" : color = "var(--lighter-grey)";

    return (
        // Passing the color here to achieve the alternating row color effect, default is set, override if the prop is defined
        <div className={styles.dataRow} style={{ background: color }}>
            <div className={styles.dataRow__content}>
                {window.innerWidth < 900 ?
                    <div className={styles.dataRow__compact}>
                        <span>{props?.value.date}</span>
                        <span className={styles.dataRow__compact__id}>nr.0000000{props?.id}</span>
                    </div>
                    :
                    <>
                        <span>0000000{props?.id}</span>
                        <span>{props?.value.date}</span>
                    </>
                }
                {window.innerWidth > 900 ? <span>{props?.value.time} sati</span> : ""}
                <span>{props?.value.total},00 EUR</span>
                <div>
                    <Button title="Details" height="37px" margin="0" />
                    {window.innerWidth > 900 ? <Link to="#">Delete</Link> : ""}
                </div>
            </div>
        </div>
    );
}

export default DataRow;