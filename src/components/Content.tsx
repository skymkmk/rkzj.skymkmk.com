import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import axios from "axios";
import data from "../../data.json";
import Ads from "./Ads";
import Notice from "./Notice";

interface downloadURL {
  name: string;
  URL: string;
}

const Content = () => {
  const currentIndex = useAppSelector(state => state.currentData.currentIndex);
  const [imgURL, setImgURL] = useState("图片加载中");
  const defaultContent = (
    <>
      <p className="mb-4">
        欢迎来到根瘤菌rkzj的主页！请点击<span className="hidden md:inline">左方侧边栏</span>
        <span className="md:hidden">左上角按钮</span>来访问你想下载的模型。
      </p>
      <Notice
        color="notice-cyan"
        title="全新升级！"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        }>
        下载网站焕然一新，光彩重生！感谢您对根瘤菌rkzj的厚爱与支持！
      </Notice>
    </>
  );
  const [content, setContent] = useState(defaultContent);
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
    } else if (currentIndex === -1) setContent(defaultContent);
  }, [currentIndex]);
  useEffect(() => {
    if (currentIndex !== -1) {
      const result = /^(https?:\/\/i[0-9]\.hdslb\.com\/)(.*)/.exec(imgURL);
      const url = result !== null ? result[2] : null;
      setContent(
        <article className="mb-4">
          <Notice
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
              </svg>
            }
            title="关于下载链接风险提示"
            color="notice-yellow">
            部分浏览器（如华为浏览器）对我们的下载服务提供商蓝奏云进行了风险提示。我们近两年来一直使用蓝奏云进行模型分发，未见蓝奏云有爆出流氓行为，如不放心请停止下载。
          </Notice>

          {imgURL !== "图片加载中" && imgURL !== "图片加载失败" ? (
            <img src={`https://api.skymkmk.com/hdslb/${url}`} alt={`${data[currentIndex].name}`} className="rounded-md shadow-md mb-2"></img>
          ) : (
            <div className="relative mb-2 w-full h-0 pb-[56.25%] bg-slate-100 border border-slate-300 rounded text-slate-500 -z-10">
              <div className="w-full h-full absolute flex justify-center items-center top-0">{imgURL}</div>
            </div>
          )}
          <h1 className="text-2xl font-bold">{data[currentIndex].name}</h1>
          <div className="mb-2">
            <a href={`https://www.bilibili.com/${data[currentIndex].BV}`} target="_blank" rel="noopener noreferrer" className="mr-2">
              视频链接
            </a>
            {data[currentIndex].downloadURL instanceof Array ? (
              (data[currentIndex].downloadURL as Array<downloadURL>).map(value => {
                return (
                  <a href={`${value.URL}`} className="mr-2 inline-block" target="_blank" rel="noopener noreferrer">
                    {value.name}
                  </a>
                );
              })
            ) : (
              <a href={`${data[currentIndex].downloadURL}`} target="_blank" rel="noopener noreferrer">
                下载地址
              </a>
            )}
          </div>
          {data[currentIndex].notice !== undefined ? (
            <Notice
              color="notice-lime"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                </svg>
              }
              title="提示">
              {data[currentIndex].notice}
            </Notice>
          ) : null}
          <Notice
            title="没有 Live2DViewerEX Android？"
            color="notice-fuchsia"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            }>
            <>
              您可以前往{" "}
              <a href="https://live2d.pavostudio.com/doc/zh-cn/android/" target="_blank" rel="noopener noreferrer">
                Live2DViewerEX 官方
              </a>{" "}
              进行下载。由于该网站服务器位于国外，您可能需要能够访问国际互联网才可进行下载。
            </>
          </Notice>
        </article>
      );
    }
  }, [currentIndex, imgURL]);
  return (
    <div className="col-span-2 lg:col-span-3 2xl:col-span-4 xl:mr-4">
      <Notice
        title="警告"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        }
        color="notice-red">
        请遵循根瘤菌rkzj的声明许可，严禁将模型用于商业盈利用途、直播、二次传播、修改作者信息重发布，另有声明的除外。
      </Notice>
      {content}
      <Ads classnames="xl:hidden block"></Ads>
    </div>
  );
};

export default Content;
