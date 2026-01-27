import React, { Suspense } from 'react'
import MainRouter from './routers/MainRouter'
import { StoryProvider } from "./context/StoryContext";

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="text-2xl font-bold animate-pulse">Loading NAIA...</div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <StoryProvider>
        <MainRouter />
      </StoryProvider>
    </Suspense>
  )
}

export default App