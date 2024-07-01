import { useContext, useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import { deleteAShoutout, getMyShoutouts } from "../services/shoutoutService";
import ShoutoutRow from "./ShoutoutRow";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";


const MyShoutoutsRoute = () => {
  const [myShoutouts, setMyShoutouts] = useState<Shoutout[]>([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const updateShoutouts = () => {
    if (user && user.displayName) {
      getMyShoutouts(user.displayName).then((res) => {
        setMyShoutouts(res);
      });
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    setTimeout(() => {
        updateShoutouts();
    }, 1000);
  }, [user]);


  const deleteHandler = (id: string): void => {
    deleteAShoutout(id).then(() => {
      updateShoutouts();
    });
  };
  return (
    <main className="MyShoutoutsRoute">
      <h2>My Shoutouts</h2>
      <ul>
        {myShoutouts.map((so) => {
          return <ShoutoutRow shoutout={so} onDelete={deleteHandler} />;
        })}
      </ul>
    </main>
  );
};

export default MyShoutoutsRoute;
