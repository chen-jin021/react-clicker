// note these uses es6 rather than other regular require()
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*
we want:
1. multiple clickers
2. keep track of last box clicked
3. all housed in its own app w/ multiple components
*/
//App is the parent component that controls the Clicker components
const App = (props) => {
  //an array of counters for each clicker: initialized to all 0s
  const [counters, setCounters] = useState(new Array(4).fill(0));
  const [lastClicked, setLastClicked] = useState(-1);

  function handleClick(i, evt) {
    console.log("clicked");
    setCounters((oldCounters) => {
      //make a copy
      const copy = oldCounters.slice();
      copy[i] = copy[i] + 1;
      return copy;
    });

    //set the last clicked element to the key of the last clicked element
    setLastClicked(i);
  }

  const allClickers = counters.map((val, i) => {
    return (
      <Clicker handleClick={(evt) => handleClick(i, evt)} key={i} val={val} />
    );
  });
  return (
    //here we return an array of ReactElement Clickers
    <div>
      {allClickers}
      <LastClicked val={lastClicked} />
    </div>
  );
};

const LastClicked = (props) => <h1>{props.val}</h1>;

/*
with multiple components, the parent will have all state
push pieces of data down to children (its own state) via props
*/
function Clicker(props) {
  return (
    <div onClick={props.handleClick} className="clicker">
      {props.val}
    </div>
  );
}

ReactDOM.render(
  //here we define attributes so it could be used as props
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
