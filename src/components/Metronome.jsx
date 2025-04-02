import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@heroui/input";
import { Button, ButtonGroup } from "@heroui/button";

const Metronome = () => {
  const isRunning = useRef(false);
  const [, forceUpdate] = useState(0); // Dummy state for triggering a render
  const [tickInterval, setTickInterval] = useState(1000);
  const [ticksPerSet, setTicksPerSet] = useState(3);
  const [totalSets, setTotalSets] = useState(3);
  const currentSet = useRef(0);
  const currentTick = useRef(0);
  const [audioContext, setAudioContext] = useState(null);
  const [tickBuffer, setTickBuffer] = useState(null);
  const [currentTimeout, setCurrentTimeout] = useState(null);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    fetch(`538236__designdean__minimal-ui-pack-pops-clicks-ticks.wav`)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(decodedData => {
        setTickBuffer(decodedData);
      })
      .catch(error => console.error("Error loading sound:", error));

    return () => {
      if (currentTimeout) clearTimeout(currentTimeout);
    };
  }, []);

  const playTick = () => {
    if (!tickBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = tickBuffer;
    source.connect(audioContext.destination);

    let startTime = 17.5;
    let tickDuration = 0.1;

    source.start(audioContext.currentTime, startTime, tickDuration);
  };

  const runTick = () => {
    if (!isRunning) return;

    if (currentTick.current < ticksPerSet) {
      console.log("current tick", currentTick.current);
      playTick();
      setCurrentTimeout(setTimeout(runTick, tickInterval));
      currentTick.current++
    } else {
      if (currentSet.current < totalSets) {
        console.log("current set", currentSet.current);
        currentSet.current++
        currentTick.current = 0;
        setCurrentTimeout(setTimeout(runTick, tickInterval));
      } else {
        isRunning.current = false;
        forceUpdate((prev) => prev + 1);
      }
    }
  };

  const startMetronome = () => {
    console.log("Starting metronome...");
    isRunning.current = true;
    forceUpdate((prev) => prev + 1);
    currentSet.current = 0;
    currentTick.current = 0;
    runTick();
  };

  const stopMetronome = () => {
    isRunning.current = false;
    forceUpdate((prev) => prev + 1);
    if (currentTimeout) clearTimeout(currentTimeout);
  };

  return (
    <div className='h-screen'>
      <div className='text-2 xl font-bold text-center'>Exercise Metronome</div>
      <div>

        <div className="flex items-center space-x-2">
          <Button
            className='h-full p-2'
            onPress={() => setTickInterval(tickInterval - 1000)}>
            -
          </Button>
          <Input
            label="Tick Interval (sec)"
            value={tickInterval / 1000}
            onChange={(e) => setTickInterval(e.target.value * 1000)} />
          <Button
            className="h-full p-2"
            onPress={() => setTickInterval(tickInterval + 1000)}>
            +
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className='h-full p-2'
            onPress={() => setTicksPerSet(ticksPerSet - 1)}>
            -
          </Button>
          <Input
            label="Ticks per Set"
            type="number"
            step="1"
            value={ticksPerSet}
            onChange={(e) => setTicksPerSet(e.target.value)} />
          <Button
            className="h-full p-2"
            onPress={() => setTicksPerSet(ticksPerSet + 1)}>
            +
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className='h-full p-2'
            onPress={() => setTotalSets(totalSets - 1)}>
            -
          </Button>
          <Input
            label="Number of Sets"
            type="number"
            step="1"
            value={totalSets}
            onChange={(e) => setTotalSets(e.target.value)} />
          <Button
            className="h-full p-2"
            onPress={() => setTotalSets(totalSets + 1)}>
            +
          </Button>
        </div>

        <ButtonGroup className='w-full'>
          <Button
            className="w-full"
            onPress={isRunning.current ? stopMetronome : startMetronome}>
            <span className="absolute inset-0 bg-blue-500 transition-all" style={{ width: `${(currentTick.current / ticksPerSet) * 100}%` }} />
            <span className="relative">{isRunning.current ? "Set: " + currentSet.current + " Interval: " + currentTick.current : "Start"}</span>

          </Button>
        </ButtonGroup>

      </div>
    </div>
  );
};

export default Metronome;