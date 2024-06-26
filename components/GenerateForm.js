import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useRouter } from 'next/router';
import ProgressBar from './ProgressBar';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const GenerateForm = ({ prompt: startingPrompt, duration: startingDuration, isMusicPage }) => {
  const router = useRouter();
  const cancelRef = useRef(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [prompt, setPrompt] = useState(startingPrompt);
  const [duration, setDuration] = useState(startingDuration || 8);
  const [audioResult, setAudioResult] = useState(null);
  const [videoResult, setVideoResult] = useState(null);
  const [areResultsReady, setAreResultsReady] = useState(false);
  const [logs, setLogs] = useState({ musicgen: '', waveform: '' });

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  }

  const pollPrediction = async (id, logType) => {
    let prediction;

    do {
      await sleep(1000);
      const response = await fetch(`/api/${id}`);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return null;
      }

      setLogs((prevLogs) => ({
        ...prevLogs,
        [logType]: prediction.logs,
      }));
    } while (
      !cancelRef.current &&
      prediction.status !== "succeeded" &&
      prediction.status !== "canceled" &&
      prediction.status !== "failed"
    );

    return prediction;
  };

  const resetState = () => {
    setVideoResult(null);
    setAudioResult(null);
    setAreResultsReady(false);
    setLogs({ musicgen: '', waveform: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cancelRef.current = false;
    setHasSubmitted(true);
    const musicPrompt = e.target['music-prompt'].value;
    const duration = e.target['duration'].value;
    setPrompt(musicPrompt);
    setDuration(duration);
    resetState();

    const response = await fetch("/api/musicgen", {
      ...fetchOptions,
      body: JSON.stringify({
        prompt: musicPrompt,
        duration
      }),
    });

    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      setHasSubmitted(false);
      return;
    }

    const poll = async () => {
      const result = await pollPrediction(prediction.id, 'musicgen');
      if (result && !cancelRef.current) {
        setAudioResult(result.output);
      }
    };

    await Promise.allSettled([
      poll()
    ]);

    if (!cancelRef.current) {
      setAreResultsReady(true);
    }

    cancelRef.current = false;
  };

  useEffect(() => {
    if (!areResultsReady) return;

    async function waveform () {
      const waveformResponse = await fetch("/api/waveform", {
        ...fetchOptions,
        body: JSON.stringify({
          audio: audioResult,
          prompt: prompt,
        }),
      });

      const waveformPrediction = await waveformResponse.json();
      if (waveformResponse.status !== 201) {
        setError(waveformPrediction.detail);
        return;
      }

      const waveformResult = await pollPrediction(waveformPrediction.id, 'waveform');

      if (waveformResult) {
        setVideoResult(waveformResult.output);
        router.push(`/music/${waveformResult.id}`);
        setHasSubmitted(false);
      } else {
        return;
      }
    }

    waveform();
  }, [audioResult, areResultsReady]);

  return (
    <div>
      {!hasSubmitted && (
        <form id="music-form" className="w-full" onSubmit={handleSubmit}>

          <label className="block md:mb-4 mb-2 font-bold md:text-2xl text-xl" htmlFor="music-prompt">
            <span className="md:inline hidden">🎺</span> Prompt
          </label>

          <div className="md:flex">
            <input
              id="prompt"
              type="text"
              defaultValue={prompt}
              className="md:flex-grow w-full border-2 border-gray-600 rounded-md p-2 mb-4"
              name="music-prompt"
            />

            <div className="flex">
            <input
              id="duration"
              inputMode="numeric"
              defaultValue={duration}
              className="block w-12 border-2 border-gray-600 rounded-md p-2 mb-4 md:ml-4"
              name="duration"
            />
            <label className="align-middle pt-5 ml-2 text-md" htmlFor="duration">
              seconds
            </label>
            </div>
          </div>
          <div className="flex">
            <button className="block bg-violet-800 text-lg font-bold text-white w-full px-5 py-3 mt-2 rounded shadow-lg" type="submit">
              {isMusicPage ? 'Make more music' : 'Make music'}
            </button>
          </div>
        </form>
      )}

      {hasSubmitted && (
        <Fragment>
          {!videoResult && (
            <ProgressBar logs={logs} />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default GenerateForm;
