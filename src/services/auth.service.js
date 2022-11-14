import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const handleSignWithGoogleAccount = () => {
    console.log('asdasd');
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

export const handleLogout = () => {
    console.log('asdasd');
    signOut(auth)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

export default {
    handleSignWithGoogleAccount,
    handleLogout,
}