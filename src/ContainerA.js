import React, { memo, useEffect, useRef, useState } from "react";
import annodeMatchesDbAnnode from "./annodeMatchesDbAnnode";
import { useUpdateEffect } from "react-use";

const ContainerA = ({ annode, updateNotations, updateAnnodeIsSaved }) => {
  const { id, text, unsavedChanges } = annode;
  const [isNewAnnode, setIsNewAnnode] = useState(false);
  const newSectionObj = false;

  useEffect(() => {
    if (!annode.createdAt) {
      setIsNewAnnode(true);
    }
  }, [annode.createdAt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateNotations("update", { ...annode, [name]: value });
    updateAnnodeIsSaved(annode.id, false);
  };

  const updateAnnodeInDatabase = async () => {
    // Remember that annodes are created locally from annodeFromSelection.js
    // Here old annodes can be updated (locally and DB)
    // ...and new annodes are 'updated' locally and 'created' in the DB
    const path = annode.createdAt ? "/annodes/update" : "/annodes/create";
    try {
      const res = { path }; /* await authRequest(path, "POST", {
        ...annode,
      }); */
      const { status, data } = res;
      if (status === 200) {
        if (annodeMatchesDbAnnode(annode, data)) {
          updateNotations("update", data);
          updateAnnodeIsSaved(annode.id, true);
        } else {
          // THIS IS NOT IN ORIGINAL!!!!!!!!!!!!!!!!
          updateAnnodeIsSaved(annode.id, true);
        }
      }
      //What if failure??
    } catch (err) {
      // bad times
      console.log(err);
    }
  };

  useUpdateEffect(() => {
    const timer = setTimeout(async () => {
      console.log(timer);
      /*       if (newSectionObj) {
        try {
          const res = {}; await authRequest(
            "/sections/create",
            "POST",
            newSectionObj
          );
          const { status, data } = res;
          if (status === 200) {
            console.log(data);
            // setSectionChangesPending? ...kinda thing
            // Set section to 'Saved' if / when we implement this functionality (as per annodes)
            await updateAnnodeInDatabase();
          }
        } catch (err) {
          console.log("Error creating Section");
          console.log(err);
        }
      } else { */
      await updateAnnodeInDatabase();
      /*      } */
    }, 3000);
    return () => clearTimeout(timer);
  }, [newSectionObj, isNewAnnode]);

  return (
    <form className="annotation-form">
      <div className="annotation-text-inputs-area">
        <div className="context-input-label">Nice Form</div>
        <textarea
          name="text"
          className="context-input annotation-text-input"
          type="textarea"
          value={text || ""}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default ContainerA;
