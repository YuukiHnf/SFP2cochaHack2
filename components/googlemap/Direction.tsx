import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { memo, useCallback, useState, VFC } from "react";
import { Location } from "../../utils/firebase/FirebaseStore";

type Props = {
  origin: Location;
  destination: Location;
  transitPosition?: Location[];
};

const Direction: VFC<Props> = ({
  origin,
  destination,
  transitPosition = [],
}) => {
  // 出発点
  //const origin = { lat: 43.0854163, lng: 141.3335412 };
  // 終着点
  //const destination = { lat: 43.080433413608795, lng: 141.34002729384855 };
  // 経由点
  //const transitPositions = [];

  const [currentDirection, setCurrentDirection] =
    useState<google.maps.DirectionsResult | null>(null);

  console.log(currentDirection);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result) {
        if (currentDirection) {
          if (
            status === "OK" &&
            result.geocoded_waypoints?.length !==
              currentDirection.geocoded_waypoints?.length
          ) {
            // ルート変更がされたため、stateを更新する
            setCurrentDirection(result);
          } else {
            // 前回と同じルートのため、stateを更新しない
          }
        } else {
          if (status === "OK") {
            // 初めてルートが設定されたとき
            setCurrentDirection(result);
          } else {
            //前回と同じルートのため、stateを更新しない
          }
        }
      }
    },
    []
  );

  return (
    <>
      {/* 
        1.DirectionsServiceコンポーネントは、レンダーされるとルートを検索して、結果をcallbackで返す
        2.このAPIレスポンスをstateに保存すると、毎回DirectionsServiceコンポーネントが再レンダーされる
        3.無限ループを防ぐため、directionsCallbackで、処理を丁寧に書いている
      */}
      {currentDirection ? (
        <></>
      ) : (
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode: google.maps.TravelMode.WALKING,
            optimizeWaypoints: true,
          }}
          callback={directionsCallback}
        />
      )}
      {/* //
      DirectionsServiceのAPI検索の結果としてcurrenctDirectionがあれば、その結果をDirectionsRendererで表示する。
      //
      予めルート情報を持っていれば、DirecitonsServiceでAPIコールする必要はない。 */}
      {currentDirection && (
        <DirectionsRenderer options={{ directions: currentDirection }} />
      )}
    </>
  );
};

export default memo(Direction);
