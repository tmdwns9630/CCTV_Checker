import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import Layout from "../components/Layout";
import { cls } from "../components/utils";
import React, { FC } from "react";

const Home: NextPage = (props) => {
  const Map: FC = () => {
    return;
  };

  return (
    <Layout title="CCTV MAP">
      <div>홈페이지, 대충 이런 느낌으로 지도 넣으면 성공</div>
      <img
        alt="샘플 지도이미지"
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnpqKF%2Fbtq3TXfJUPO%2FMknEEgNw0jnxZwMgpUR3f1%2Fimg.png"
      ></img>
      <div></div>
    </Layout>
  );
};

export default Home;
