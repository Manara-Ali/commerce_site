import {useState, createContext} from 'react';

export const PriceContext = createContext();

export const CustomPriceProvider = ({children}) => {
    const [price, setPrice] = useState(4.99);

    const obj = {
        price,
        setPrice,
    }

    return(
        <PriceContext.Provider value={obj}>
            {children}
        </PriceContext.Provider>
    );
}