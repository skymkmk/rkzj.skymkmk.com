import data from "../../data.json";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateCurrentIndex } from "../app/currentDataSlice";

const Sidebar = () => {
  const current = useAppSelector(state => state.currentData.currentIndex);
  const dispatch = useAppDispatch();
  const list = data.map((value, index) => (
    <div className={`p-2 ${index === current ? 'border-yellow-300 bg-yellow-50 border rounded' : ''}`}>
      <a
      key={uuidv4()}
      onClick={() => {
        dispatch(updateCurrentIndex(index));
      }}
      className={`block ${index === current ? 'text-yellow-900 no-underline' : ''}`}>
      {value.name}
    </a>
    </div>
  ));

  return <aside className="flex-grow hidden md:flex flex-col col-span-1 border border-slate-300 rounded p-2 mr-4 h-fit">{list}</aside>;
};

export default Sidebar;
