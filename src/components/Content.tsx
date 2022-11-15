import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import axios from "axios";
import data from "../../data.json";
import Ads from "./Ads";

const Content = () => {
  const currentIndex = useAppSelector(state => state.currentData.currentIndex);
  const [imgURL, setImgURL] = useState("图片加载中");
  const [content, setContent] = useState(
    <>
      <p>欢迎来到根瘤菌rkzj的主页！请点击左方导航栏（电脑端）或左上角按钮（手机端）来访问你想下载的模型。</p>
      <div className="w-full p-2 bg-cyan-100 mt-4 border border-cyan-500 rounded text-cyan-900 mb-4">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <h1>全新升级！</h1>
        </div>
        <p>下载网站焕然一新，光彩重生！感谢您对根瘤菌rkzj的厚爱与支持！</p>
      </div>
    </>
  );
  useEffect(() => {
    if (currentIndex !== -1) {
      setImgURL("图片加载中");
      axios
        .get(`https://api.skymkmk.com/bilibili/x/web-interface/view?bvid=${data[currentIndex].BV}`)
        .then(response => {
          setImgURL(response.data.data.pic);
        })
        .catch(() => {
          setImgURL("图片加载失败");
        });
    }
  }, [currentIndex]);
  useEffect(() => {
    if (currentIndex !== -1) {
      const result = /^(https?:\/\/i[0-9]\.hdslb\.com\/)(.*)/.exec(imgURL);
      const url = result !== null ? result[2] : null;
      if (url === "null" || url === "undefined" || url === null) setImgURL("图片加载中");
      setContent(
        <article className="mb-4">
          {imgURL !== "图片加载中" && imgURL !== "图片加载失败" ? (
            <img src={`https://api.skymkmk.com/hdslb/${url}`} alt={`${data[currentIndex].name}`} className="rounded-md shadow-md mb-2"></img>
          ) : (
            <div className="relative mb-2 w-full h-0 pb-[56.25%] bg-slate-100 border border-slate-300 rounded text-slate-500 -z-10">
              <div className="w-full h-full absolute flex justify-center items-center top-0">{imgURL}</div>
            </div>
          )}
          <h1 className="text-2xl font-bold">{data[currentIndex].name}</h1>
          <a href={`https://www.bilibili.com/${data[currentIndex].BV}`} target="_blank" rel="noopener noreferrer" className="mr-2">
            视频链接
          </a>
          <a href={`${data[currentIndex].downloadURL}`} target="_blank" rel="noopener noreferrer">
            下载地址
          </a>
          {data[currentIndex].notice !== undefined ? (
            <div className="w-full p-2 bg-lime-100 mt-4 border border-lime-500 rounded text-lime-900">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                </svg>
                <h1>提示</h1>
              </div>
              <p>{data[currentIndex].notice}</p>
            </div>
          ) : null}
        </article>
      );
    }
  }, [currentIndex, imgURL]);
  return (
    <div className="col-span-2 lg:col-span-3 2xl:col-span-4 xl:mr-4">
      <div className="text-red-900 border border-red-500 rounded bg-red-100 p-2 mb-4">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h1>警告</h1>
        </div>
        <p>请遵循根瘤菌rkzj的声明许可，严禁将模型用于用于商业盈利用途、直播、二次传播、修改作者信息重发布。</p>
      </div>
        {content}
        <Ads classnames="xl:hidden block"></Ads>
    </div>
  );
};

export default Content;
