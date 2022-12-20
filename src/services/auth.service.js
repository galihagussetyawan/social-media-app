import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {currentUser} from "../stores/auth.store";
import { generateFromEmail } from "unique-username-generator";

export const handleSignWithGoogleAccount = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // const user = result.user;

            await setDoc(doc(db, 'users', result.user.uid), {
                username: generateFromEmail(result?.user?.email),
                displayName: result?.user?.displayName,
                email: result?.user?.email,
                photoURL: result?.user?.photoURL,
                isPrivate: false,
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

export const handleLogout = () => {
    signOut(auth);
    currentUser.set(null);
}

export default {
    handleSignWithGoogleAccount,
    handleLogout,
}