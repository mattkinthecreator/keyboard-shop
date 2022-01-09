import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../fire';

export const authContext = React.createContext();

const usersCollectionRef = collection(db, 'users');

const auth = getAuth();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState('');

  const admins = 'bekievbeil@gmail.com';

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogIn = () => {
    console.log(user, 1);
    console.log('log in');
    clearErrors();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(error.message);
          break;
        case 'auth/wrong-password':
          setPasswordError(error.message);
          break;
        default:
          return;
      }
    });
  };

  const handleSignUp = () => {
    clearErrors();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await addDoc(usersCollectionRef, {
          user: email,
          favorites: [],
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(error.message);
            break;
          case 'auth/weak-password':
            setPasswordError(error.message);
            break;
          default:
            return;
        }
      });
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        clearInputs();
        setUser(user);
        if (user.email === admins) {
          setIsAdmin(true);
        }
      } else {
        console.log(user);
        setUser('');
        setIsAdmin(false);
      }
    });
  };

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email).catch((error) => {
      setEmailError(error.message);
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const getFavorites = async () => {
    const data = await getDocs(usersCollectionRef);
    const allFavorites = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(allFavorites);
    const currentUserFavorites = allFavorites.filter(
      (item) => item.user === user?.email
    )[0];
    console.log(user.email);
    if (currentUserFavorites) {
      setUserId(currentUserFavorites.id);
      setFavorites(currentUserFavorites.favorites);
    }
  };

  const toggleFavorite = async (obj) => {
    const userRef = doc(db, 'users', userId);
    let newFavorites = [...favorites];
    if (newFavorites.some((item) => item.name === obj.name)) {
      newFavorites = favorites.filter((item) => item.name !== obj.name);
    } else {
      newFavorites.push(obj);
    }
    await updateDoc(userRef, { favorites: newFavorites });
    getFavorites();
  };

  useEffect(() => {
    getFavorites();
  }, [user]);

  console.log(userId);

  const values = {
    email,
    user,
    password,
    hasAccount,
    emailError,
    passwordError,
    isAdmin,
    favorites,
    handleLogOut,
    handleLogIn,
    handleSignUp,
    setEmail,
    setPassword,
    setHasAccount,
    forgotPassword,
    toggleFavorite,
    getFavorites,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
