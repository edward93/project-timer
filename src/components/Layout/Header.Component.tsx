import "../../styles/header.scss";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div className="app-header">
      <div className="header-left"></div>
      <div className="header-middle">
        <div className="header-name">
          <Link to={"/"}>
            <h1>Timer</h1>
          </Link>
        </div>
      </div>
      <div className="header-right"></div>
    </div>
  );
};

export default HeaderComponent;
