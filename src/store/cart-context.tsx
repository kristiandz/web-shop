import { createContext, useState } from "react";

interface IWorkshopItem {
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

// Interface for the context we are making
interface ContextInterface {
    cartItems: IWorkshopItem[],
    cartLength: number,
    cartActive: boolean,
    checkoutActive: boolean,
    addToCart: (workshop: IWorkshopItem) => void,
    removeFromCart: (workshopID: number) => void,
    updateWorkshop: (workshop: IWorkshopItem) => void,
    toggleCheckout: () => void,
    toggleCart: () => void,
    isInCart: (workshopID: number) => boolean
    clearCart: () => void
}

// Create context based on the interface and set default values
const CartContext = createContext<ContextInterface>({
    cartItems: [],
    cartLength: 0,
    cartActive: false,
    checkoutActive: false,
    addToCart: () => { },
    removeFromCart: () => { },
    updateWorkshop: () => { },
    toggleCheckout: () => { },
    toggleCart: () => { },
    isInCart: () => { return false },
    clearCart: () => { }
});

// Wrapper for the application, so we can easily use and update cart and checkout funcitonalities
export function CartContextProvider(props: any) {

    const [workshops, setWorkshops] = useState<any[]>([]);
    const [checkoutActive, setCheckoutActive] = useState(false);
    const [cartActive, setCartActive] = useState(false);

    // Push the new workshop to the state
    function addToCartHandler(workshop: IWorkshopItem) {
        setWorkshops([...workshops, workshop]);
    }

    // Remove the matching workshop from the state
    function removeFromCartHandler(workshopID: number) {
        setWorkshops((prev) => {
            return prev.filter((workshop) => workshop.id !== workshopID);
        });
    }

    // Update the specific workshop in the state, we are sending the new workshop here with updated ticket quantity
    // Find the index of matching id and then replace the workshop in context with the new prop, push new state
    function updateWorkshopHandler(workshop: IWorkshopItem) {
        const index = workshops.findIndex((el) => el.id === workshop.id)
        const newWorkshops = [...workshops];
        newWorkshops[index] = workshop;
        setWorkshops([...newWorkshops]);
    };

    // Open the checkout window if there are workshops to be checked out
    function toggleCheckoutHandler() {
        if (workshops.length !== 0)
            setCheckoutActive(!checkoutActive);
    }

    // Toggle the cart window
    function toggleCartHandler() {
        setCartActive(!cartActive);
    }

    // Is the workshop already in the context state, we are using this to prevent pushing the same workshop multiple times with the same key
    function isInCartHandler(workshopID: number) {
        return workshops.some((workshop) => workshop.id === workshopID);
    }

    function clearCartHandler(){
        setWorkshops([]);
    }

    // Context values that we can access from the application once wrapped and hooked from the child component
    const context = {
        cartItems: workshops,
        cartLength: workshops.length,
        cartActive: cartActive,
        checkoutActive: checkoutActive,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        updateWorkshop: updateWorkshopHandler,
        toggleCheckout: toggleCheckoutHandler,
        toggleCart: toggleCartHandler,
        isInCart: isInCartHandler,
        clearCart: clearCartHandler
    };

    // Context wrapper for the application
    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;
