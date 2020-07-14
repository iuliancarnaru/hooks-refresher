import React, { useState, useRef, useLayoutEffect } from "react";

function Hello() {
  const renders = useRef(0);

  console.log("Hello renders: ", renders);

  return <div>Hello</div>;
}

function ReactUseRef() {
  const [email, setEmail] = useState("");
  const [hello, setHello] = useState(true);

  // storing a reference to a node or react component
  const inputRef = useRef();

  // you can store a function in a reference
  const helloFunction = useRef(() => console.log("Hello"));

  useLayoutEffect(() => {
    // get measurements of a dom element
    console.log(inputRef.current.getBoundingClientRect());
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setHello(!hello)}>toggle</button>
        {hello && <Hello />}
      </div>
      <input
        type="text"
        ref={inputRef}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button
        onClick={() => {
          inputRef.current.focus();
          helloFunction.current();
        }}
      >
        Focus
      </button>
    </div>
  );
}
// ----------------------------------------------------------------

function useMeasures(dependencies = []) {
  const [rect, setRect] = useState({});
  const myRef = useRef();

  useLayoutEffect(() => {
    setRect(myRef.current.getBoundingClientRect());
  }, [dependencies]);

  return [rect, myRef];
}

export { ReactUseRef, Hello, useMeasures };
