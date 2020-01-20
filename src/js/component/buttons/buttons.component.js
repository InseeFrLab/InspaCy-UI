import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faFileUpload, faSave } from "@fortawesome/free-solid-svg-icons";
import "./buttons.scss";
import ButtonFunctions from "./buttons.functions";

const Buttons = ({
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
  setEntityList
}) => {
  const keysFunction = event => {
    if (event.ctrlKey && event.keyCode === 13) {
      if (!Object.keys(resultValue).length)
        ButtonFunctions.launchProcess(
          setResultValue,
          entityList,
          textValue,
          setGraphData,
          selectedEntities,
          textRender,
          setTextRender,
          setEntityList
        );
    } else if (
      event.ctrlKey &&
      event.keyCode === 73 &&
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
            setEntityList
          )
        }
      >
        <FontAwesomeIcon icon={faCog} size="lg" />
        <span>Lancer le processus (ctrl + entrée)</span>
      </button>
      <button onClick={() => setShowModale(true)}>
        <FontAwesomeIcon icon={faFileUpload} size="lg" />
        <span>Charger un fichier (ctrl + i)</span>
      </button>
      <button onClick={() => ButtonFunctions.downloadFile()}>
        <FontAwesomeIcon icon={faSave} size="lg" />
        <span>Télécharger le fichier</span>
      </button>
    </div>
  );
};

export default Buttons;
