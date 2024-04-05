import {useState, createContext} from 'react';

export const ModalContext = createContext();

export const CustomProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const obj = {
        modalOpen,
        setModalOpen,
        reviewModalOpen,
        setReviewModalOpen
    }

    return(
        <ModalContext.Provider value={obj}>
            {children}
        </ModalContext.Provider>
    );
}