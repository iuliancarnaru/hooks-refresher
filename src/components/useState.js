import React, { useState } from "react";

// function expensiveComputation() {
//   // nested loops or heavy calculation
//   return 10;
// }

function ReactUseState() {
  // default value can be a function (called only on initial render)
  // const [count, setCount] = useState(() => expensiveComputation());

  const [count, setCount] = useState(10);

  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}> + </button> */}

      {/* setCount can take a updater function (avoid race condition -> two updates in the same time)*/}
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        +
      </button>

      <div>{count}</div>
    </div>
  );
}

function ReactUseState2() {
  const [{ count1, count2 }, setCount] = useState({ count1: 5, count2: 10 });

  return (
    <div>
      <button
        onClick={() =>
          setCount((currentState) => ({
            ...currentState,
            count1: currentState.count1 + 1,
          }))
        }
      >
        +
      </button>

      <div>count 1:{count1}</div>
      <div>count 2:{count2}</div>
    </div>
  );
}

function ReactUseState3() {
  const [count1, setCount1] = useState(5);
  const [count2, setCount2] = useState(10);

  return (
    <div>
      <button
        onClick={() => {
          setCount1((currentCount1) => currentCount1 + 1);
          setCount2((currentCount2) => currentCount2 + 2);
        }}
      >
        +
      </button>
      <div>count 1:{count1}</div>
      <div>count 2:{count2}</div>
    </div>
  );
}

function ReactUseState4() {
  // controlled input where value is dynamic

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target)}
      />
    </div>
  );
}

// ----------------------------------------------------------------

// custom hook
function useForm(initalValues) {
  const [values, setValues] = useState(initalValues);

  return [
    values,
    (event) => {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    },
  ];
}

function ReactUseState5() {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const { email, password } = values;

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
      />
    </div>
  );
}

export {
  ReactUseState,
  ReactUseState2,
  ReactUseState3,
  ReactUseState4,
  ReactUseState5,
  useForm,
};
