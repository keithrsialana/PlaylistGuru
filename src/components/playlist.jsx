import React from "react";
import { useContext } from "react";
import {AppContext} from "../context/appContext";

export default function Playlist() {
    const { sharedData, setSharedData } = useContext(AppContext);

  return (
    <div className="playlist">
      <h1>Your playlist</h1>
      <p>Here's what I cooked up for you:</p>
      <br />
      {sharedData}
      <br />
    </div>
  );
}
