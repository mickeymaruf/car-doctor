import React, { createContext, useContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged  } from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const setProfile = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged (auth, currentUser => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe()
        };
    }, [])
    const value = {
        user,
        login,
        createUser,
        setProfile,
        verifyEmail
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;