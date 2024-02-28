export const sliceArray = (inputArray: any[], elementsPerGroup: number) => {
  const resultArray = [];

  for (let i = 0; i < inputArray.length; i += elementsPerGroup) {
    const subArray = inputArray.slice(i, i + elementsPerGroup);
    resultArray.push(subArray);
  }

  return resultArray;
};
