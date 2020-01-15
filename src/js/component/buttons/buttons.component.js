import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faFileUpload, faSave } from "@fortawesome/free-solid-svg-icons";
import "./buttons.scss";
import ButtonFunctions from "./buttons.functions";

const Buttons = ({
  setShowModale,
  setResultValue,
  entityList,
  textValue,
  setGraphData,
  selectedEntities,
  textRender,
  setTextRender,
  setEntityList
}) => {
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
        <span>Lancer le processus</span>
      </button>
      <button onClick={() => setShowModale(true)}>
        <FontAwesomeIcon icon={faFileUpload} size="lg" />
        <span>Charger un fichier</span>
      </button>
      <button onClick={() => ButtonFunctions.downloadFile()}>
        <FontAwesomeIcon icon={faSave} size="lg" />
        <span>Télécharger le fichier</span>
      </button>
    </div>
  );
};

export default Buttons;
