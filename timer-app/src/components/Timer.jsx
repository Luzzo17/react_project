import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { FaClock } from "react-icons/fa6";
import { getQuotes } from "../services/meditationApi";


export default function Timer() {
    const baseUrl = import.meta.env.BASE_URL;
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState( 10 * 60);
    const [hasStarted, setHasStarted] = useState(false);
    const { secondsLeft, isRunning, start, pause, reset, setTime } = useTimer(totalSeconds);
    const [quote, setQuote] = useState("");
    const [fade, setFade] = useState(false);
    
    
    useEffect(() => {
    getQuotes().then((quotes) => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(random);
    });
}, []);

    useEffect(() => {
        if (secondsLeft === 0 && !isRunning) {
            const audio = new Audio(`${baseUrl}end-timer.mp3`);
            audio.play().catch(() => {
                console.log("Impossibile riprodurre l'audio. Controlla il percorso del file.");
            });
        }
}, [secondsLeft, isRunning, baseUrl]);

const backgroundAudio = useRef(new Audio(`${baseUrl}running-timer.mp3`));

useEffect(() => {
    backgroundAudio.current.loop = true;

    if (isRunning) {
        backgroundAudio.current.play().catch(() => {
            console.log("Impossibile riprodurre l'audio. Controlla il percorso del file.");
        });
    } else {
        backgroundAudio.current.pause();
        backgroundAudio.current.currentTime = 0;
    }
}, [isRunning]);



useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft === 0) return;

    if (secondsLeft % 30 === 0) {
        const fadeTimeout = setTimeout(() => {
            setFade(true);
        }, 0);

        const quoteTimeout = setTimeout(() => {
            getQuotes().then((quotes) => {
                const random = quotes[Math.floor(Math.random() * quotes.length)];
                setQuote(random);
                setFade(false); 
            });
        }, 800);

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(quoteTimeout);
        };
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
        <h1 className={fade ? "fade-out" : "fade-in"}>{quote}</h1>

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
