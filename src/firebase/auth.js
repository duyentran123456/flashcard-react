import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { app, db } from './app';

const auth = getAuth(app);
const usersCol = collection(db, 'users');

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    const authenticatedUser = await getCurrentUser(user.uid);
    return authenticatedUser;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return null;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(usersCol, {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      role: 'user',
    });
    return {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      role: 'user',
    };
  } catch (err) {
    console.error(err);
    alert(err.message);
    return null;
  }
};

const logout = () => {
  signOut(auth);
};

const getCurrentUser = async (uid) => {
  try {
    const q = query(usersCol, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log('error', e);
  }
  return null;
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  getCurrentUser,
};
