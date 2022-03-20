/** Custom Hooks
 * Placeデータを受け持つ
 */

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, PLACE } from "../utils/firebase/FirebaseStore";

type Props = {
  teamId: string;
};

const path = "place";

const usePlaceHooks = ({ teamId }: Props) => {
  const saveMapState = async (param: PLACE) => {
    const teamRef = doc(db, "team", teamId);

    await updateDoc(teamRef, {
      place: {
        center: param.center,
        zoom: param.zoom,
        heading: param.heading ?? 0, // 設定出来次第かえる
        tilt: param.tilt ?? 0,
      },
    });
  };

  return { saveMapState };
};

export default usePlaceHooks;
