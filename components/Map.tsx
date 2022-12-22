import { CCTV_DATA } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
//import { markerdata } from "../components/tempdata/marker";

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

  function makeCircle(lat: Number, lng: Number) {
    var circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lng), // 원의 중심좌표 입니다
      radius: 50, // 미터 단위의 원의 반지름입니다
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "", // 선의 스타일 입니다
      fillColor: "#8BF3A8", // 채우기 색깔입니다
      fillOpacity: 0.3, // 채우기 불투명도 입니다
    });
    return circle;
  }

  //마커 출력 함수

  function markerPrinter(map: any, renge: number[]) {
    //다중 마커 세팅2 - DB 데이터를 마커로 표시
    cctvdata.map((ele) => {
      if (
        ele.latitude < renge[0] &&
        ele.latitude > renge[2] &&
        ele.longitude < renge[1] &&
        ele.longitude > renge[3]
      ) {
        new window.kakao.maps.Marker({
          map: map, //마커가 표시될 지도
          position: new window.kakao.maps.LatLng(ele.latitude, ele.longitude), //마커가 표시될 위치
          title: ele.Range, //촬영방면
        });
        const circle = makeCircle(ele.latitude, ele.longitude);
        console.log(`출력마커:${ele.num}`);
        circle.setMap(map);
        console.log("마커 로드 완료");
      }
    }); //다중마커2
  }

  //초반 로드 때 cctvs에 api 값이 안들어가나?
  useEffect(() => {
    //DB 데이터 로드-----------------------------
    fetch("/api/location/all")
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.cctvS);
        //setCctvdata(json.cctvS);
        setCctvdata(() => json.cctvS);
        console.log("======cctvdata 출력========");
        console.log(cctvdata);
      });
  }, [latitude, longitude]); //useEffect

  useEffect(() => {
    //DB 데이터 로드-----------------------------
    // fetch("/api/location/all")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     //console.log(json.cctvS);
    //     //setCctvdata(json.cctvS);
    //     setCctvdata(() => json.cctvS);
    //     console.log("======cctvdata 출력========");
    //     console.log(cctvdata);
    //   });
    //DB 데이터 로드----------------------------------

    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    //console.log(mapScript.src);
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        var neLat = map.getBounds().getNorthEast().getLat();
        var neLng = map.getBounds().getNorthEast().getLng();
        var swLat = map.getBounds().getSouthWest().getLat();
        var swLng = map.getBounds().getSouthWest().getLng();

        const renge = [neLat, neLng, swLat, swLng];

        markerPrinter(map, renge);
        marker.setMap(map);

        //지도 영역 레벨 변경을 감지.
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        //지도가 이동, 확대/축소 시 발동하는 이벤트.
        const changeEvent = (map: any) => {
          var level = map.getLevel(); // 지도의 현재 레벨을 얻어옵니다
          console.log(`현재 지도 레벨은 ${level}입니다`);

          var neLat = map.getBounds().getNorthEast().getLat();
          var neLng = map.getBounds().getNorthEast().getLng();
          var swLat = map.getBounds().getSouthWest().getLat();
          var swLng = map.getBounds().getSouthWest().getLng();
          //console.log(neLat, neLng, swLat, swLng);
          const renge = [neLat, neLng, swLat, swLng];

          marker.setMap(null);
          markerPrinter(map, renge);
          marker.setMap(map);
        };

        //지도 레벨이 바뀌면 발동되는 함수
        window.kakao.maps.event.addListener(map, "zoom_changed", function () {
          changeEvent(map);
        });

        // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, "center_changed", function () {
          changeEvent(map);
        });
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
