import { useEffect, useState } from "react";
import "./App.css";
import Key from "./components/Key/Key";

function App() {
  const [display, setDisplay] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);

  const handleKeyClick = (value: string) => {
    if (display === "0" && value !== ".") {
      setDisplay(value);
      return;
    }
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const computeValues = () => {
    try {
      const operation = display;
      const result = eval(display).toString();
      const newHistory = [...history, operation + "=" + result];
      setDisplay(result);
      setHistory(newHistory);
      saveHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    } catch (error) {
      setDisplay("Erro");
    }
  };

  const saveHistory = (history: string[]) => {
    localStorage.setItem("history", JSON.stringify(history));
  };

  const handleDelete = (index: number) => {
    let actualHistory = [...history];
    actualHistory.splice(index, 1);
    setHistory(actualHistory);
    saveHistory(actualHistory);
  };

  useEffect(() => {
    console.log(history);
  }, [history]);

  useEffect(() => {
    const storage = localStorage.getItem("history");
    if (storage) {
      const parsedLocal = JSON.parse(storage);
      setHistory(parsedLocal);
    }
  }, []);

  return (
    <div className="items-center justify-center flex w-screen h-screen">
      <div className="flex flex-col w-64 h-fit items-center justify-center bg-[#2a2a2a] p-6 rounded-xl">
        <div className="flex h-14 bg-white w-56 justify-end items-end p-2">
          <p className="text-2xl font-semibold">{display}</p>
        </div>
        <div className="w-56 bg-zinc-500 justify-center grid grid-cols-4 grid-rows-1">
          <div className="w-full justify-center flex col-span-3">
            <Key
              value="AC"
              onClick={() => {
                setDisplay("0");
              }}
            />
          </div>
          <div className="">
            <Key value="/" onClick={handleKeyClick} backgroundColor="bg-orange-500" />
          </div>
        </div>
        <div className=" w-56 grid grid-flow-col grid-rows-3 grid-cols-4">
          <Key value="1" onClick={handleKeyClick} />
          <Key value="2" onClick={handleKeyClick} />
          <Key value="3" onClick={handleKeyClick} />
          <Key value="4" onClick={handleKeyClick} />
          <Key value="5" onClick={handleKeyClick} />
          <Key value="6" onClick={handleKeyClick} />
          <Key value="7" onClick={handleKeyClick} />
          <Key value="8" onClick={handleKeyClick} />
          <Key value="9" onClick={handleKeyClick} />
          <Key value="*" onClick={handleKeyClick} backgroundColor="bg-orange-500" />
          <Key value="-" onClick={handleKeyClick} backgroundColor="bg-orange-500" />
          <Key value="+" onClick={handleKeyClick} backgroundColor="bg-orange-500" />
        </div>
        <div className="w-56 grid grid-flow-col grid-rows-1 grid-cols-4">
          <div className=" flex justify-center col-span-2">
            <Key value="0" onClick={handleKeyClick} />
          </div>
          <div className="col-span-1">
            <Key value="." onClick={handleKeyClick} />
          </div>
          <div className="col-span-1">
            <Key value="=" onClick={computeValues} backgroundColor="bg-orange-500"/>
          </div>
        </div>
      </div>
      <div className="ml-10 flex flex-col gap-3 items-center w-1/5 bg-zinc-300 rounded-xl py-3">
        <h1>Histórico:</h1>
        <ul className="w-full flex flex-col px-5 gap-1">
          {history.map((item, index) => (
            <div key={index} className="flex justify-between">
              <li>{item}</li>
              <button
              className="bg-red-500 text-white rounded-md p-1"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                DELETE
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
