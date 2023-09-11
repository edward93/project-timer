import "./styles/App.scss";
import Header from "./components/Layout/Header.Component";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <section className="screen-space">
        <Header />
        <div className="app-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default App;
