import { useState, useEffect } from "react";
import { FetchCall } from "./Fetch";
import "./Styles/index.css";
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from "prism-react-renderer/themes/nightOwl";

export default function App() {
  // Initialization of States
  const prevData = window.localStorage.getItem("storedData");
  const [data, setData] = useState(JSON.parse(prevData) || []);
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState("Davinci3");
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // When Generate Button is Pressed / Search is triggered
      if (search) {
        setLoading(true);
        const response = await FetchCall(query, engine);
        const cardData = [
          {
            input: query,
            output: response,
            engine: engine,
          },
          ...data,
        ];
        setData(cardData);
        window.localStorage.setItem("storedData", JSON.stringify(cardData));

        setLoading(false);
        setSearch(false);
      }
    };

    let timer = setTimeout(() => {
        fetchData();
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [search, data, query, engine]);

  return (
    <div className="main">
      {/* Left Side */}
      <div className="userInput">
        <header className="App-header">Fun With AI!</header>
        <textarea
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <br />
        <div className="selectEngine">
          Choose an Engine:
          <select
            name="engine"
            id="engine-select"
            required
            onClick={(event) => setEngine(event.target.value)}
          >
            <option value="Davinci3">Davinci3</option>
            <option value="Davinci">Davinci</option>
            <option value="Curie">Curie</option>
            <option value="Babbage">Babbage</option>
            <option value="Ada">Ada</option>
          </select>
        </div>
        <br />
        <button type="button" onClick={() => setSearch(true)}>
          Generate
        </button>
      </div>

      {/* Right Side */}
      <div className="response_cards">
        <h4>Here Are Your Reponses:</h4>

        {/* Show Loading Card when fetching data */}
        {loading && (
          <div className="card loading">
            <h1>Typing... </h1>
          </div>
        )}

        {/* Map each card and display info */}
        {data &&
          data.map((card, i) => (
            <div className="card" key={i}>
              <div className="row">
                <div className="cardtitle">Prompt:</div>
                <div className="cardtext">{card.input}</div>
              </div>
              <div className="row" style={{'flex-direction': 'column'}}>
                <div className="cardtitle">
                  Response: <br /> with {card.engine}
                </div>
                <Highlight {...defaultProps} theme={theme} code={card.output} language="jsx">
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={{...style, padding: '8px', 'white-space': 'pre-line'}}>
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
