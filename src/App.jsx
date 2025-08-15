import { useState, useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(true);
  const [symAllow, setsymAllow] = useState(true);
  const [lowCase, setlowCase] = useState(true);
  const [upCase, setupCase] = useState(true);
  const [password, setPassword] = useState("");
  const [rotated, setRotated] = useState(false);
  const [showToast, setShowToast] = useState(false);
 const [autoGenerateOnCopy, setAutoGenerateOnCopy] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 700, // duration of animation in ms
      once: false, // only animate once
      easing: "ease-out-cubic", // easing type
    });
  }, []);


  // Copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setShowToast(true);
  setTimeout(() => setShowToast(false), 800); 
    if(autoGenerateOnCopy){
      passwordGenerator();
    }
  };

  // Toggle rotation by 90 degrees on each click
  const handleClick = () => {
    passwordGenerator();
    setRotated((prev) => !prev);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

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
      <div className="flex items-center justify-center my-10">
        <div
          className="w-4xl h-110 p-10 text-center bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800  rounded-4xl shadow-lg dark:shadow-xl transition-all duration-300"
          data-aos="zoom-out"
        >
          <div data-aos="fade-up" data-aos-delay="600">
            <h1 className="text-4xl pb-4 text-white font-bold mb-2">
              Secure Forge
            </h1>
            <div className="flex shadow border-2 border-gray-700 rounded-lg overflow-hidden mb-6 items-center justify-center">
              <input
                type="text"
                value={password}
                className="w-xl h-12 text-black bg-amber-100 dark:bg-amber-100 my-5 rounded-l-2xl p-3 text-2xl font-semibold"
                placeholder="Password"
                readOnly
              />
              <button
                onClick={copyToClipboard}
                className="h-12 text-black bg-amber-100 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                onClick={handleClick}
                className="h-12 text-black bg-amber-100 rounded-r-2xl"
              >
                <FontAwesomeIcon
                  icon={faRotate}
                  style={{
                    transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
            </div>
            <div className="flex items-center gap-1 mb-4 justify-center">
  <input
    type="checkbox"
    checked={autoGenerateOnCopy}
    onChange={() => setAutoGenerateOnCopy(prev => !prev)}
    className="h-5 w-5 rounded-md cursor-pointer"
    id="autoGenCopy"
  />
  <label htmlFor="autoGenCopy" className="text-white text-center pl-2">
    Generate new password after copying
  </label>
</div>

            <div className="flex gap-x-2 text-l flex-row justify-around items-center">
              <div className="flex items-center gap-1">
                <input
                  type="range"
                  min={8}
                  max={100}
                  className="w-80 cursor-pointer range range-warning"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label htmlFor="length" className="text-white">
                  Length: {length}
                </label>
              </div>
              <div
                className="flex gap-x-2 text-l flex-col justify-center"
              >
                <div className="flex items-center gap-1 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox  h-5 w-5 rounded-2xl"
                    defaultChecked={symAllow}
                    id="symInput"
                    onChange={() => {
                      setsymAllow((prev) => !prev);
                    }}
                  />
                  <label htmlFor="symInput" className="h-6 text-white">
                    Special Characters
                  </label>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <input
                    type="checkbox"
                    defaultChecked={lowCase}
                    className="checkbox checkbox-warning h-5 w-5 rounded-2xl"
                    id="lowCaseInput"
                    onChange={() => {
                      setlowCase((prev) => !prev);
                    }}
                  />
                  <label htmlFor="lowCaseInput" className="h-6 text-gray-200">
                    Lowercase Letters
                  </label>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <input
                    type="checkbox"
                    defaultChecked={upCase}
                    className="checkbox checkbox-warning h-5 w-5 rounded-2xl"
                    id="upCaseInput"
                    onChange={() => {
                      setupCase((prev) => !prev);
                    }}
                  />
                  <label htmlFor="upCaseInput" className="h-6 text-gray-200">
                    Uppercase Letters
                  </label>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <input
                    type="checkbox"
                    defaultChecked={numAllow}
                    className="checkbox checkbox-warning h-5 w-5 rounded-2xl"
                    id="numberInput"
                    onChange={() => {
                      setNumAllow((prev) => !prev);
                    }}
                  />
                  <label htmlFor="numberInput" className="text-gray-200">
                    Numbers
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
  <div className="fixed top-15 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 w-50 h-15 text-center ">
    Password copied!
  </div>
)}
    </>
  );
}

export default App;
