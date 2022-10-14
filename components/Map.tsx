import { CCTV_DATA } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { markerdata } from "../components/tempdata/marker";
interface MapProps {
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map({ latitude, longitude }: MapProps) {
  //console.log("map 로딩");
  const [cctvdata, setCctvdata] = useState<CCTV_DATA[]>([]);

  //DB 데이터 로드-----------------------------
  useEffect(() => {
    fetch("/api/location/all")
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.cctvS);
        //setCctvdata(json.cctvS);
        setCctvdata(() => json.cctvS);
        console.log("======cctvdata 출력========");
        console.log(cctvdata);
      });
    //DB 데이터 로드----------------------------------

    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    //console.log(mapScript.src);
    document.head.appendChild(mapScript);

    // //현재 접속 위치를 얻어온다.
    // if (navigator.geolocation) {
    // }

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 10,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // //다중 마커 세팅
        // markerdata.forEach((ele) => {
        //   new window.kakao.maps.Marker({
        //     map: map, //마커가 표시될 지도
        //     position: new window.kakao.maps.LatLng(ele.lat, ele.lng), //마커가 표시될 위치
        //     title: ele.title,
        //   });
        // }); //다중마커

        //다중 마커 세팅2 - DB 데이터를 마커로 표시
        cctvdata.forEach((ele) => {
          new window.kakao.maps.Marker({
            map: map, //마커가 표시될 지도
            position: new window.kakao.maps.LatLng(ele.latitude, ele.longitude), //마커가 표시될 위치
            title: ele.Range, //촬영방면
          });
          console.log(`촬영방면 : ${ele.Range}`);
        }); //다중마커2
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]); //useEffect

  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "400px",
      }}
    ></div>
  );
}

//map 컨테이너만 해결하면 될듯
//쉿팔 됐다아아ㅏ아아아아아
