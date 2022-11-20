import { useEffect, useState } from "react";
import { updateCurrentIndex } from "../app/currentDataSlice";
import { useAppDispatch } from "../app/hooks";
import "./Header.scss";
import Nav from "./Nav";

const Header = () => {
  const [navOption, setNavOption] = useState(false);
  const [optionBgAnimation, setOptionBgAnimation] = useState("");
  const [optionDisplay, setOptionDisplay] = useState("hidden");
  const appDispatch = useAppDispatch();
  useEffect(() => {
    if (navOption) setOptionDisplay("");
    else {
      setOptionBgAnimation("");
    }
    setTimeout(
      () => {
        if (navOption) {
          setOptionBgAnimation("backdrop-blur");
        } else setOptionDisplay("hidden");
      },
      navOption ? 10 : 350
    );
  }, [navOption]);
  return (
    <header className="sticky top-0 border-b z-10">
      <nav className="bg-white p-4 font-noto font-bold border-b md:border-none">
        <div className="container mx-auto flex justify-between items-center">
          <span
            className="flex items-center hover:cursor-pointer"
            onClick={() => {
              appDispatch(updateCurrentIndex(-1));
            }}>
            <span className="h-8 w-8 avatar inline-block mr-2 rounded shadow"></span>
            <span className="text-2xl select-none">根瘤菌rkzj</span>
          </span>
          <span>
            <ul className="md:flex gap-3 hidden">
              <li>
                <a href="https://space.bilibili.com/23315579" target="_blank" rel="noopener noreferrer">
                  bilibili
                </a>
              </li>
              <li>
                <a href="https://steamcommunity.com/id/skymkmk/myworkshopfiles/?appid=431960" target="_blank" rel="noopener noreferrer">
                  Wallpaper Engine 创意工坊
                </a>
              </li>
              <li>
                <a href="https://steamcommunity.com/id/skymkmk/myworkshopfiles/?appid=616720" target="_blank" rel="noopener noreferrer">
                  Live2DViewerEX 创意工坊
                </a>
              </li>
            </ul>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:hidden w-6 h-6 " onClick={() => setNavOption(!navOption)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
      </nav>
      <div className={`md:hidden h-screen w-screen fixed top-0 right-0 p-2 transition ${optionDisplay} ${optionBgAnimation} duration-300`} onClick={() => setNavOption(!navOption)}></div>
      <div className={`fixed md:hidden ${navOption ? null : "scale-0"} right-2 top-2 transition origin-top-right duration-300`}>
        <div className="flex w-fit bg-white float-right border px-4 py-2 rounded shadow-sm">
          <ul>
            <li className="h-12 flex items-center">
              <a href="https://space.bilibili.com/23315579" target="_blank" rel="noopener noreferrer" className="text-slate-500 font-medium text-lg leading-loose no-underline" onClick={() => setNavOption(!navOption)}>
                bilibili
              </a>
            </li>
            <li className="h-12 flex items-center">
              <a href="https://steamcommunity.com/id/skymkmk/myworkshopfiles/?appid=431960" target="_blank" rel="noopener noreferrer" className="text-slate-500 font-medium text-lg leading-loose no-underline" onClick={() => setNavOption(!navOption)}>
                Wallpaper Engine 创意工坊
              </a>
            </li>
            <li className="h-12 flex items-center">
              <a href="https://steamcommunity.com/id/skymkmk/myworkshopfiles/?appid=616720" target="_blank" rel="noopener noreferrer" className="text-slate-500 font-medium text-lg leading-loose no-underline" onClick={() => setNavOption(!navOption)}>
                Live2DViewerEX 创意工坊
              </a>
            </li>
          </ul>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2 ml-6" onClick={() => setNavOption(!navOption)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <Nav></Nav>
    </header>
  );
};

export default Header;
