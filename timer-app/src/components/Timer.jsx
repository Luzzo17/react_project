import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { FaClock } from "react-icons/fa6";

export default function Timer() {
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState( 10 * 60);
    const { secondsLeft, isRunning, start, pause, reset, setTime } = useTimer(totalSeconds);

    useEffect(() => {
        if (secondsLeft === 0 && !isRunning) {
            const audio = new Audio("/end-timer.mp3");
            audio.play().catch(() => {
                console.log("Impossibile riprodurre l'audio. Controlla il percorso del file.");
            });
        }
}, [secondsLeft, isRunning]);

const handleSetDuration = () => {
    const total = minutes * 60 + seconds;
    if (total <= 0) {
        return;
    }

    setTotalSeconds(total);
    setTime(total);
};

return (
    <div className="timer-container">
        <h1>Prenditi qualche minuto per te!</h1>

    <TimerDisplay 
    secondsLeft={secondsLeft}
    totalSeconds={totalSeconds}
    />

    <TimerControls
    isRunning={isRunning}
    secondsLeft={secondsLeft}
    onStart={start}
    onPause={pause}
    onReset={reset}
    />

    <div className="settings">
        <h2>Imposta la durata del timer</h2>
        <div className="input-settings">
            <div>
                <label htmlFor="minutes">Minuti</label>
                <input
                id="minutes"
                type="number"
                min="0"
                max="120"
                value={minutes}
                onChange={(event) => setMinutes(Number(event.target.value))}
                />
            </div>
            <div>
                <label htmlFor="seconds">Secondi</label>
                <input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(event) => setSeconds(Number(event.target.value))}
                />
            </div>
        </div>

        <button className="set-button" onClick={handleSetDuration}>
            <FaClock /> Imposta Durata
        </button>
    </div>
    </div>
);
}
