import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import MyHeader from "../../components/MyHeader";
import MyFooter from "../../components/MyFooter";
import routes from "../../routes";
import "./index.css"
const Home = () => {
  const element = useRoutes(routes);
  return (
    <div className="body">
      <Provider store={store}>
        <MyHeader />
        {element}
        <MyFooter />
      </Provider>
    </div>
  )
}
export default Home;