import React, { useState, useReducer } from "react";

// ----------------------------------------------------------------

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// ----------------------------------------------------------------

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false }],
        todoCount: state.todoCount + 1,
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, idx) =>
          action.payload === idx
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        todoCount: state.todoCount,
      };
    default:
      return state;
  }
}

// ----------------------------------------------------------------

function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text,
  };
}

function toggleTodo(idx) {
  return {
    type: TOGGLE_TODO,
    payload: idx,
  };
}

// ----------------------------------------------------------------

const initialState = {
  todos: [],
  todoCount: 0,
};

// ----------------------------------------------------------------

function ReactUseReducer() {
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    // prevent page reload
    event.preventDefault();
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </form>
      <div>Current todo's: {todoCount}</div>
      <div>
        {todos.map((todo, idx) => (
          <div
            key={todo.text}
            onClick={() => dispatch(toggleTodo(idx))}
            style={{ textDecoration: todo.completed ? "line-trough" : "" }}
          >
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReactUseReducer;
