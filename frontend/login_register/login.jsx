import { useState } from "react";

function App() {
  // ================= STATE FOR PROTOTYPE NAVIGATION =================
  // Options: "home", "login", "register"
  const [currentPage, setCurrentPage] = useState("home");

  // Hardcoded mock credentials for prototype testing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in successfully as: ${email}`);
    setCurrentPage("home"); // Redirect back to home after mock success
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`Account created successfully for: ${name}`);
    setCurrentPage("login"); // Redirect to login page after mock signup
  };

  // ================= SLIDER DATA =================
  const nutritionItems = [
    {
      title: "Grilled Chicken Salad",
      image: "https://assets.epicurious.com/photos/64a845e67799ee8651e4fb8f/1:1/w_4198,h_4198,c_limit/AshaGrilledChickenSalad_RECIPE_070523_56498.jpg",
      calories: "350 kcal",
      protein: "30g",
      carbs: "15g",
      fat: "18g",
      extra: "Fiber: 5g",
      description: "High in protein and fiber, good for muscle growth and digestion.",
    },
    {
      title: "Salmon with Brown Rice",
      image: "https://www.sidechef.com/recipe/d196167d-562e-45ae-977a-0d1c3aa3b93c.jpg",
      calories: "520 kcal",
      protein: "35g",
      carbs: "40g",
      fat: "22g",
      extra: "Omega-3: High",
      description: "Rich in omega-3 and protein, supports heart and brain health.",
    },
    {
      title: "Banana Protein Smoothie",
      image: "https://cdn.lemonsforlulu.com/wp-content/uploads/2015/02/Roasted-Banana-Smoothie-Recipe-7.jpg",
      calories: "280 kcal",
      protein: "24g",
      carbs: "30g",
      fat: "6g",
      extra: "Sugar: 14g",
      description: "Great post-workout drink with high protein and natural energy.",
    },
    {
      title: "Green Detox Juice",
      image: "https://www.watermelon.org/wp-content/uploads/2017/07/super-green-detox-smoothie-scaled.jpg",
      calories: "120 kcal",
      protein: "3g",
      carbs: "20g",
      fat: "1g",
      extra: "Vitamin C: High",
      description: "Low-calorie drink packed with vitamins and antioxidants.",
    },
  ];

  // ================= CURRENT SLIDE =================
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === nutritionItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? nutritionItems.length - 1 : prevIndex - 1
    );
  };

  const currentItem = nutritionItems[currentIndex];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* ================= NAVBAR ================= */}
      <div className="w-full flex items-center justify-between px-16 py-6 absolute top-0 left-0 z-20">
        {/* Website title */}
        <h1 
          className="text-4xl font-bold italic text-white cursor-pointer"
          onClick={() => setCurrentPage("home")}
        >
          Seouhungry
        </h1>

        {/* Navigation links */}
        <ul className="flex gap-8 font-medium text-white items-center">
          <li 
            className={`cursor-pointer px-4 py-2 rounded-full transition ${currentPage === "home" ? "bg-white text-black" : "hover:text-gray-300"}`}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </li>
          <li className="cursor-pointer hover:text-gray-300">About</li>
          <li className="cursor-pointer hover:text-gray-300">Menu</li>
          <li className="cursor-pointer hover:text-gray-300">Pages</li>
          <li className="cursor-pointer hover:text-gray-300">Contact</li>
        </ul>

        {/* Navbar button altered to Sign In */}
        <button 
          onClick={() => setCurrentPage("login")}
          className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition font-medium"
        >
          Sign In
        </button>
      </div>

      {/* ================= CONDITIONAL RENDERING FOR PAGES ================= */}
      
      {currentPage === "home" && (
        <>
          {/* ================= HERO SECTION ================= */}
          <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Hero content */}
            <div className="relative z-10 px-5 max-w-4xl">
              <h1 className="text-6xl md:text-6xl font-serif leading-tight text-white">
                Know what you eat, eat what you love
              </h1>
              <p className="mt-8 text-xl text-gray-200 leading-relaxed">
                Discover the best food and drinks in town. From traditional dishes to modern cuisine, selected with care and served with perfection.
              </p>
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

          {/* ================= WHY US SECTION ================= */}
          <section className="py-24 px-10 bg-gray-50">
            <h1 className="text-5xl font-bold text-center mb-6">
              What Makes Our Service Different?
            </h1>
            <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              At Seouhungry, we do more than just serve delicious food. We help people understand what they eat by providing nutritional information alongside every food and drink item. This allows our customers to enjoy meals they love while maintaining a healthier lifestyle.
            </p>
          </section>

          {/* ================= NUTRITION SLIDER SECTION ================= */}
          <section className="py-24 bg-white">
            <h1 className="text-5xl font-bold text-center mb-16">
              Nutritional Food & Drinks
            </h1>
            <div className="flex items-center justify-center gap-8 px-10">
              <button
                onClick={prevSlide}
                className="w-16 h-16 rounded-full bg-red-700 text-white text-3xl flex items-center justify-center hover:bg-red-800 transition shadow-lg"
              >
                ←
              </button>

              <div className="max-w-5xl w-full bg-gray-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full md:w-[500px] h-[500px] object-cover"
                />
                <div className="p-12 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold mb-8">{currentItem.title}</h2>
                  <div className="space-y-4 text-lg text-gray-700">
                    <p><span className="font-bold">Calories:</span> {currentItem.calories}</p>
                    <p><span className="font-bold">Protein:</span> {currentItem.protein}</p>
                    <p><span className="font-bold">Carbohydrates:</span> {currentItem.carbs}</p>
                    <p><span className="font-bold">Fat:</span> {currentItem.fat}</p>
                    <p><span className="font-bold">{currentItem.extra}</span></p>
                  </div>
                  <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="w-16 h-16 rounded-full bg-red-700 text-white text-3xl flex items-center justify-center hover:bg-red-800 transition shadow-lg"
              >
                →
              </button>
            </div>
          </section>
        </>
      )}

      {/* ================= SIGN IN (LOGIN) PAGE ================= */}
      {currentPage === "login" && (
        <div 
          className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-md w-full relative z-10 mt-20">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-600 text-center mb-8">Please enter your details to sign in</p>
            
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                />
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input type="checkbox" className="rounded text-red-700 focus:ring-red-700" />
                  Remember me
                </label>
                <a href="#" className="text-red-700 hover:underline font-medium">Forgot password?</a>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-red-700 text-white py-3.5 rounded-xl font-medium hover:bg-red-800 transition mt-4 shadow-md"
              >
                Sign In
              </button>
            </form>
            
            <p className="text-center text-gray-600 text-sm mt-8">
              Don't have an account?{" "}
              <button 
                onClick={() => setCurrentPage("register")}
                className="text-red-700 font-bold hover:underline"
              >
                Sign up free
              </button>
            </p>
          </div>
        </div>
      )}

      {/* ================= REGISTER (SIGN UP) PAGE ================= */}
      {currentPage === "register" && (
        <div 
          className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-md w-full relative z-10 mt-20">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-2">Create Account</h2>
            <p className="text-sm text-gray-600 text-center mb-8">Join Seouhungry today and start tracking nutrition</p>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                />
              </div>

              <div className="flex items-start text-sm pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-gray-600">
                  <input type="checkbox" required className="mt-1 rounded text-red-700 focus:ring-red-700" />
                  <span>I agree to the <a href="#" className="text-red-700 hover:underline">Terms of Service</a> and <a href="#" className="text-red-700 hover:underline">Privacy Policy</a></span>
                </label>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-red-700 text-white py-3.5 rounded-xl font-medium hover:bg-red-800 transition mt-4 shadow-md"
              >
                Create Account
              </button>
            </form>
            
            <p className="text-center text-gray-600 text-sm mt-8">
              Already have an account?{" "}
              <button 
                onClick={() => setCurrentPage("login")}
                className="text-red-700 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;