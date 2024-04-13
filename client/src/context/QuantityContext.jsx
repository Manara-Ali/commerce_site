import {useState, createContext} from 'react';

export const QuantityContext = createContext();

export const CustomQuantityProvider = ({children}) => {
    const [quantity, setQuantity] = useState(1);

    const obj = {
        quantity,
        setQuantity,
    }

    return(
        <QuantityContext.Provider value={obj}>
            {children}
        </QuantityContext.Provider>
    );
}