import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$^{}[]()&*_-~?/|`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numAllow, charAllow, length]);

  return (
    <>
      <div className=" w-full h-screen p-10 text-center bg-gradient-to-br from-blue-950 to-purple-950  rounded-lg">
        <h1 className="text-4xl px-4 py-4 text-amber-200">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 items-center justify-center">
          <input
            type="text"
            value={password}
            className="w-xl h-12 text-black bg-amber-100 my-5 rounded-l-2xl p-3 text-2xl font-semibold"
            placeholder="Password"
            readOnly
          />
          <button className="h-12 bg-purple-200 text-black rounded-r-2xl">Copy</button>
        </div>
        
      </div>
    </>
  );
}

export default App;
