import React, { useState, useRef } from "react";

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

export { ReactUseRef, Hello };
