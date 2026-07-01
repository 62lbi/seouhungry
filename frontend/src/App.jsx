import { useState, useEffect } from "react";

function App() {
  // ================= STATE FOR PROTOTYPE NAVIGATION =================
  // Managed routes: "home", "about", "menu", "contact", "login", "register"
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Track scroll state to transition fixed navbar styling
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in successfully as: ${email}`);
    setCurrentPage("home");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`Account created successfully for: ${name}`);
    setCurrentPage("login");
  };

  // ================= EXTENDED DATABASE WITH IDR PRICING =================
  const nutritionItems = [
    {
      title: "Grilled Chicken Salad",
      image: "https://assets.epicurious.com/photos/64a845e67799ee8651e4fb8f/1:1/w_4198,h_4198,c_limit/AshaGrilledChickenSalad_RECIPE_070523_56498.jpg",
      calories: "350 kcal",
      protein: "30g",
      carbs: "15g",
      fat: "18g",
      extra: "Fiber: 5g",
      price: "Rp 42.000",
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
      price: "Rp 52.000",
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
      price: "Rp 35.000",
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
      price: "Rp 38.000",
      description: "Low-calorie drink packed with vitamins and antioxidants.",
    },
  ];

  // ================= HERO NUTRITION SLIDER LOGIC =================
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
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-700 selection:text-white">
      
      {/* ================= FIXED PERSISTENT NAVIGATION BAR ================= */}
      <nav 
        className={`w-full flex items-center justify-between px-16 py-4 fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled || currentPage !== "home"
            ? "bg-black/90 backdrop-blur-md shadow-lg py-3" 
            : "bg-transparent py-6"
        }`}
      >
        {/* Logo / Brand Title */}
        <h1 
          className="text-4xl font-bold italic text-white cursor-pointer select-none"
          onClick={() => setCurrentPage("home")}
        >
          Seouhungry
        </h1>

        {/* Dynamic Navigation Links */}
        <ul className="flex gap-4 font-medium text-white items-center">
          {["home", "about", "menu", "contact"].map((tab) => (
            <li 
              key={tab}
              className={`cursor-pointer px-5 py-2 rounded-full capitalize transition duration-200 select-none ${
                currentPage === tab 
                  ? "bg-white text-black font-semibold shadow-md" 
                  : "hover:bg-white/10 text-gray-200"
              }`}
              onClick={() => setCurrentPage(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* Primary Auth Action Trigger */}
        <button 
          onClick={() => setCurrentPage("login")}
          className={`border px-6 py-2.5 rounded-full transition font-medium text-sm ${
            currentPage === "login" || currentPage === "register"
              ? "bg-white text-black border-white shadow-md"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          Sign In
        </button>
      </nav>

      {/* ================= HERO & LANDING SUB-SECTIONS (HOME VIEW) ================= */}
      {currentPage === "home" && (
        <>
          {/* Hero Masthead Banner */}
          <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 px-5 max-w-4xl">
              <h1 className="text-6xl md:text-6xl font-serif leading-tight text-white">
                Know what you eat, eat what you love
              </h1>
              <p className="mt-8 text-xl text-gray-200 leading-relaxed">
                Discover the best food and drinks in town. From traditional dishes to modern cuisine, selected with care and served with perfection.
              </p>
              <div className="mt-10 flex gap-6 justify-center">
                <button 
                  onClick={() => setCurrentPage("menu")} 
                  className="bg-red-700 text-white px-8 py-4 rounded-full hover:bg-red-800 transition"
                >
                  Explore Menu
                </button>
              </div>
            </div>
          </div>

          {/* Value Proposition Grid */}
          <section className="py-24 px-10 bg-gray-50">
            <h1 className="text-5xl font-bold text-center mb-6">
              What Makes Our Service Different?
            </h1>
            <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              At Seouhungry, we do more than just serve delicious food. We help people understand what they eat by providing nutritional information alongside every food and drink item. This allows our customers to enjoy meals they love while maintaining a healthier lifestyle.
            </p>
          </section>

          {/* Nutritional Highlights Multi-item Slider */}
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
                  <h2 className="text-4xl font-bold mb-4">{currentItem.title}</h2>
                  <p className="text-2xl font-bold text-red-700 mb-6">{currentItem.price}</p>
                  <div className="space-y-4 text-lg text-gray-700">
                    <p><span className="font-bold">Calories:</span> {currentItem.calories}</p>
                    <p><span className="font-bold">Protein:</span> {currentItem.protein}</p>
                    <p><span className="font-bold">Carbohydrates:</span> {currentItem.carbs}</p>
                    <p><span className="font-bold">Fat:</span> {currentItem.fat}</p>
                    <p><span className="font-bold text-red-700">{currentItem.extra}</span></p>
                  </div>
                  <p className="mt-6 text-lg text-gray-600 leading-relaxed">
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

      {/* ================= OPTIMIZED LAG-FREE MENU VIEW ================= */}
      {currentPage === "menu" && (
        <div 
          className="min-h-screen pt-32 pb-24 bg-cover bg-center bg-scroll relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
          }}
        >
          {/* Dark Overlay - removed backdrop-blur to boost frame rate rendering performance */}
          <div className="absolute inset-0 bg-neutral-950/85"></div>

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <header className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-white mb-4">Our Healthy Menu</h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Delicious local cuisine balanced with clear macro info. Premium taste, budget-friendly prices.
              </p>
            </header>

            {/* Menu Structural Layout Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {nutritionItems.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    {/* Item Cover Asset */}
                    <div className="relative h-56 w-full">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 right-4 bg-red-700 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow">
                        {item.price}
                      </span>
                    </div>

                    {/* Metadata Specs Segment */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                      
                      {/* Vertical Structured Macro Stack */}
                      <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs border border-gray-100/80">
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Energy:</span><span className="font-bold text-gray-900">{item.calories}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Protein:</span><span className="font-semibold text-emerald-700">{item.protein}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Carbs:</span><span className="font-semibold text-amber-700">{item.carbs}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Fats:</span><span className="font-semibold text-blue-700">{item.fat}</span></div>
                        <div className="pt-1.5 mt-1 border-t border-gray-200/60 text-center text-red-700 font-bold tracking-wide bg-red-50 rounded-lg py-0.5">{item.extra}</div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Controls Footer */}
                  <div className="p-6 pt-0">
                    <button 
                      onClick={() => alert(`${item.title} added to draft checkout!`)}
                      className="w-full bg-red-700 text-white font-medium py-3 rounded-2xl hover:bg-red-800 transition active:scale-[0.98] shadow-md shadow-red-900/10"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= PLACEHOLDER VIEWS FOR MISSING MVP SEGMENTS ================= */}
      {(currentPage === "about" || currentPage === "contact") && (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-50 px-6">
          <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg text-center border border-gray-100">
            <span className="text-5xl mb-4 block">📍</span>
            <h2 className="text-3xl font-serif font-bold capitalize text-gray-900 mb-3">{currentPage} Prototype Profile</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This space acts as an illustrative block for your Seouhungry MVP layout. Active page route detection flags this link correctly.
            </p>
            <button 
              onClick={() => setCurrentPage("home")} 
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      )}

      {/* ================= SIGN IN (LOGIN) FORM VIEW ================= */}
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

      {/* ================= REGISTER (SIGN UP) FORM VIEW ================= */}
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