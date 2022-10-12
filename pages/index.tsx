import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Map from "../components/Map";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { CCTV_DATA } from "@prisma/client";

const Home: NextPage = () => {
  const [cctvdata, setCctvdata] = useState<CCTV_DATA[]>([]);
  // const [cctvNum, setCctvNum] = useState("");
  // const [cctvLocation, setCctvLocation] = useState("");

  useEffect(() => {
    fetch("/api/location/all")
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.cctvS);
        setCctvdata(json.cctvS);
        console.log("==============");
        console.log(cctvdata);
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
