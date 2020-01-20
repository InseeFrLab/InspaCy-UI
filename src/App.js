import React, { useState } from "react";
import "./App.css";
import { Editor, Modale, Buttons, Result } from "./js/component";

function App() {
  const [showModale, setShowModale] = useState(false),
    [textValue, setTextValue] = useState(""),
    [resultValue, setResultValue] = useState({}),
    [textRender, setTextRender] = useState(""),
    [entityList, setEntityList] = useState({}),
    [selectedEntities, setSelectedEntities] = useState([]),
    [graphData, setGraphData] = useState([]);

  return (
    <section className="App">
      <Editor textValue={textValue} setTextValue={setTextValue} />
      <Modale
        textValue={textValue}
        setText={setTextValue}
        showModale={showModale}
        setShowModale={setShowModale}
      />
      <Buttons
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
      />
      <Result
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
