import styles from "./DataRow.module.css";
import { Link } from "react-router-dom";
import Button from "./Button";

// Data row for the extended assignment used for order previews etc.

function DataRow(props: any) {

    let color = "var(--lighter-grey)";
    props?.id % 2 ? color = "var(--white)" : color = "var(--lighter-grey)"; 

    return (
        // Passing the color here to achieve the alternating row color effect, default is set, override if the prop is defined
        <div className={styles.dataRow} style={{ background: color }}>
            <div className={styles.dataRow__content}>
                <span>00000000{props?.id}</span>
                <span>{props?.value.date}</span>
                <span>{props?.value.time} sati</span>
                <span>{props?.value.total},00 HRK</span>
                <div>
                    <Button title="Details" height="37px" margin="0" />
                    <Link to="#">Delete</Link>
                </div>
            </div>
        </div>
    );
}

export default DataRow;