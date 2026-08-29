import { useEffect, useState } from "react";

export function useTimer(initialSeconds) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const isActive = isRunning && secondsLeft > 0;

    useEffect(() => {
        if (!isActive) {
            return;
        }

        const interval = setInterval (() => {
            setSecondsLeft((current) => Math.max(current - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

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
        isRunning: isActive,
        start,
        pause,
        reset,
        setTime,
    };
}
