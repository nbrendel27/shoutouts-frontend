import { useEffect, useState } from "react";
import { getTopFive } from "../services/shoutoutService";
import { Link } from "react-router-dom";
import TopFive from "../models/TopFive";

const TopFiveView = () => {
  const [topFive, setTopFive] = useState<TopFive[]>([]);
  useEffect(() => {
    getTopFive().then((res) => {
      console.log(res);
      setTopFive(res);
    });
  }, []);
  return (
    <main className="TopFiveView">
      <h2>Top 5 Recipients</h2>
      <ol>
        {topFive.map((so, index) => (
          <li key={index}>
            <h3>
              {so._id} ({so.count})
            </h3>
            <Link to={`/user/${encodeURIComponent(so._id)}`}>
              See {so._id}'s shoutouts
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
};

export default TopFiveView;
