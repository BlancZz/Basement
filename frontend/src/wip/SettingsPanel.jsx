import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

export default function SettingsPanel({
  colors,
  mode,
  setMode,
  brightness,
  setBrightness,
}) {
  const [open, setOpen] = useState(false);

  const [shouldRender, setShouldRender] = useState(false);

  // Open on click
  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setShouldRender(false), 300); // match animation duration
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Drop-up Panel */}
      {shouldRender && (
        <>
          <button
            className={`relative mb-2 right-2 h-[2.5rem] w-[2.5rem] bg-white text-black text-xl rounded-full ${
              open ? 'animate-fade-in-up' : 'animate-fade-out-down'
            }`}
            onClick={() => (open ? handleClose() : setOpen(true))}
          >
            ✕
          </button>

          <div
            className={`relative w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl space-y-4 ${
              open ? 'animate-fade-in-up' : 'animate-fade-out-down'
            }`}
          >
            {/* Mode Toggle */}
            <div className="flex items-center justify-between">
              <span>Mode:</span>
              <div className="flex items-center gap-2">
                <Box
                  className="px-2 py-1 rounded cursor-pointer"
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: colors[0],
                      transform: 'translateY(-3px) scale(1.03)',
                      boxShadow: `0 6px 14px ${colors[0]}80`,
                      color: 'white',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                      boxShadow: `0 2px 6px ${colors[0]}40`,
                    },
                  }}
                  onClick={() =>
                    setMode((prev) => (prev === 1 ? 13 : prev - 1))
                  }
                >
                  ←
                </Box>
                <span className="w-6 text-center">{mode}</span>
                <Box
                  className="px-2 py-1 rounded cursor-pointer"
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: colors[2],
                      transform: 'translateY(-3px) scale(1.03)',
                      boxShadow: `0 6px 14px ${colors[2]}80`,
                      color: 'white',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                      boxShadow: `0 2px 6px ${colors[2]}40`,
                    },
                  }}
                  onClick={() => setMode((prev) => (prev % 13) + 1)}
                >
                  →
                </Box>
              </div>
            </div>

            {/* Brightness Slider */}
            <div className="flex items-center justify-between space-x-2">
              <label htmlFor="brightnessRange">Brightness:</label>
              <input
                id="brightnessRange"
                type="range"
                min={-100}
                max={100}
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-32 h-2 rounded-lg appearance-none transition-all duration-300 shadow-md focus:outline-none accent-pink-500"
              />
            </div>
          </div>
        </>
      )}

      {/* Toggle Button (outside the panel when closed) */}
      {!shouldRender && (
        <button
          className="h-[3rem] w-[3rem] bg-white text-black text-2xl mt-2 rounded-full shadow-lg hover:bg-gray-200 hover:rotate-180 transform transition-all duration-1000 ease-in-out"
          onClick={() => (open ? handleClose() : setOpen(true))}
        >
          ⚙️
        </button>
      )}
    </div>
  );
}
