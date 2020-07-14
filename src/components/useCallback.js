import React, { useState, useRef, useCallback } from "react";

// custom hook
function useCountRenders() {
  const renders = useRef(0);
  console.log("renders: ", renders);
}

function Hello({ increment }) {
  useCountRenders();
  return <button onClick={() => increment(5)}>increment</button>;
}

// memo compares the props and if props changes, rerender the component
export const MemoizedHello = React.memo(Hello);

function Square({ number, increment }) {
  useCountRenders();
  return <button onClick={() => increment()}>{number}</button>;
}

// memo compares the props and if props changes, rerender the component
export const MemoizedSquare = React.memo(Square);

// prevent a function to be created on every single render
function ReactUseCallback() {
  const [count, setCount] = useState(0);

  // useful case
  const favNumbers = [2, 6, 8, 9];

  const increment = useCallback(
    (n) => {
      setCount((currentCount) => currentCount + n);
    },
    [setCount]
  );

  return (
    <div>
      {/* function is created on signle render*/}
      <MemoizedHello increment={increment} />
      <div>count: {count}</div>
      {favNumbers.map((number) => {
        return (
          <Square
            key={number}
            number={number}
            increment={() => increment(number)}
          />
        );
      })}
    </div>
  );
}

export default ReactUseCallback;
