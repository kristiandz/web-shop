import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBroom, faCode, faTable, faBolt } from '@fortawesome/free-solid-svg-icons'
import styles from "./CategoryRow.module.css";

function CategoryRow(props: any) {

    // If the props are not passed, use this as default for the "All" category"
    let title = "All";
    // We are not using this icon for default "All" category, but we need to define the type for TS
    let art = faBolt;

    // Hardcoding category names and icons for each category to not alter the databse for the given task.
    // Ideally we would add the icons to the databse, including the all category and then simply render out components with data.
    switch (props?.title) {
        case "marketing":
            title = "Marketing";
            art = faBolt;
            break;
        case "design":
            title = "Design";
            art = faBroom;
            break;
        case "frontend":
            title = "Frontend";
            art = faTable;
            break;
        case "backend":
            title = "Backend";
            art = faCode;
            break;
        default:
            title = "All";
            break;
    }

    const selectCategory = () => {
        props?.selection(props?.title);
    }
    
    const selectAll = () => {
        props?.selection("All");
    }

    return (
        <div className={styles.category}>
            {/* If we are rendering the "All" category simply display the name without the icon, otherwise render all */}
            {title === "All" ? <h3 onClick={selectAll} className={styles.category__row__all}>{title}</h3> :
                <div className={styles.category__row} onClick={selectCategory}>
                    <FontAwesomeIcon icon={art} className={styles.category__row__icon} />
                    <h3>{title}</h3>
                </div>
            }
        </div>
    );
}

export default CategoryRow;