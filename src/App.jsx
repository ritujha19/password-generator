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
      duration: 700,
      once: false,
      easing: "ease-out-cubic",
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 800);
    if (autoGenerateOnCopy) {
      passwordGenerator();
    }
  };

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
      <div className="w-full max-w-full box-border px-2 sm:px-6 md:px-10 overflow-x-auto min-h-screen flex items-center justify-center">
        <div
          className="w-full max-w-2xl mx-2 sm:mx-5 p-2 sm:p-8 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-2xl shadow-lg transition-all duration-300"
          data-aos="zoom-out"
        >
          <div data-aos="fade-up" data-aos-delay="600">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-4 text-white font-bold mb-4 px-2 sm:px-0">
              Secure Forge
            </h1>

            {/* Password Display */}
            <div className="flex flex-col md:flex-row flex-wrap w-full shadow border-2 border-gray-700 rounded-lg overflow-hidden mb-6 px-2 justify-center bg-opacity-90">
              <input
                type="text"
                value={password}
                className="flex-1 h-12 text-black bg-amber-100 p-2 sm:p-4 text-lg sm:text-2xl font-semibold md:rounded-l-2xl"
                placeholder="Password"
                readOnly
              />
              <button
                onClick={copyToClipboard}
                className="h-12 px-2 sm:px-6 text-black bg-amber-100 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                onClick={handleClick}
                className="h-12 px-2 sm:px-6 text-black bg-amber-100 flex items-center justify-center md:rounded-r-2xl"
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

            {/* Auto-generate on copy */}
            <div className="flex items-center gap-2 mb-6 justify-center text-sm sm:text-base px-2 sm:px-0">
              <input
                type="checkbox"
                checked={autoGenerateOnCopy}
                onChange={() => setAutoGenerateOnCopy((prev) => !prev)}
                className="h-4 w-4 sm:h-5 sm:w-5 rounded-md cursor-pointer mr-2"
                id="autoGenCopy"
              />
              <label htmlFor="autoGenCopy" className="text-white">
                Generate new password after copying
              </label>
            </div>

            {/* Options */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-stretch px-2 sm:px-0">
              {/* Length Slider */}
              <div className="flex flex-col items-center md:items-start gap-2 md:w-1/2">
                <input
                  type="range"
                  min={8}
                  max={100}
                  className="w-full md:w-64 cursor-pointer"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <label
                  htmlFor="length"
                  className="text-white text-sm sm:text-base"
                >
                  Length: {length}
                </label>
              </div>

              {/* Character Options */}
              <div className="flex flex-col gap-3 text-sm sm:text-base items-start md:w-1/2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={symAllow}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded mr-2"
                    id="symInput"
                    onChange={() => setsymAllow((prev) => !prev)}
                  />
                  <label htmlFor="symInput" className="text-white">
                    Special Characters
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={lowCase}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded mr-2"
                    id="lowCaseInput"
                    onChange={() => setlowCase((prev) => !prev)}
                  />
                  <label htmlFor="lowCaseInput" className="text-gray-200">
                    Lowercase Letters
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={upCase}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded mr-2"
                    id="upCaseInput"
                    onChange={() => setupCase((prev) => !prev)}
                  />
                  <label htmlFor="upCaseInput" className="text-gray-200">
                    Uppercase Letters
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={numAllow}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded mr-2"
                    id="numberInput"
                    onChange={() => setNumAllow((prev) => !prev)}
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

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg transition-opacity duration-300 text-sm sm:text-base">
          Password copied!
        </div>
      )}
    </>
  );
}

export default App;
