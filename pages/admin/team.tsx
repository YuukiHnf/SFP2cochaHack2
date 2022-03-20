import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import AdminWrapper from "../../components/admin/AdminWrapper";
import AppBar1 from "../../components/admin/AppBar1";
import Table1 from "../../components/admin/Table1";
import { getUserCollection, USER } from "../../utils/firebase/FirebaseStore";

const team = () => {
  const [member, setMemeber] = useState<USER[]>([] as USER[]);
  const teamId = useAppSelector((state: RootState) => state.basicInfo.teamId);
  console.log(member);
  useEffect(() => {
    (async () => {
      const q = query(getUserCollection, where("teamId", "==", teamId));
      const querySnapshot = await getDocs(q);
      setMemeber(
        querySnapshot.docs.map((snap) => {
          const _data = snap.data();
          console.log(_data);
          return {
            ..._data,
            uid: snap.id,
          } as USER;
        })
      );
    })();
  }, []);

  return (
    <>
      <AppBar1 />
      {/* {member.map((mem) => (
        <div key={mem.uid}>
          <p>
            {mem.uid}:{mem.username}
          </p>
        </div>
      ))} */}
      <Table1 rows={member} />
      <h3>招待リンク: {"https//:cochahack.app/login"}</h3>
    </>
  );
};

export default team;
