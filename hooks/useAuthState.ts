import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase/FirebaseAuth";
import {
  DateSchedule,
  db,
  getUserCollection,
  USER,
} from "../utils/firebase/FirebaseStore";

interface Props {
  LoginType: "admin" | "guest";
}
/**
 * GoogleでのLoginやLogoutを担う関数を扱う
 * 値のreduxStateへの更新などは、最初のAuthComponentにて行っている、これはauthStateChangedを使っているため
 */
const useAuthState = ({ LoginType }: Props) => {
  const router = useRouter();

  const signInEmail = async (
    email: string,
    password: string,
    teamId: string
  ) => {
    try {
      const usrCredient = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push(`/${LoginType}`);
    } catch (e: any) {
      alert(`[MyAuthWithEmail] : ${e.message}`);
    }
  };

  const signUpEmail = async (
    email: string,
    password: string,
    teamId: string
  ) => {
    try {
      // 新規作成
      const usrCredient = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(usrCredient.user, {
        displayName: email.split("@")[0],
        photoURL: "",
      });
      console.log("[MyAuth]:CreateNew");

      // firestoreに入れる, idランダム
      await setDoc(doc(db, "users", usrCredient.user.uid), {
        username: usrCredient.user.displayName,
        avatarUrl: usrCredient.user.photoURL,
        timeSche: [] as DateSchedule[],
        isActive: true,
        isGPS: false,
        location: { lat: 0, lng: 0 },
        teamId: teamId,
        taskId: "",
      } as Omit<USER, "uid">);

      signInEmail(email, password, teamId);
    } catch (e: any) {
      alert(`[MyAuthWithCREATEEmail] : ${e.message}`);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      alert(`[Myerror] authLogout : ${e}`);
    }
  };

  return { signInEmail, signUpEmail, logout };
};

export default useAuthState;
