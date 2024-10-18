import React, { useState } from 'react';
import PressureConverter from './components/PressureConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">压力单位换算器</h1>
        <PressureConverter />
      </div>
    </div>
  );
}

export default App;