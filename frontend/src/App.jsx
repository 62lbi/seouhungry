import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-500">
        Tailwind Works
      </h1>

      <p className="text-lg">
        React + Vite + Tailwind CSS
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App