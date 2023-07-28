import React from "react";
import { Link } from "react-router-dom";

const VisionHome: React.FC = () => {
  return (
    <div>
      <h2>Vision Component</h2>
      <nav>
        <ul>
          <li>
            <Link to="/vision">Overview</Link>
          </li>
          <li>
            <Link to="/vision/solarSystem">Solar System</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VisionHome;
