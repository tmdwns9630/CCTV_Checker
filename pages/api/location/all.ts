// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CCTV_DATA } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/server/client";

interface Data {
  ok: boolean;
  cctvS?: CCTV_DATA[];
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드입니다 - ${req.method}`,
    });
    return;
  }
  try {
    //console.log(req.query);
    // const cctvS = await client.cCTV_DATA.findMany({
    //   cursor: { id: "6346d56a04d8d08df2cd4a39" },
    //   take: 13,
    // });
    const cctvS = await client.cCTV_DATA.findMany();
    //console.log("======================");
    //console.log(cctvS.filter((ele, idx) => ele.num < 5));
    //const ResCCTVonFive = cctvS.filter((ele, idx) => ele.num <= 5);
    //num 5 이하의 cctv 정보만 로드하였음.
    // const ResCCTVonFive = cctvS.filter(
    //   (ele, idx) => ele.num > 0 && ele.num <= 10
    // ); //테스트를 위해 2곳만 나오게 함.
    //console.log(ResCCTVonFive);

    const ResCCTVonFive = cctvS;
    //console.log(ResCCTVonFive);
    res.status(200).json({
      ok: true,
      message: "cctv데이터를 로드했습니다.",
      cctvS: ResCCTVonFive,
    });
  } catch (err) {
    res.status(200).json({
      ok: false,
      message: "메서드 통과는 했으나 다른 에러가 발생.",
      error: `${err}`,
    });
  } finally {
    await client.$disconnect(); //DB 연결 해제.
  }
  //res.status(200).json({ ok: true, message: "clearMind" });
}
