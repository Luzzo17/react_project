function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

export default function TimerDisplay ({
    secondsLeft,
    totalSeconds,
}) {
    const progress =
    totalSeconds >0
    ? ((totalSeconds - secondsLeft) / totalSeconds) * 100
    : 0;

    return (
        <div className="timer-display">
            <div className="progress-circle"
            style={{
                "--progress": `${progress * 3.6}deg`,
            }}
            >
            <div className="timer-content">
                <span className="time">{formatTime(secondsLeft)}</span>

                <span className="timer-label">
                    {secondsLeft === 0 ? "Grazie per esserti dedicato questo momento" : "Non c'è fretta"}
                </span>
            </div>
            </div>
            </div>

    );
}