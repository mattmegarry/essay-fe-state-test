import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import useMemoizedCallback from "./useMemoizedCallback";
import ContainerA from "./ContainerA";
import ProjectScreen from "./ProjectScreen";

function App() {
  const [showProject, setShowProject] = useState(true);

  return (
    <>
      <div onClick={() => setShowProject(false)}>CLICK FOR CLEANUP</div>
      {showProject ? <ProjectScreen /> : ""}
    </>
  );
}

export default App;
