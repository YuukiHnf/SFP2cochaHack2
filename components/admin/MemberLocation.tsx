import { Marker } from "@react-google-maps/api";
import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getUserCollection, USER } from "../../utils/firebase/FirebaseStore";

import PersonIcon from "@mui/icons-material/Person";

const MemberLocation: VFC = () => {
  const [member, setMemeber] = useState<USER[]>([] as USER[]);
  const teamId = useAppSelector((state: RootState) => state.basicInfo.teamId);
  //console.log(member);
  useEffect(() => {
    (async () => {
      const q = query(getUserCollection, where("teamId", "==", teamId));
      const querySnapshot = await getDocs(q);
      setMemeber(
        querySnapshot.docs.map((snap) => {
          const _data = snap.data();
          //console.log(_data);
          return {
            ..._data,
            uid: snap.id,
          } as USER;
        })
      );
    })();
  }, []);
  //console.log(member);
  return (
    <>
      {member.map(
        (mem) =>
          mem.location && (
            <Marker
              key={mem.uid}
              position={mem.location}
              icon={
                "http://localhost:9199/v0/b/default-bucket/o/icons8-circled-user-male-skin-type-1-and-2-48.png?alt=media&token=d910ea1b-2968-4f57-b300-1c99b985ff66"
              }
            />
          )
      )}
    </>
  );
};

export default MemberLocation;
