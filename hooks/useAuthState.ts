import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAppDispatch } from "../app/hooks";
import { auth } from "../utils/firebase/FirebaseAuth";
import {
  DateSchedule,
  db,
  getUserCollection,
  USER,
} from "../utils/firebase/FirebaseStore";
import { basicInfologout } from "../features/basicInfoSlice";
interface Props {
  LoginType: "admin" | "guest";
}
/**
 * GoogleでのLoginやLogoutを担う関数を扱う
 * 値のreduxStateへの更新などは、最初のAuthComponentにて行っている、これはauthStateChangedを使っているため
 */
const useAuthState = ({ LoginType }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      dispatch(basicInfologout());
      router.push(`/login`);
    } catch (e: any) {
      alert(`[Myerror] authLogout : ${e}`);
    }
  };

  const provider = new GoogleAuthProvider();

  const signInGoogle = async () => {
    try {
      const ptrDate = new Date();
      const result = await signInWithPopup(auth, provider);

      // if (result.user.metadata.creationTime) {
      //   ptrDate.setSeconds(ptrDate.getSeconds() + 10);
      //   //console.log(ptrDate);
      //   console.log(result.user.metadata);
      //   //console.log(result.user.metadata.lastSignInTime);
      //   console.log(
      //     ptrDate.getTime() >
      //       new Date(result.user.metadata.creationTime).getTime()
      //   );
      // }
      if (
        result.user.metadata.lastSignInTime ===
        result.user.metadata.creationTime
      ) {
        // firestoreに入れる, idランダム
        try {
          await setDoc(doc(db, "users", result.user.uid), {
            username: result.user.displayName,
            avatarUrl: result.user.photoURL,
            timeSche: [] as DateSchedule[],
            isActive: true,
            isGPS: false,
            location: { lat: 0, lng: 0 },
            teamId: "hokudaiFesta",
            taskId: "",
          } as Omit<USER, "uid">);
        } catch (e: any) {
          alert(`[MyAuthWithCREATEEmail] : ${e.message}`);
        }
      }

      router.push(`/${LoginType}`);
    } catch (e: any) {
      alert(`[MyAuthWithGoogleError] : ${e.message}`);
    }
  };

  return { signInEmail, signUpEmail, logout, signInGoogle };
};

export default useAuthState;
