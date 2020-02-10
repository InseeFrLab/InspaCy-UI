import React, { useState } from "react";
import { Editor, Modale, Buttons, Result } from "./js/component";
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const [showModale, setShowModale] = useState(false),
    [textValue, setTextValue] = useState(""),
    [resultValue, setResultValue] = useState({}),
    [textRender, setTextRender] = useState(""),
    [entityList, setEntityList] = useState({}),
    [selectedEntities, setSelectedEntities] = useState([]),
    [graphData, setGraphData] = useState([]),
    [serverError, setServerError] = useState(false),
    [translator] = useTranslation();

  return (
    <section className="App">
      <Editor
        translator={translator}
        textValue={textValue}
        setTextValue={setTextValue}
        serverError={serverError}
      />
      <Modale
        translator={translator}
        textValue={textValue}
        setText={setTextValue}
        showModale={showModale}
        setShowModale={setShowModale}
      />
      <Buttons
        translator={translator}
        setShowModale={setShowModale}
        showModale={showModale}
        setResultValue={setResultValue}
        entityList={entityList}
        resultValue={resultValue}
        textValue={textValue}
        setGraphData={setGraphData}
        selectedEntities={selectedEntities}
        textRender={textRender}
        setTextRender={setTextRender}
        setEntityList={setEntityList}
        setServerError={setServerError}
      />
      <Result
        translator={translator}
        graphData={graphData}
        resultValue={resultValue}
        textRender={textRender}
        setTextRender={setTextRender}
        entityList={entityList}
        setEntityList={setEntityList}
        selectedEntities={selectedEntities}
        setSelectedEntities={setSelectedEntities}
        setResultValue={setResultValue}
      />
      )}
    </section>
  );
}

export default App;
