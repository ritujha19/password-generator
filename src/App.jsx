import { useState, useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [symAllow, setsymAllow] = useState(false);
  const [lowCase, setlowCase] = useState(false);
  const [upCase, setupCase] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 700, // duration of animation in ms
      once: false, // only animate once
      easing: "ease-out-cubic", // easing type
    });
  }, []);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (symAllow) str += "!@#$^{}[]()&*_-~?/|`";
    if (lowCase) str += "abcdefghijklmnopqrstuvwxyz";
    if (upCase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numAllow, symAllow, length, lowCase, upCase]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, symAllow, lowCase, upCase, passwordGenerator]);

  return (
    <>
      <div className=" w-full h-screen p-10 text-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-950 rounded-lg">
        <h1 className="text-4xl px-4 py-4 text-amber-200" data-aos="flip-right">
          Password Generator
        </h1>
        <div
          className="flex shadow rounded-lg overflow-hidden mb-4 items-center justify-center"
          data-aos="flip-right"
        >
          <input
            type="text"
            value={password}
            className="w-xl h-12 text-black bg-amber-100 my-5 rounded-l-2xl p-3 text-2xl font-semibold"
            placeholder="Password"
            readOnly
          />
          <button className="h-12 bg-blue-600 text-white shrink-0 rounded-r-2xl text-2xl">
            Copy
          </button>
        </div>
        <div
          className="flex gap-x-2 text-l flex-col  justify-center"
          data-aos="flip-right"
        >
          <div className="flex items-center gap-1">
            <input
              type="range"
              min={8}
              max={100}
              className="w-80 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div
            className="flex gap-x-2 text-l flex-col  justify-center"
            data-aos="flip-right"
          >
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={symAllow}
                id="charInput"
                onChange={() => {
                  setsymAllow((prev) => !prev);
                }}
              />
              <label htmlFor="charAllow" className="h-6">
                Special Characters
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={lowCase}
                id="charInput"
                onChange={() => {
                  setlowCase((prev) => !prev);
                }}
              />
              <label htmlFor="lowCase" className="h-6">
                Lowercase Letters
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={upCase}
                id="charInput"
                onChange={() => {
                  setupCase((prev) => !prev);
                }}
              />
              <label htmlFor="upCase" className="h-6">
                Uppercase Letters
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={numAllow}
                id="numberInput"
                onChange={() => {
                  setNumAllow((prev) => !prev);
                }}
                className="h-6"
              />
              <label htmlFor="numAllow">Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
