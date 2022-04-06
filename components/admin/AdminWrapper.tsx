import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  adminObjectLocationsSetter,
  adminObjectSetter,
  adminSetter,
  adminTaskSetter,
  selectAdminObjects,
} from "../../features/adminSlice";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { setSetObject } from "../../features/setObjectSlice";
import {
  db,
  OBJECTPARAM,
  ObjectTimeLocations,
  PLACE,
  SetObjectType,
  TaskBlock,
  TEAM,
} from "../../utils/firebase/FirebaseStore";

interface Props {
  children: React.ReactNode;
}

const AdminWrapper: VFC<Props> = ({ children }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  //const objectParams = useAppSelector(selectAdminObjects);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    // if (basicInfo.userId.length == 0 || basicInfo.teamId.length == 0) {
    //   router.push("/login");
    //   return;
    // }
    if (!db || basicInfo.userId.length == 0 || basicInfo.teamId.length == 0) {
      console.log("AdminWrapper");
      router.push("/login");
      return;
    }
    // // admin用のState入力
    //const teamRef = doc(db, `team/${basicInfo.teamId}`);
    const colRef = collection(db, "team");
    const teamRef = doc(colRef, basicInfo.teamId);
    const unSub = onSnapshot(teamRef, (doc) => {
      console.log("[usSub]:", doc.data());
      if (doc.data()) {
        const _data = doc.data() as TEAM;
        dispatch(
          adminSetter({
            place: _data.place,
            timeSche: _data.timeSche,
          })
        );
      }
    });

    // Object Collection
    const unSubObj = onSnapshot(
      query(
        collection(doc(db, "team", basicInfo.teamId), "objects"),
        orderBy("createAt", "asc")
      ),
      (objectSnaps) => {
        dispatch(
          adminObjectSetter(
            objectSnaps.docs.map(
              (snap) => ({ ...snap.data(), id: snap.id } as OBJECTPARAM)
            )
          )
        );
        objectSnaps.docs.forEach((param) => {
          // Locationを時間でソートして保持する
          const locationQuery = query(
            collection(
              doc(
                collection(doc(db, "team", basicInfo.teamId), "objects"),
                param.id
              ),
              "Locations"
            ),
            orderBy("timeStamp", "asc")
          );
          onSnapshot(locationQuery, (locationSnaps) => {
            //console.log(locationSnaps.docs.map((_s) => _s.data()));
            //if (locationSnaps.empty) return;
            dispatch(
              adminObjectLocationsSetter({
                timeLocation: locationSnaps.docs.map(
                  (locSnap) =>
                    ({
                      ...locSnap.data(),
                      id: locSnap.id,
                    } as ObjectTimeLocations)
                ),
                ObjectId: param.id,
              })
            );
          });
        });
      }
    );
    // location Collectionをとってくる

    // TaskBlockCollection
    const taskBlockRef = collection(
      doc(db, "team", basicInfo.teamId),
      "taskBlock"
    );
    const blockQuery = query(taskBlockRef, orderBy("time", "asc"));
    const unSubTaskBlock = onSnapshot(blockQuery, (blockSnaps) => {
      if (!blockSnaps.empty) {
        dispatch(
          adminTaskSetter(
            blockSnaps.docs.map(
              (snap) => ({ ...snap.data(), id: snap.id } as TaskBlock)
            )
          )
        );
      }
    });

    // set Object
    const unSubSetObj = onSnapshot(
      collection(doc(collection(db, "team"), basicInfo.teamId), "sets"),
      (setObjSnaps) => {
        if (!setObjSnaps.empty) {
          dispatch(
            setSetObject(
              setObjSnaps.docs.map(
                (snap) => ({ ...snap.data(), id: snap.id } as SetObjectType)
              )
            )
          );
        }
      }
    );

    return () => {
      unSub();
      unSubObj();
      unSubTaskBlock();
      unSubSetObj();
    };
  }, [basicInfo]);

  // useEffect(() => {
  //   objectParams.forEach((param) => {
  //     // Locationを時間でソートして保持する
  //     const locationQuery = query(
  //       collection(
  //         doc(
  //           collection(doc(db, "team", basicInfo.teamId), "objects"),
  //           param.id
  //         ),
  //         "Locations"
  //       ),
  //       orderBy("timeStamp", "asc")
  //     );
  //     onSnapshot(locationQuery, (locationSnaps) => {
  //       console.log(locationSnaps.docs.map((_s) => _s.data()));
  //       //if (locationSnaps.empty) return;
  //       dispatch(
  //         adminObjectLocationsSetter({
  //           timeLocation: locationSnaps.docs.map(
  //             (locSnap) => ({ ...locSnap.data() } as ObjectTimeLocations)
  //           ),
  //           ObjectId: param.id,
  //         })
  //       );
  //     });
  //   });
  // }, [objectParams]);

  return <div>{children}</div>;
};

export default AdminWrapper;
