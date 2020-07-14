import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useForm from "./useState";

function ReactUseEffect1() {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
    name: "",
  });
  const { name, email, password } = values;

  useEffect(() => {
    console.log("render");

    return () => {
      // cleanup logic
      console.log("unmount");
    };
  }, [email, password]);

  // useEffect is having a dependency array where is re-renders
  // based on when value in dependency array changes (shallow comparison)
  // without the dependency array useEffect is renders just one time on mount

  return (
    <div>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
    </div>
  );
}

function ReactUseEffect2() {
  useEffect(() => {
    const onMouseMove = (event) => console.log(event);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div>
      <p>useEffect</p>
    </div>
  );
}

// more than one useEffect (fire up in order)
function ReactUseEffect3() {
  useEffect(() => {
    console.log("first");
  }, []);

  useEffect(() => {
    console.log("second");
  }, []);

  return (
    <div>
      <p>useEffect</p>
    </div>
  );
}

// ----------------------------------------------------------------

// fetch form API
const useFetch = (url) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: false });

  useEffect(() => {
    return () => {
      // called when component is going to unmount
      isCurrent.current = false;
    };
  });

  useEffect(() => {
    // smoother transition
    setState((state) => ({ data: state.data, loading: true }));

    fetch(url)
      .then((response) => {
        // api is not returning JSON, is returning text
        response.text();
      })
      .then((text) => {
        setTimeout(() => {
          // prevent setting the state when component is unmounted
          if (!isCurrent.current) {
            setState({ data: text, loading: false });
          }
        }, 2000);
      });
  }, [url, setState]);

  return state;
};

function ReactUseEffect4() {
  // useState is taking an initializer function
  const [count, setCount] = useState(() =>
    localStorage.getItem(JSON.parse("count"))
  );
  const { data, loading } = useFetch(`http://numbersapi.com/${count}/trivia`);
  const divRef = useRef();

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useLayoutEffect(() => {
    // getting the current size of the div based on the content (data)
    console.log(divRef.current.getBoundingClientRect());
  }, [data]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div ref={divRef}>{loading ? "Loading..." : data}</div>
      </div>

      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Next
      </button>
    </div>
  );
}

export {
  ReactUseEffect1,
  ReactUseEffect2,
  ReactUseEffect3,
  ReactUseEffect4,
  useFetch,
};
