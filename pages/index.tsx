import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Map from "../components/Map";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { CCTV_DATA } from "@prisma/client";
import useCurrentPosition from "../components/useCurrentPosition";

const Home: NextPage = () => {
  const [cctvdata, setCctvdata] = useState<CCTV_DATA[]>([]);

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };

  const showLatLong = () => {
    const { location: currentLocation, error: currentError } =
      useCurrentPosition(geolocationOptions);
    useEffect(() => {
      console.log("showLatLong 컴포넌트 렌더링");
    }, []);

    return <div>{(location.latitude, location.longitude)}</div>;
  };
  useEffect(() => {
    fetch("/api/location/all")
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.cctvS);
        //setCctvdata(json.cctvS);
        setCctvdata(() => json.cctvS);
        console.log("======123========");
      });
  }, []);
  return (
    <Layout title="CCTV MAP">
      <div>
        <div>홈페이지</div>
        <Map latitude={36.7961} longitude={127.0697}></Map>

        {cctvdata.map((cctv, idx) => (
          <div key={idx} className="flex space-x-3">
            <div>CCTV 번호 : {cctv.num}</div>
            <div>CCTV 위치 : {cctv.detail_address}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
