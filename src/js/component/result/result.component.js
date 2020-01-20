import React, { useEffect } from "react";
import "./result.scss";
import ResultFunctions from "./result.functions";
import { Pie } from "react-chartjs-2";

const Result = ({
  graphData,
  resultValue,
  textRender,
  setTextRender,
  entityList,
  setEntityList,
  selectedEntities,
  setSelectedEntities
}) => {
  const selectEntity = entityId => {
    let newSelectedEntities = ResultFunctions.loadSelectedEntities(
      entityId,
      selectedEntities,
      setSelectedEntities
    );
    ResultFunctions.loadTextAndEntity(
      resultValue,
      newSelectedEntities,
      textRender,
      entityList,
      setTextRender,
      setEntityList,
      ResultFunctions.textRenderer
    );
  };
  const escFunction = event => {
    if (event.keyCode === 27) {
      alert("TODO : hide result panel..");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <section
      id="result"
      className={Object.keys(resultValue).length ? "show" : ""}
    >
      <div>
        <h1>Résultat du processus</h1>
        <div id="text-render">
          <h3>Rendu textuel</h3>
          <p dangerouslySetInnerHTML={{ __html: textRender }}></p>
        </div>
        <hr />
        <div id="entity-lister">
          <h3>Liste des entités rencontrées</h3>
          <div>
            {!Object.keys(resultValue).includes("ents") ||
            !resultValue.ents.length ? (
              <p style={{ fontStyle: "italic" }}>Aucune entité trouvée</p>
            ) : (
              Object.values(entityList).map((elem, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => selectEntity(elem["id"])}
                    className={
                      selectedEntities.includes(elem["id"]) ? "focus" : ""
                    }
                  >
                    {elem["value"]}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <hr />
        <div id="entity-proportion">
          <h3>Proportion des entités</h3>
          <div className="row">
            <p className="half">
              <span id="nb-entity">{Object.keys(entityList).length || 0}</span>
              <br />
              entités ont été trouvé
            </p>
            <p className="half">
              <span id="nb-entity">
                {resultValue.ents ? Object.keys(resultValue.ents).length : 0}
              </span>
              <br />
              occurences ont été trouvé
            </p>
          </div>
          {Object.keys(resultValue).includes("ents") &&
            resultValue.ents.length !== 0 && (
              <>
                <div className="half">
                  {Object.keys(entityList).length && (
                    <table>
                      <thead>
                        <tr>
                          <th>Label</th>
                          <th>Apparitions</th>
                          <th>Rang</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(entityList)
                          .sort((a, b) => b.nb - a.nb)
                          .map((entity, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entity.value}</td>
                                <td>{entity.nb}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="half">
                  {(graphData.length || Object.keys(graphData).length) && (
                    <Pie data={graphData}></Pie>
                  )}
                </div>
              </>
            )}
        </div>
      </div>
    </section>
  );
};

export default Result;
