import React, { useState, useEffect } from "react";
import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { Typewriter } from "react-simple-typewriter";
import Countdown from "react-countdown";

function App() {
  const [userName, setUserName] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userAge, setUserAge] = useState("");

  const particleInitialization = async (engine) => {
    await loadFireworksPreset(engine);
  };

  useEffect(() => {
    // Calculate user's age based on the provided birthday
    if (userBirthday) {
      const birthDate = new Date(userBirthday);
      const nowDate = new Date();
      const age = nowDate.getFullYear() - birthDate.getFullYear();
      setUserAge(age);
    }
  }, [userBirthday]);

  const timeLeft = () => {
    if (userBirthday) {
      const birthDate = new Date(`${userBirthday}T00:00:00`).getTime();
      const nowDate = new Date().getTime();
      const remainingTime = birthDate - nowDate;
      return remainingTime > 0 ? remainingTime : 0;
    }
    return 0;
  };

  return (
    <>
      <Particles
        init={particleInitialization}
        options={{ preset: "fireworks" }}
      />

      <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-black">
        <form className="bg-white bg-opacity-20 p-6 rounded-md shadow-md backdrop-blur-md">
          <label className="block text-white">
            <span className="text-lg font-semibold">Name:</span>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-2 block w-full focus:rounded-md border-b border-blue-300 focus:border-none bg-transparent focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
          <br />
          <label className="block text-white">
            <span className="text-lg font-semibold">Birthday:</span>
            <input
              type="date"
              value={userBirthday}
              onChange={(e) => setUserBirthday(e.target.value)}
              className="mt-1 p-2 block w-full focus:rounded-md border-b border-blue-300 bg-transparent focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
          <br />
          <label className="block text-white">
            <span className="text-lg font-semibold">Age (Later):</span>
            <input
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              className="mt-1 p-2 block w-full focus:rounded-md border-b border-blue-300 bg-transparent focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
        </form>

        <span className="text-white text-4xl font-bold px-4 z-50 text-center">
          <Typewriter
            words={[
              `${userName}'s Birthday Countdown`,
              `Bye ${userAge - 1}`,
              `Hello ${userAge}!`,
            ]}
            loop={false}
            cursorStyle={"✨"}
            cursor
          />
        </span>
        <div className="z-50 text-white font-bold text-2xl text-center">
          <Countdown
            date={Date.now() + timeLeft()}
            onComplete={() =>
              console.log(`Happy ${userAge}th Birthday, ${userName}!`)
            }
          />
        </div>
      </div>
    </>
  );
}

export default App;
