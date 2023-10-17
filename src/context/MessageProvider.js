import React, {createContext, useState, useContext} from 'react';

const MessageContext = createContext();

export const MessageProvider = ({children}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [focusedTitle, setFocusedTitle] = useState(''); // Initialize with an empty string
  const [focusedDescription, setFocusedDescription] = useState(''); // Initialize with an empty string
  const [focusedBackground, setFocusedBackground] = useState('');

  return (
    <MessageContext.Provider
      value={{
        focusedIndex,
        setFocusedIndex,
        focusedTitle,
        setFocusedTitle,
        focusedDescription,
        setFocusedDescription,
        focusedBackground,
        setFocusedBackground,
      }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
