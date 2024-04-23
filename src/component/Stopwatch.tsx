import React, { useRef, useState } from 'react'

const StopWatch: React.FC = () => {
    const [timer, setTimer] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [splitTime, setSplitTime] = useState<number[]>([])

    const timeInterval = useRef<number | null>(null)

    const handleStart = () => {
        if (isRunning) return
        setIsRunning(true)
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
    }
    const handleSplit = () => {
        if (!isRunning) return
        setSplitTime([...splitTime, timer])
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
            <div>
                <h1>Stopwatch</h1>
                <input type="button" value="Start" onClick={handleStart} />
                <input type="button" value="Pause" onClick={handlePause} />
                <input type="button" value="Split" onClick={handleSplit} />
                <input type="button" value="Reset" onClick={handleReset} />
                <div>
                    {hours}:{minutes}:{seconds}:{milliseconds}
                </div>
                <div>
                    {splitTime.map((time, index: number) => {
                        return (
                            <ul key={index}>
                                <li>{time}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default StopWatch
