export const updateCoverLetter = (setCoverLetter, options = {}) => {
  setCoverLetter((prevState) => {
    const { field, value } = options;

    if (prevState.coverLetterData[field] === value) {
      return prevState;
    }

    return {
      ...prevState,
      coverLetterData: {
        ...prevState.coverLetterData,
        [field]: value,
      },
    };
  });
};
