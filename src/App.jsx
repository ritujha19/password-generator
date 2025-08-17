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
      <div className="w-full min-h-screen flex items-center justify-center px-2 sm:px-6 md:px-10 box-border overflow-x-hidden">
        <div
          className="w-full max-w-2xl p-4 sm:p-8 mx-auto bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-2xl shadow-lg"
          data-aos="zoom-out"
        >
          <div data-aos="fade-up" data-aos-delay="600">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center pb-4 text-white font-bold mb-4">
              Secure Forge
            </h1>

            {/* Password Display */}
            <div className="flex flex-col xs:flex-row w-full shadow border-2 border-gray-700 rounded-lg overflow-hidden mb-6">
  <input
    type="text"
    value={password}
    className="flex-1 h-12 text-black bg-amber-100 p-3 text-lg sm:text-xl md:text-2xl font-semibold focus:outline-none w-full"
    placeholder="Password"
    readOnly
  />

  {/* Buttons wrapper */}
  <div className="flex flex-col xs:flex-row w-full xs:w-auto">
    <button
      onClick={copyToClipboard}
      className="h-12 w-full xs:w-1/2 text-black bg-amber-100 hover:bg-amber-200 transition flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faCopy} />
    </button>
    <button
      onClick={handleClick}
      className="h-12 w-full xs:w-1/2 text-black bg-amber-100 hover:bg-amber-200 transition flex items-center justify-center"
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
</div>


            {/* Auto-generate on copy */}
            <div className="flex items-center gap-2 mb-6 justify-center text-xs sm:text-sm md:text-base">
              <input
                type="checkbox"
                checked={autoGenerateOnCopy}
                onChange={() => setAutoGenerateOnCopy((prev) => !prev)}
                className="h-4 w-4 sm:h-5 sm:w-5 rounded-md cursor-pointer"
                id="autoGenCopy"
              />
              <label htmlFor="autoGenCopy" className="text-white text-center">
                Generate new password after copying
              </label>
            </div>

            {/* Options */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-stretch">
              {/* Length Slider */}
              <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-1/2">
                <input
                  type="range"
                  min={8}
                  max={100}
                  className="w-full cursor-pointer"
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
              <div className="flex flex-col gap-3 text-xs sm:text-sm md:text-base items-start w-full md:w-1/2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={symAllow}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded"
                    id="symInput"
                    onChange={() => setsymAllow((prev) => !prev)}
                  />
                  <span className="text-white">Special Characters</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={lowCase}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded"
                    id="lowCaseInput"
                    onChange={() => setlowCase((prev) => !prev)}
                  />
                  <span className="text-gray-200">Lowercase Letters</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={upCase}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded"
                    id="upCaseInput"
                    onChange={() => setupCase((prev) => !prev)}
                  />
                  <span className="text-gray-200">Uppercase Letters</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={numAllow}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded"
                    id="numberInput"
                    onChange={() => setNumAllow((prev) => !prev)}
                  />
                  <span className="text-gray-200">Numbers</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white p-2 sm:p-3 rounded-lg shadow-lg transition-opacity duration-300 text-xs sm:text-sm md:text-base">
          Password copied!
        </div>
      )}
    </>
  );
}

export default App;
