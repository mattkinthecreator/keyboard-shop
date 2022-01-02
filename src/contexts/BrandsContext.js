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
};

const brandsCollectionRef = collection(db, 'brands');

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_BRANDS':
      return { ...state, brands: action.payload };
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

  return (
    <brandsContext.Provider
      value={{
        brands: state.brands,
        getBrands,
        addBrand,
        deleteBrand,
        updateBrand,
      }}>
      {children}
    </brandsContext.Provider>
  );
};

export default BrandsContextProvider;
