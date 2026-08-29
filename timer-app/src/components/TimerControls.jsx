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
                onClick={onStart}
                disabled={secondsLeft === 0}
                >
                 <FaPlay /> Avvia
                </button>
            ) : (
                <button className= "primary-button"
                onClick={onPause}
                >
                <FaPause/> Pausa
                </button>
            )
        
        }
                <button className="secondary-button"
                onClick={onReset}
                >
                <FaArrowsRotate /> Reset
                </button>
        </div>
    )
}
