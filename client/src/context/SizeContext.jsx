import {useState, createContext} from 'react';

export const SizeContext = createContext();

export const CustomPriceProvider = ({children}) => {
    const [size, setSize] = useState(16);

    const obj = {
        size,
        setSize,
    }

    return(
        <SizeContext.Provider value={obj}>
            {children}
        </SizeContext.Provider>
    );
}