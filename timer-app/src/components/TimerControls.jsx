import { FaPlay, FaPause, FaArrowsRotate } from "react-icons/fa6";

export default function TimerControls({
    isRunning,
    secondsLeft,
    onStart,
    onPause,
    onReset,
}) {
    return (
        <div className="timer-controls">
            {!isRunning ? (
                <button className="primary-button"
                id="start"
                onClick={onStart}
                disabled={secondsLeft === 0}
                >
                 <FaPlay /> Avvia
                </button>
            ) : (
                <button className= "primary-button"
                id="pause"
                onClick={onPause}
                >
                <FaPause/> Pausa
                </button>
            )
        
        }
                <button className="primary-button"
                id="reset"
                onClick={onReset}
                >
                <FaArrowsRotate /> Reset
                </button>
        </div>
    )
}
