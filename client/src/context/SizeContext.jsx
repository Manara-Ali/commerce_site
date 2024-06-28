import {useState, createContext} from 'react';

export const SizeContext = createContext();

export const CustomSizeProvider = ({children}) => {
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