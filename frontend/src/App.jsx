function App() {
  return (
    <div className="min-h-screen bg-white">

      {/* ================= NAVBAR ================= */}
      <div className="w-full flex items-center justify-between px-16 py-6 absolute top-0 left-0 z-20">

        {/* Website title */}
        <h1 className="text-4xl font-bold italic text-white">
          Seouhungry
        </h1>

        {/* Navigation */}
        <ul className="flex gap-8 font-medium text-white">

          <li className="bg-white text-black px-4 py-2 rounded-full">
            Home
          </li>

          <li>About</li>
          <li>Menu</li>
          <li>Pages</li>
          <li>Contact</li>
        </ul>

        {/* Button */}
        <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
          Book A Table
        </button>
      </div>

      {/* ================= HERO SECTION ================= */}
      <div
        className="
          min-h-screen
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

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-5 max-w-4xl">

          {/* Main Heading */}
          <h1 className="text-6xl md:text-6xl font-serif leading-tight text-white">
Know what you eat, eat what you love
          </h1>

          {/* Description */}
          <p className="mt-8 text-xl text-gray-200 leading-relaxed">
            Discover the best food and drinks in town.
            From traditional dishes to modern cuisine,
            selected with care and served with perfection
            for your health.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-6 justify-center">

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
  )
}

export default App

