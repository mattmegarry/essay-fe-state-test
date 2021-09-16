import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import useMemoizedCallback from "./useMemoizedCallback";
import ContainerA from "./ContainerA";

function ProjectScreen() {
  const [annodes, setAnnodes] = useState({
    asdas1: { id: "asdas1", text: "Hello" },
    sdfsdgf2: { id: "sdfsdgf2", text: "Hello" },
    dwedyug3: { id: "dwedyug3", text: "Hello" },
    gffgbfg4: { id: "gffgbfg4", text: "Hello" },
  });
  const [timers, setTimers] = useState({});

  const updateAnnodeIsSaved = useCallback(
    (annodeId, isSavedInDatabase) => {
      setAnnodes((prevAnnodes) => {
        return {
          ...prevAnnodes,
          [annodeId]: {
            ...prevAnnodes[annodeId],
            unsavedChanges: !isSavedInDatabase,
          },
        };
      });
    },
    [setAnnodes]
  );

  const updateAnnodes = useMemoizedCallback(
    (operation, nextNotation, sectionId, annodeInSectionLexorank) => {
      cancellableCountDownSave(nextNotation.id, timers);
      switch (operation) {
        case "update":
          setAnnodes((prevNotations) => ({
            ...prevNotations,
            [nextNotation.id]: nextNotation,
          }));
          break;
        default:
          console.log("default");
      }
    },
    [setAnnodes, timers]
  );

  const cancellableCountDownSave = (annodeId, timers) => {
    const currentTimerIdForAnnode = timers[annodeId];
    clearTimeout(timers[annodeId]);
    if (!currentTimerIdForAnnode) {
      const newTimerId = setTimeout(async () => {
        console.log("Fresh save: " + annodeId);
        setTimers((prev) => ({ ...prev, [annodeId]: null }));
        clearTimeout(timers[annodeId]);
      }, 3000);
      setTimers((prev) => ({ ...prev, [annodeId]: newTimerId }));
    } else {
      const newTimerId = setTimeout(async () => {
        console.log("Replacement save: " + annodeId);
        setTimers((prev) => ({ ...prev, [annodeId]: null }));
        clearTimeout(timers[annodeId]);
      }, 3000);
      setTimers((prev) => ({ ...prev, [annodeId]: newTimerId }));
    }
  };

  useEffect(() => {
    return () => {
      console.log("Cleanup ran");
      Object.keys(timers).forEach((annodeId) => clearTimeout(timers[annodeId]));
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {Object.values(annodes).map((annode) => (
          <ContainerA
            key={annode.id}
            annode={annode}
            updateNotations={updateAnnodes}
            updateAnnodeIsSaved={updateAnnodeIsSaved}
          />
        ))}
      </header>
      <div></div>
    </div>
  );
}

export default ProjectScreen;
