import React, { Suspense, useEffect, useState } from 'react';
import Main from './pages/Main';
import Loading from './components/Loading';
// import routes from './routes';
import "./App.css"
// import apiFun from './api';
import { useDispatch } from 'react-redux';
import { all } from './store/reducers/articleSlice';
import { getBlogList } from './services/Articles';

const App: React.FC = () => {
  const dispatch = useDispatch();
  // 解决页面在刷新时，有时会出现articleList是空数组的情况
  const [dataReady, setDataReady] = useState<boolean>(false); // 新增数据准备状态
  useEffect(() => {
    getBlogList({
      headers: {
        'Cache-Control': 'no-cache',
      }
    }).then(res => {
      dispatch(all(res.data));
      setDataReady(true); // 设置数据准备状态为 true
    })
  }, [])
  // 等待数据准备完成再进行渲染
  if (!dataReady) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Main></Main>
      {/* {element} */}
    </Suspense>
  )
}

export default App;
