const annodeWithoutMetaData = (annode) => {
  const {
    updatedAt,
    createdAt,
    projectId,
    pdfId,
    userId,
    unsavedChanges,
    archived,
    archivedAt,
    ...withoutMeta
  } = annode;
  return withoutMeta;
};

export default annodeWithoutMetaData;
