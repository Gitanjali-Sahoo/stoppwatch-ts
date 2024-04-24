import React, { useRef, useState } from 'react'

const StopWatch: React.FC = () => {
    const [timer, setTimer] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [splitTime, setSplitTime] = useState<number[]>([])
    const [isStarted, setIsStarted] = useState<boolean>(false)

    const timeInterval = useRef<number | null>(null)

    const handleStart = () => {
        if (isRunning) return
        setIsRunning(true)
        setIsStarted(true)
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, 10)
    }

    const handlePause = () => {
        if (!isRunning) return
        setIsRunning(false)
        clearInterval(timeInterval.current!)
    }

    const handleReset = () => {
        setIsRunning(false)
        clearInterval(timeInterval.current!)
        setTimer(0)
        setSplitTime([])
        setIsStarted(false)
    }
    const handleSplit = () => {
        if (!isRunning) return
        setSplitTime((prevSplit) => [...prevSplit, timer])
        setTimer(0)
    }

    const formatTime = (timer: number) => {
        const hours = Math.floor(timer / 600000)
            .toString()
            .padStart(2, '0')
        const minutes = Math.floor(timer / 60000)
            .toString()
            .padStart(2, '0')
        const seconds = Math.floor((timer / 1000) % 60)
            .toString()
            .padStart(2, '0')
        const milliseconds = Math.floor(timer % 1000)
            .toString()
            .padStart(3, '0')
        return { hours, minutes, seconds, milliseconds }
    }
    const { hours, minutes, seconds, milliseconds } = formatTime(timer)

    return (
        <>
            <div className="stopwatch-container">
                <h2>Stopwatch</h2>
                <p>
                    {hours}:{minutes}:{seconds}:{milliseconds}
                </p>
                <div className="button-container">
                    <input
                        type="button"
                        value="Start"
                        onClick={handleStart}
                        className="startBtn"
                    />

                    <input
                        type="button"
                        value="Pause"
                        onClick={handlePause}
                        className={`pauseBtn${
                            !isRunning || !isStarted ? ' disabled' : ''
                        }`}
                        disabled={!isRunning || !isStarted}
                    />
                    <input
                        type="button"
                        value="Split"
                        onClick={handleSplit}
                        className={`splitBtn ${!isRunning ? 'disabled' : ''}`}
                        disabled={!isRunning}
                    />
                    <input
                        type="button"
                        value="Reset"
                        onClick={handleReset}
                        className={`resetBtn ${isRunning ? 'disabled' : ''}`}
                        disabled={isRunning}
                    />
                </div>
                <hr style={{ width: '80%', marginTop: '20px' }} />
            </div>

            <div style={{ display: 'flex' }} className="split-container">
                {splitTime.map((time, index: number) => {
                    const formattedTime = formatTime(time)
                    return (
                        <ul key={index}>
                            <li>
                                {formattedTime.hours}:{formattedTime.minutes}:
                                {formattedTime.seconds}:
                                {formattedTime.milliseconds}
                            </li>
                        </ul>
                    )
                })}
            </div>
        </>
    )
}
export default StopWatch
