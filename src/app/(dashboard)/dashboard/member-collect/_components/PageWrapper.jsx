"use client";

import { createContext, useContext, useState } from "react";

const pageWrapperContext = createContext();

export const useMemberCollectState = () => {
  return useContext(pageWrapperContext);
};

export default function MemberCollectWrapperProvider({ children }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setCurrentStudent(null);
    setIsFormOpen(false);
  };

  const handleOpenModal = () => {
    setIsFormOpen(true);
  };

  const state = {
    isFormOpen,
    currentStudent,
    onEditStudent: handleEditStudent,
    onCloseForm: handleCloseForm,
    onOpenModal: handleOpenModal,
  };

  return (
    <pageWrapperContext.Provider value={state}>
      {children}
    </pageWrapperContext.Provider>
  );
}
