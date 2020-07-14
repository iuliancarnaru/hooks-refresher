import React, { useState, useMemo } from "react";
import { useFetch } from "./useEffect";

// if you are forced to useCallback (linting error) but you don't have any dependencies
// you cand exptract the function outside
function computeLongestWord(arr) {
  if (!arr) {
    return [];
  }

  console.log("computing longest word...");

  let longestWord = "";

  JSON.parse(arr).forEach((sentence) =>
    sentence.split(" ").forEach((word) => {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    })
  );

  return longestWord;
}

// optimize computed values
function ReactUseMemo() {
  const [count, setCount] = useState(0);
  const { data } = useFetch("https://api.kanye.rest/?format=text");

  const longestWord = useMemo(() => computeLongestWord(data), [data]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>increment count</button>
      <div>{longestWord}</div>
    </div>
  );
}

export default ReactUseMemo;
