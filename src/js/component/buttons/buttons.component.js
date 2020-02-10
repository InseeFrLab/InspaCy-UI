import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import "./buttons.scss";
import ButtonFunctions from "./buttons.functions";

const Buttons = ({
  translator,
  setShowModale,
  showModale,
  setResultValue,
  entityList,
  resultValue,
  textValue,
  setGraphData,
  selectedEntities,
  textRender,
  setTextRender,
  setEntityList,
  setServerError
}) => {
  const keysFunction = event => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      if (!Object.keys(resultValue).length)
        ButtonFunctions.launchProcess(
          setResultValue,
          entityList,
          textValue,
          setGraphData,
          selectedEntities,
          textRender,
          setTextRender,
          setEntityList,
          setServerError
        );
    } else if (
      (event.ctrlKey || event.metaKey) &&
      event.keyCode === 188 &&
      !Object.keys(resultValue).length
    ) {
      setShowModale(true);
    } else if (event.keyCode === 27 && showModale === true) {
      setShowModale(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keysFunction, false);

    return () => {
      document.removeEventListener("keydown", keysFunction, false);
    };
  });

  return (
    <div id="buttons">
      <button
        onClick={() =>
          ButtonFunctions.launchProcess(
            setResultValue,
            entityList,
            textValue,
            setGraphData,
            selectedEntities,
            textRender,
            setTextRender,
            setEntityList,
            setServerError
          )
        }
      >
        <FontAwesomeIcon icon={faPlay} size="lg" />
        <span>{translator("BUTTONS.PROCESS_LAUNCH")}</span>
      </button>
      <button onClick={() => setShowModale(true)}>
        <FontAwesomeIcon icon={faFileUpload} size="lg" />
        <span>{translator("BUTTONS.FILE_LOAD")}</span>
      </button>
    </div>
  );
};

export default Buttons;
