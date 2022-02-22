import styles from "./Button.module.css";

interface IButton{
    title: string,
    width?: string,
    height?: string,
    margin?: string,
    background?: string,
    color?: string
}

function Button(props: IButton) {
    // The styles can be set from the parent, otherwise it is using default values in css
    return (
        // Using inline style for simplicity, although it is not recommended. This way we can simply reuse the component across the website.
        <button
            type="button"
            className={styles.button}
            style={{ width: props?.width, height: props?.height, margin: props?.margin, background: props?.background, color: props?.color }}>
            {props.title}
        </button>
    );
}

export default Button;