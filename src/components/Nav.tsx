import { useEffect, useState } from "react";
import data from "../../data.json";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateCurrentIndex } from "../app/currentDataSlice";

const Nav = () => {
  const [showLink, setShowLink] = useState(false);
  const currentIndex = useAppSelector(state => state.currentData.currentIndex);
  const [current, setCurrent] = useState("请选择模型");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentIndex !== -1) {
      setCurrent(data[currentIndex].name);
    } else if (currentIndex === -1) {
      setCurrent("请选择模型");
    }
  }, [currentIndex]);
  const list = data.map((value, index) => (
    <a
      key={uuidv4()}
      onClick={() => {
        setShowLink(!showLink);
        setCurrent(value.name);
        dispatch(updateCurrentIndex(index));
      }}
      className="block py-4">
      {value.name}
    </a>
  ));
  return (
    <>
      <nav className="md:hidden p-4 flex items-center bg-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2" onClick={() => setShowLink(!showLink)}>
          <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
        {current}
      </nav>
      <div className="relative">
        <div className={`md:hidden absolute h-96 overflow-auto top-px px-4 border-b w-full divide-y transition ${showLink ? "" : "-translate-y-full"} bg-white -z-10 duration-300`}>{list}</div>
      </div>
    </>
  );
};

export default Nav;
