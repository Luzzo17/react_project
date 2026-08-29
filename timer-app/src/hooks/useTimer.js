import { useEffect, useState } from "react";

export function useTimer(initialSeconds) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        if (secondsLeft <= 0) {
            setIsRunning(false);
            return;
        }

        const interval = setInterval (() => {
            setSecondsLeft((current) => current - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, secondsLeft]);

    const start = () => {
        if (secondsLeft > 0) {
            setIsRunning(true);
        }
    };

    const pause = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setIsRunning(false);
        setSecondsLeft(initialSeconds);
    }

    const setTime = (seconds) => {
        setIsRunning(false);
        setSecondsLeft(seconds);
    };
    
    return {
        secondsLeft,
        isRunning,
        start,
        pause,
        reset,
        setTime,
    };
}