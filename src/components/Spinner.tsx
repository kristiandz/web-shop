import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styles from "./Spinner.module.css";

function Spinner() {
    return ( 
        <div className={styles.spinner}>
            <FontAwesomeIcon icon={faSpinner} size="3x" />
        </div>
     );
}

export default Spinner;