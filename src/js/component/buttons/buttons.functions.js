import ResultFunctions from "../result/result.functions";

const ButtonFunctions = {
  launchProcess: async (
    setResultValue,
    entityList,
    textValue,
    setGraphData,
    selectedEntities,
    textRender,
    setTextRender,
    setEntityList
  ) => {
    const url = process.env.REACT_APP_API_URL;
    if (!url) {
      throw new Error(
        "Needing REACT_APP_API_URL for knowing which is API's endpoint"
      );
    }
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: textValue
      })
    });
    const newResultValue = await response.json();
    setResultValue(newResultValue);
    const { newEntityList } = ResultFunctions.loadTextAndEntity(
      newResultValue,
      selectedEntities,
      textRender,
      entityList,
      setTextRender,
      setEntityList,
      ResultFunctions.textRenderer
    );
    if (
      Object.keys(newResultValue).includes("ents") &&
      newResultValue.ents.length
    ) {
      ResultFunctions.loadGraphData(newEntityList, setGraphData);
    }
  },

  downloadFile: () => {
    alert("downloadFile");
  }
};

export default ButtonFunctions;
