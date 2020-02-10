import React, { useEffect, useState } from "react";
import "./result.scss";
import ResultFunctions from "./result.functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faFlag,
  faSmileBeam,
  faFrown,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

const Result = ({
  graphData,
  resultValue,
  textRender,
  setTextRender,
  entityList,
  setEntityList,
  selectedEntities,
  setSelectedEntities,
  setResultValue
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
  const sendFeedback = ResultFunctions.sendFeedback;
  const escFunction = event => {
    if (event.keyCode === 27 && Object.keys(resultValue).length) {
      setResultValue({});
      setEntityList({});
    }
  };

  const [showFeedbackModale, setShowFeedbackModale] = useState(false),
    [badFeedback, setBadFeedback] = useState(false),
    [goodFeedback, setGoodFeedback] = useState(false),
    [sending, setSending] = useState(false),
    [userName, setUserName] = useState(""),
    [feedBackText, setFeedBackText] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

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
          {!sending && (
            <button onClick={() => setShowFeedbackModale(true)}>
              <FontAwesomeIcon icon={faFlag} size="lg" />
            </button>
          )}
        </div>
        <hr />
        <div id="entity-lister">
          <h3>Liste des concepts rencontrés</h3>
          <div>
            {!Object.keys(resultValue).includes("ents") ||
            !resultValue.ents.length ? (
              <p style={{ fontStyle: "italic", color: "#C5C5C5" }}>
                Aucune entité trouvée
              </p>
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
              concepts ont été trouvé
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
                <div>
                  {Object.keys(entityList).length && (
                    <table>
                      <thead>
                        <tr>
                          <th>Rang</th>
                          <th>Label</th>
                          <th>Apparitions</th>
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
                <div>
                  <h3>Visualisation</h3>
                  {(graphData.length || Object.keys(graphData).length) && (
                    <Pie
                      data={graphData}
                      options={{
                        legend: {
                          position: "left"
                        },
                        tooltips: {
                          callbacks: {
                            afterLabel: function(tooltipItem, data) {
                              var dataset = data["datasets"][0];
                              var percent = Math.round(
                                (dataset["data"][tooltipItem["index"]] /
                                  dataset["_meta"][0]["total"]) *
                                  100
                              );
                              return "(" + percent + "%)";
                            }
                          }
                        }
                      }}
                    ></Pie>
                  )}
                </div>
              </>
            )}
        </div>
        <button id="leave-button" onClick={() => setResultValue({})}>
          Esc <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
      </div>
      <div id="feedback-section" className={showFeedbackModale ? "shown" : ""}>
        <div
          id="feedback-overlay"
          onClick={() => {
            setShowFeedbackModale(false);
            setSending(false);
          }}
        ></div>
        <div id="feedback-modale">
          <h2>Votre avis compte</h2>
          <input
            type="text"
            value={userName}
            placeholder="Nom et prénom"
            onChange={event => setUserName(event.target.value)}
          />
          <h4>Comment évaluez-vous ce résultat ?</h4>
          <div id="modale-btns">
            <button
              onClick={() => {
                setGoodFeedback(true);
                setBadFeedback(false);
              }}
              className={goodFeedback ? "chosen" : ""}
            >
              <FontAwesomeIcon icon={faSmileBeam} size="lg" />
            </button>
            <button
              onClick={() => {
                setBadFeedback(true);
                setGoodFeedback(false);
              }}
              className={badFeedback ? "chosen" : ""}
            >
              <FontAwesomeIcon icon={faFrown} size="lg" />
            </button>
          </div>
          {badFeedback && (
            <textarea
              placeholder="Votre retour"
              onChange={event => setFeedBackText(event.target.value)}
            ></textarea>
          )}
          <button
            onClick={() =>
              sendFeedback(
                { goodFeedback, badFeedback, feedBackText, userName },
                setShowFeedbackModale,
                setSending
              )
            }
            disabled={
              !(
                ((badFeedback && feedBackText !== "") || goodFeedback) &&
                userName !== ""
              )
            }
          >
            Envoyer
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="lg"
              className={sending ? "sending" : ""}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Result;
