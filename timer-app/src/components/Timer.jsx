import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { FaClock } from "react-icons/fa6";

export default function Timer() {
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState( 10 * 60);
    const [hasStarted, setHasStarted] = useState(false);
    const { secondsLeft, isRunning, start, pause, reset, setTime } = useTimer(totalSeconds);

    useEffect(() => {
        if (secondsLeft === 0 && !isRunning) {
            const audio = new Audio("/end-timer.mp3");
            audio.play().catch(() => {
                console.log("Impossibile riprodurre l'audio. Controlla il percorso del file.");
            });
        }
}, [secondsLeft, isRunning]);

const isPaused = hasStarted && !isRunning && secondsLeft > 0;

const handleStart = () => {
    setHasStarted(true);
    start();
};

const handleReset = () => {
    setHasStarted(false);
    reset();
};

const handleSetDuration = () => {
    const total = minutes * 60 + seconds;
    if (total <= 0) {
        return;
    }

    setTotalSeconds(total);
    setTime(total);
    setHasStarted(false);
};

return (
    <div className="timer-container">
        <h1>Prenditi qualche minuto per te!</h1>

    <TimerDisplay 
    secondsLeft={secondsLeft}
    totalSeconds={totalSeconds}
    isPaused={isPaused}
    />

    <TimerControls
    isRunning={isRunning}
    secondsLeft={secondsLeft}
    onStart={handleStart}
    onPause={pause}
    onReset={handleReset}
    />

    <div className="settings">
        <h2>Imposta la durata del timer</h2>
        <div className="input-settings">
            <div>
                <label htmlFor="minutes">Minuti: </label>
                <input
                id="minutes"
                type="number"
                min="0"
                max="120"
                value={minutes}
                onChange={(event) => {
                    const value = Number(event.target.value);
                    if (value > 120) setMinutes(120);
                    else if (value < 0) setMinutes(0);
                    else setMinutes(value);
                }}/>
            </div>
            <div>
                <label htmlFor="seconds">Secondi: </label>
                <input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(event) => {
                    const value = Number(event.target.value);
                    if (value > 59) setSeconds(59);
                    else if (value < 0) setSeconds(0);
                    else setSeconds(value);
                }}/>
            </div>
        </div>

        <button className="set-button" onClick={handleSetDuration}>
            <FaClock /> Imposta Durata
        </button>
    </div>
    </div>
);
}
