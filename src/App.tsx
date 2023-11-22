import React,{ Suspense, useEffect, useState } from 'react';
import Main from './pages/Main';
import Loading from './components/Loading';
// import routes from './routes';
import "./App.css"
import apiFun from './api';
import { useDispatch } from 'react-redux';
import { all } from './store/reducers/articleSlice';

const App:React.FC=()=>{
  const dispatch=useDispatch();
  // 解决页面在刷新时，有时会出现articleList是空数组的情况
  const [dataReady, setDataReady] = useState<boolean>(false); // 新增数据准备状态
  useEffect(()=>{
    /* // 判断当前token是否有效：
    const token=localStorage.getItem("token");
    if(token) {
      apiFun.LegalToken({token:token}).then((res:any)=>{
        if(res.code==='1111') {
          message.warning(res.msg);
          localStorage.removeItem("token");
          dispatch(changeIsVaild(0));
        }else {
          dispatch(changeIsVaild(1));
        }
      })
    } */
    // 获取文章列表
    apiFun.getBlogList({
      headers: {
        'Cache-Control': 'no-cache',
      }
    }).then((res:any)=>{
      console.log(1111111111);
      if(res.code==='0000') {
        dispatch(all(res.data));
        setDataReady(true); // 设置数据准备状态为 true
      }
    })
  },[])
  // 等待数据准备完成再进行渲染
  if (!dataReady) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading/>}>
      <Main></Main>
      {/* {element} */}
    </Suspense>
  )
}

export default App;
