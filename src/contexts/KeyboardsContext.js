import React, { useReducer, createContext } from 'react'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'

import { db } from '../fire'

export const keyboardsContext = createContext()

const keyboardsCollectionRef = collection(db, 'keyboards')

const INIT_STATE = {
  keyboards: [],
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_KEYBOARDS':
      return { ...state, keyboards: action.payload }
    default:
      return state
  }
}

const KeyboardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  const getKeyboards = async () => {
    const data = await getDocs(keyboardsCollectionRef)
    const keyboards = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log(keyboards)
    dispatch({ type: 'GET_KEYBOARDS', payload: keyboards })
  }

  const addKeyboard = async (obj) => {
    await addDoc(keyboardsCollectionRef, obj)
  }

  return (
    <keyboardsContext.Provider
      value={{
        keyboards: state.keyboards,
        getKeyboards,
        addKeyboard,
      }}
    >
      {children}
    </keyboardsContext.Provider>
  )
}

export default KeyboardsContextProvider
