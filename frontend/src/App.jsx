
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      {/* Main white container */}
      <div className="w-full max-w-6xl bg-white shadow-2xl overflow-hidden">

        {/* Navbar */}
        <div className="flex items-center justify-between px-10 py-6 bg-white">

          {/* Website title */}
          <h1 className="text-4xl font-bold italic">
            Seouhungry
          </h1>

          {/* Navigation */}
          <ul className="flex gap-8 font-medium">
            <li className="bg-green-100 px-4 py-2 rounded-full">
              Home
            </li>

            <li>About</li>
            <li>Menu</li>
            <li>Pages</li>
            <li>Contact</li>
          </ul>

          {/* Button */}
          <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">
            Book A Table
          </button>
        </div>

        {/* Hero Section */}
        <div
          className="
            h-[600px]
            bg-cover
            bg-center
            relative
            flex
            items-center
            justify-center
            text-center
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
          }}
        >

          {/* Dark transparent overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 px-5">

            {/* Main heading */}
            <h1 className="text-7xl font-serif leading-tight text-white">
              Welcome to <span className="text-red-400">Seouhungry</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
              Discover the best food and drinks in town.
              From traditional dishes to modern cuisine,
              selected with care and served with perfection
              for your health.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-5 justify-center">

              <button className="bg-red-700 text-white px-8 py-4 rounded-full hover:bg-red-800 transition">
                Book A Table
              </button>

              <button className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
                Explore Menu
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
