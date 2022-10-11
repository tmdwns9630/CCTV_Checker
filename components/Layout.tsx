import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { cls } from "./utils";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col justify-between h-[100vh] w-[640px] text  bg-[#FEFDFF] text-[#191925] dark:bg-[#202020] dark:text-[#FDFDFE]">
        <header
          id="title"
          className="h-[100px] border-b-2 shadow-md
        flex justify-center items-center relative"
        >
          <h1 className="text-4xl font-bold font-serif">{props.title}</h1>
        </header>
        <div id="appPage" className="h-[80vh]">
          {props.children}
        </div>
        <div id="bottomBar" className=" h-[100px] border-t-4">
          <nav className="flex justify-between h-full">
            <Link href={"/timeline"}>
              <button
                className={cls(
                  "w-full flex justify-center items-center hover:bg-slate-300 py-4 px-5",
                  router.pathname === "/data" ? "sunmoon_btn" : " "
                )}
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <div>TIMELINE</div>
                </div>
              </button>
            </Link>
            <Link href={"/"}>
              <button
                className={cls(
                  "w-full flex justify-center items-center hover:bg-slate-300 py-4 px-5",
                  router.pathname === "/" ? "sunmoon_btn" : " "
                )}
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    />
                  </svg>

                  <div>CCTV MAP</div>
                </div>
              </button>
            </Link>
            <Link href={"/setting"}>
              {/* SETTING 버튼 */}
              <button
                className={cls(
                  "w-full flex justify-center items-center hover:bg-slate-300 py-4 px-5 ",
                  router.pathname === "/setting" ? "sunmoon_btn" : " "
                )}
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>SETTING</div>
                </div>
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
