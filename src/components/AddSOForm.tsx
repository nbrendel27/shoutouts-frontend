import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Shoutout from "../models/Shoutout";
import "./AddSOForm.css";
import UserContext from "../context/userContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  onAdd: (so: Shoutout) => void;
  toName: string | undefined;
}

const AddSOForm = ({ onAdd, toName }: Props) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const {user} = useContext(UserContext)
  const [firebasePhotoURL, setFirebasePhotoURL] = useState("")

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const newShoutout: Shoutout = {to, from, text};
    if(user?.photoURL) {
      newShoutout.userPhoto = user.photoURL;
    }

    const files = fileInputRef.current?.files;
    // console.log(files);
    if(files && files[0]) {
      const newImage = files[0]
      const storageRef = ref(storage, newImage.name);

      uploadBytes(storageRef, newImage).then(uploadRes => {
        getDownloadURL(uploadRes.ref).then((url) => {
          newShoutout.shoutoutImage = url;
        })
      })
    }
 
    onAdd(newShoutout);
    setTo("");
    setText("");
  };

  useEffect(() => {
    if(user) {
      setFrom(user.displayName ?? "");
    }else {
      setFrom("");
    }
    if (toName) {
      setTo(toName);
    } else {
      setTo("");
    }
  }, [toName, user]);
  return (
    <form className="AddSOForm" onSubmit={submitHandler} ref={formRef}>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={user?.displayName ? true : false}
      />
      <label htmlFor="text">Shout Out</label>
      <input
        type="text"
        name="text"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor="image">Add an image:</label>
      <input type="file" name="image" id="image" ref={fileInputRef} />
      <button>Submit Shout Out!</button>
    </form>
  );
};

export default AddSOForm;
