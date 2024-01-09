import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { loadConfettiPreset } from 'tsparticles-preset-confetti';
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import Countdown from "react-countdown";

function App() {
  const [birthdayMessage, setBirthdayMessage] = useState([
    "Darrell's Birthday Countdown",
    "Bye 19",
    "Hello 20!",
  ]);

  const particleInitialization = async (engine) => {
    await loadConfettiPreset(engine);
    await loadFireworksPreset(engine);
  };

  function timeLeft() {
    const birthDate = new Date("February 14, 2024 00:00:00").getTime();
    const nowDate = new Date().getTime();
    const remainingTime = birthDate - nowDate;
    return remainingTime;
  }

  return (
    <>
      <Particles
        init={particleInitialization}
        options={{ preset: "fireworks" }}
      />
      
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-black">
        <span className="text-white text-4xl font-bold px-4 z-50">
          <Typewriter
            words={birthdayMessage}
            loop={false}
            cursorStyle={"✨"}
            cursor
          />
        </span>
        <div className="z-50 text-white font-bold text-2xl">
          <Countdown
            date={Date.now() + timeLeft()}
            onComplete={() =>
              setBirthdayMessage([
                "Happy 20th Birthday",
                "Darrell",
                "Valentino!",
              ])
            }
          />
        </div>
      </div>
    </>
  );
}

export default App;
