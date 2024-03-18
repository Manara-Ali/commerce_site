import {useState, createContext} from 'react';

export const ModalContext = createContext();

export const CustomProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const obj = {
        modalOpen,
        setModalOpen,
    }

    return(
        <ModalContext.Provider value={obj}>
            {children}
        </ModalContext.Provider>
    );
}