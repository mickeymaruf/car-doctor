import React, { createContext, useContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const login = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const setProfile = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }
    const logout = () => {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoader(false);
        });
        return () => {
            unsubscribe()
        };
    }, [])
    const value = {
        user,
        loader,
        login,
        createUser,
        setProfile,
        verifyEmail,
        logout
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;