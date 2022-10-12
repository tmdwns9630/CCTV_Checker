import type { NextPage } from "next";
import Layout from "../components/Layout";
import Map from "../components/Map";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout title="CCTV MAP">
      <div>
        <div>홈페이지</div>
        <Map latitude={36.7961} longitude={127.0697}></Map>
      </div>
    </Layout>
  );
};

export default Home;
