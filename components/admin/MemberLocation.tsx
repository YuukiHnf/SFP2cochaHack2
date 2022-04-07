import { Marker, InfoWindow } from "@react-google-maps/api";
import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getUserCollection, USER } from "../../utils/firebase/FirebaseStore";

const MemberLocation: VFC = () => {
  const [member, setMemeber] = useState<USER[]>([] as USER[]);
  const teamId = useAppSelector((state: RootState) => state.basicInfo.teamId);
  const [memberIndex, setMemberIndex] = useState(-1);

  const infoWindowOptions = {
    pixelOffset: new window.google.maps.Size(0, -45),
  };
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
        (mem, index) =>
          mem.location && (
            <Marker
              key={mem.uid}
              position={mem.location}
              icon={mem.avatarUrl ?? "/humanIcon.png"}
              onClick={() => {
                setMemberIndex(index);
              }}
            />
          )
      )}
      {memberIndex !== -1 && (
        <>
          <InfoWindow
            position={member[memberIndex].location}
            onCloseClick={() => setMemberIndex(-1)}
            options={infoWindowOptions}
          >
            <>
              <p style={{ fontWeight: "bold" }}>
                {member[memberIndex].username}
              </p>
              <ul>
                <li>{member[memberIndex].isActive ? "活動中" : "休憩中"}</li>
                <li>
                  {member[memberIndex].taskId
                    ? `タスク(${member[memberIndex].taskId}}`
                    : "タスクなし"}
                </li>
              </ul>
            </>
          </InfoWindow>
        </>
      )}
    </>
  );
};

export default MemberLocation;
