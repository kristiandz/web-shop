import styles from "./Button.module.css";

function Button(props:any) {
    // The width can be set from the parent, otherwise its default (the width of the text for the button)
    return (
        // Using inline style for simplicity
        <button type="button" className={styles.button} style={{width:props?.width}}>{props.title}</button>
    );
}

export default Button;