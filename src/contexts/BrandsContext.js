import React, { createContext, useReducer } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../fire';

export const brandsContext = createContext();

const INIT_STATE = {
  brands: [],
  editBrand: '',
};

const brandsCollectionRef = collection(db, 'brands');

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_BRANDS':
      return { ...state, brands: action.payload };
    case 'GET_EDIT_BRAND':
      return { ...state, editBrand: action.payload };
    default:
      return state;
  }
};

const BrandsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getBrands = async () => {
    const data = await getDocs(brandsCollectionRef);
    const brands = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: 'GET_BRANDS', payload: brands });
  };

  const addBrand = async (obj) => {
    await addDoc(brandsCollectionRef, obj);
    getBrands();
  };

  const deleteBrand = async (id) => {
    await deleteDoc(doc(db, 'brands', id));
    getBrands();
  };

  const updateBrand = async (id, obj) => {
    await updateDoc(doc(db, 'brands', id), obj);
    getBrands();
  };

  const handleEditBrand = (obj) => {
    dispatch({ type: 'GET_EDIT_BRAND', payload: obj });
  };

  return (
    <brandsContext.Provider
      value={{
        brands: state.brands,
        editBrand: state.editBrand,
        getBrands,
        addBrand,
        deleteBrand,
        updateBrand,
        handleEditBrand,
      }}>
      {children}
    </brandsContext.Provider>
  );
};

export default BrandsContextProvider;
