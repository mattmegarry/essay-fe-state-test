import deepEqual from "deep-equal";
import annodeWithoutMetaData from "./annodeWithoutMetaData";

const annodeMatchesDbAnnode = (localAnnode, dbAnnode) => {
  const clientState = annodeWithoutMetaData(localAnnode);
  const databaseData = annodeWithoutMetaData(dbAnnode);

  if (deepEqual(clientState, databaseData)) {
    return true;
  } else {
    return false;
  }
};

export default annodeMatchesDbAnnode;
