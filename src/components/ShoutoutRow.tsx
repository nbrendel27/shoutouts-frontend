import "./ShoutoutRow.css";

import Shoutout from "../models/Shoutout";
import { Link } from "react-router-dom";

interface Props {
  shoutout: Shoutout;
  onDelete: (id: string) => void;
}

const ShoutoutRow = ({ shoutout, onDelete }: Props) => {
  return (
    <li className="ShoutoutRow">
      <div>
        <p className="to">
          Shout out to{" "}
          <Link to={`/user/${encodeURIComponent(shoutout.to)}`}>
            {shoutout.to}
          </Link>
        </p>
        <p>
          — from{" "}
          {shoutout.userPhoto && (
            <img src={shoutout.userPhoto} alt={shoutout.from} className="user-photo"/>
          )}
          <Link to={`/user/${encodeURIComponent(shoutout.from)}`}>
            {shoutout.from}
          </Link>
        </p>
        <p className="message">"{shoutout.text}"</p>
      </div>
      <i
        onClick={() => onDelete(shoutout._id!)}
        className="fa-solid fa-trash"
      ></i>
    </li>
  );
};

export default ShoutoutRow;
