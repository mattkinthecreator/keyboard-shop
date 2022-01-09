import React, { useReducer, createContext, useContext } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';

import { db } from '../fire';

export const keyboardsContext = createContext();

const keyboardsCollectionRef = collection(db, 'keyboards');

const INIT_STATE = {
  keyboards: [],
  editKeyboard: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_KEYBOARDS':
      return { ...state, keyboards: action.payload };
    case 'GET_EDIT_KEYBOARD':
      return { ...state, editKeyboard: action.payload };
    default:
      return state;
  }
};

const KeyboardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getKeyboards = async () => {
    const data = await getDocs(keyboardsCollectionRef);
    const keyboards = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'GET_KEYBOARDS', payload: keyboards });
  };

  const addKeyboard = async (obj) => {
    await addDoc(keyboardsCollectionRef, obj);
    getKeyboards();
  };

  const handleEditKeyboard = (obj) => {
    dispatch({ type: 'GET_EDIT_KEYBOARD', payload: obj });
  };

  const deleteKeyboard = async (id) => {
    await deleteDoc(doc(db, 'keyboards', id));
    getKeyboards();
  };

  const updateKeyboard = async (id, obj) => {
    await updateDoc(doc(db, 'keyboards', id), obj);
    getKeyboards();
  };

  const filterKeyboardsForm = async (value) => {
    let q = query(keyboardsCollectionRef, where('form', '==', value));
    let querySnapshot = await getDocs(q);
    let data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'GET_KEYBOARDS', payload: data });
  };

  const filterKeyboardsBrand = async (value) => {
    let q = query(keyboardsCollectionRef, where('brand', '==', value));
    let querySnapshot = await getDocs(q);
    let data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'GET_KEYBOARDS', payload: data });
  };

  const getSearchKeyboards = async (value) => {
    if (value.trim().length > 0) {
      let searchVal = value.toLowerCase();
      const data = await getDocs(keyboardsCollectionRef);
      const keyboards = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (item) =>
            item.name
              .toLowerCase()
              .slice(0, searchVal.length)
              .indexOf(searchVal) !== -1
        );
      dispatch({ type: 'GET_KEYBOARDS', payload: keyboards });
    } else {
      getKeyboards();
    }
  };

  return (
    <keyboardsContext.Provider
      value={{
        keyboards: state.keyboards,
        editKeyboard: state.editKeyboard,
        getKeyboards,
        addKeyboard,
        handleEditKeyboard,
        deleteKeyboard,
        updateKeyboard,
        filterKeyboardsForm,
        filterKeyboardsBrand,
        getSearchKeyboards,
      }}>
      {children}
    </keyboardsContext.Provider>
  );
};

export default KeyboardsContextProvider;
