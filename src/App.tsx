import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { render } from "solid-js/web";

type ContextState = {
  count: number;
};

type ContextValue = [
  ContextState,
  {
    increment: () => void;
    decrement: () => void;
  }
];

const MyContext = createContext<ContextValue>();

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "[my app] useMyContext must be used in the MyContext scope"
    );
  }
  return context;
};

function App() {
  const [state, setState] = createStore<ContextState>({ count: 0 });
  const context: ContextValue = [
    state,
    {
      increment: () => {
        setState("count", (prev) => prev + 1);
      },
      decrement: () => {
        setState("count", (prev) => prev - 1);
      },
    },
  ];
  return (
    <MyContext.Provider value={context}>
      <main>
        <IncrementButton />
        {" " + state.count + " "}
        <DecrementButton />
      </main>
    </MyContext.Provider>
  );
}

function IncrementButton() {
  const [, { increment }] = useMyContext();

  return <button onClick={increment}>+</button>;
}

function DecrementButton() {
  const [, { decrement }] = useMyContext();

  return <button onClick={decrement}>-</button>;
}

export default App;
