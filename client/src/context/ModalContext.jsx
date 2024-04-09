import {useState, createContext} from 'react';

export const ModalContext = createContext();

export const CustomProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const obj = {
        modalOpen,
        setModalOpen,
        reviewModalOpen,
        setReviewModalOpen,
        deleteModalOpen,
        setDeleteModalOpen
    }

    return(
        <ModalContext.Provider value={obj}>
            {children}
        </ModalContext.Provider>
    );
}