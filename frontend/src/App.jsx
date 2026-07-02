import { useState, useEffect } from "react";

function App() {
  // ================= STATE FOR PROTOTYPE NAVIGATION & AUTH =================
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Core functional state hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // Tracks historically placed orders
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [isCartOpen, setIsCartOpen] = useState(false); // Controls active cart drawer overlay
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); // Controls order tracking drawer overlay

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

  // ================= AUTHENTICATION HANDLERS =================
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsAuthModalOpen(false); 
    alert(`Logged in successfully as: ${email}`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`Account created successfully for: ${name}. You can now sign in.`);
    setAuthMode("login"); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]); 
    setOrders([]);
    setIsCartOpen(false);
    setIsOrdersOpen(false);
    setEmail("");
    setPassword("");
    setName("");
    alert("Logged out successfully.");
    setCurrentPage("home");
  };

  // ================= CART & ORDER ACTION HANDLERS =================
  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      alert("You must login/signup first for transaction");
      setAuthMode("login");
      setIsAuthModalOpen(true); 
    } else {
      const uniqueCartItem = { ...item, cartId: Date.now() + Math.random() };
      setCart((prevCart) => [...prevCart, uniqueCartItem]);
      alert(`🛒 ${item.title} added to your cart!`);
    }
  };

  const handleRemoveFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    // Generate a structured new order entry
    const newOrder = {
      id: "SH-" + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      total: calculateTotalCost(),
      status: "Not Paid Yet", // Initial requested state
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]); // Reset active cart items
    setIsCartOpen(false); 
    setIsOrdersOpen(true); // Bring up orders panel to immediately see status
    alert(`🎉 Order created successfully! Current Status: Not Paid Yet.`);
  };

  const handlePayOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Paid" } : order
      )
    );
    alert("💳 Payment mock accepted! Status updated to: Paid");
  };

  // Helper utility to calculate dynamic cost totals automatically from formatted IDR values
  const calculateTotalCost = () => {
    const sum = cart.reduce((acc, item) => {
      const rawPrice = parseInt(item.price.replace(/[^\d]/g, ""), 10);
      return acc + rawPrice;
    }, 0);
    
    return "Rp " + sum.toLocaleString("id-ID");
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
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-700 selection:text-white relative">
      
      {/* ================= RESPONSIVE FIXED NAVIGATION BAR ================= */}
      <nav 
        className={`w-full flex flex-col sm:flex-row items-center justify-between px-6 md:px-16 py-4 fixed top-0 left-0 z-40 transition-all duration-300 gap-4 sm:gap-0 ${
          isScrolled || currentPage !== "home"
            ? "bg-black/95 backdrop-blur-md shadow-lg py-3" 
            : "bg-transparent py-6"
        }`}
      >
        {/* Logo / Brand Title */}
        <h1 
          className="text-3xl md:text-4xl font-bold italic text-white cursor-pointer select-none"
          onClick={() => setCurrentPage("home")}
        >
          Seouhungry
        </h1>

        {/* Dynamic Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-2 md:gap-4 font-medium text-white items-center">
          {["home", "about", "menu", "contact"].map((tab) => (
            <li 
              key={tab}
              className={`cursor-pointer px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm rounded-full capitalize transition duration-200 select-none ${
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

        {/* Utility Actions Stack */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn && (
            <>
              <button 
                onClick={() => { setIsOrdersOpen(true); setIsCartOpen(false); }}
                className="text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-3 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1 shadow"
              >
                📦 Orders ({orders.length})
              </button>
              <button 
                onClick={() => { setIsCartOpen(true); setIsOrdersOpen(false); }}
                className="text-white bg-red-700 hover:bg-red-800 border border-red-700 px-3 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1 shadow font-medium"
              >
                🛒 Cart ({cart.length})
              </button>
            </>
          )}
          <button 
            onClick={isLoggedIn ? handleLogout : () => { setAuthMode("login"); setIsAuthModalOpen(true); }}
            className="border px-4 sm:px-6 py-2 rounded-full transition font-medium text-xs border-white text-white hover:bg-white hover:text-black"
          >
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </nav>

      {/* ================= HERO & LANDING SUB-SECTIONS (HOME VIEW) ================= */}
      {currentPage === "home" && (
        <>
          <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-center px-4"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 max-w-4xl pt-24 sm:pt-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
                Know what you eat, eat what you love
              </h1>
              <p className="mt-4 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Discover the best food and drinks in town. From traditional dishes to modern cuisine, selected with care and served with perfection.
              </p>
              <div className="mt-8 sm:mt-10 flex gap-4 sm:gap-6 justify-center">
                <button 
                  onClick={() => setCurrentPage("menu")} 
                  className="bg-red-700 text-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-red-800 transition shadow-lg"
                >
                  Explore Menu
                </button>
              </div>
            </div>
          </div>

          <section className="py-16 md:py-24 px-6 md:px-10 bg-gray-50">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
              What Makes Our Service Different?
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              At Seouhungry, we do more than just serve delicious food. We help people understand what they eat by providing nutritional information alongside every food and drink item. This allows our customers to enjoy meals they love while maintaining a healthier lifestyle.
            </p>
          </section>

          <section className="py-16 md:py-24 bg-white px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16">
              Nutritional Food & Drinks
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-6xl mx-auto">
              <div className="w-full bg-gray-50 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full md:w-1/2 h-64 sm:h-96 md:h-[500px] object-cover"
                />
                <div className="p-6 sm:p-10 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{currentItem.title}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-red-700 mb-4 sm:mb-6">{currentItem.price}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                    <p><span className="font-bold">Calories:</span> {currentItem.calories}</p>
                    <p><span className="font-bold">Protein:</span> {currentItem.protein}</p>
                    <p><span className="font-bold">Carbs:</span> {currentItem.carbs}</p>
                    <p><span className="font-bold">Fat:</span> {currentItem.fat}</p>
                  </div>
                  
                  <p className="text-xs sm:text-sm font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-xl self-start mb-4">
                    {currentItem.extra}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    {currentItem.description}
                  </p>
                  <button 
                    onClick={() => handleAddToCart(currentItem)}
                    className="bg-red-700 text-white text-sm px-6 py-3 rounded-xl hover:bg-red-800 transition shadow md:self-start"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-4 md:mt-0 order-last md:order-none w-full md:w-auto justify-center">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-red-700 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-800 transition shadow-lg"
                >
                  &larr;
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-red-700 text-white text-xl sm:text-2xl flex items-center justify-center hover:bg-red-800 transition shadow-lg"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ================= RESPONSIVE MENU VIEW ================= */}
      {currentPage === "menu" && (
        <div 
          className="min-h-screen pt-40 sm:pt-32 pb-24 bg-cover bg-center bg-scroll relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-neutral-950/85"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <header className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Healthy Menu</h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                Delicious local cuisine balanced with clear macro info. Premium taste, budget-friendly prices.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {nutritionItems.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    <div className="relative h-48 sm:h-56 w-full">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-4 right-4 bg-red-700 text-white font-bold px-3 py-1 rounded-full text-xs sm:text-sm shadow">
                        {item.price}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                      
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-2xl space-y-2 text-xs border border-gray-100/80">
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Energy:</span><span className="font-bold text-gray-900">{item.calories}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Protein:</span><span className="font-semibold text-emerald-700">{item.protein}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Carbs:</span><span className="font-semibold text-amber-700">{item.carbs}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 font-medium">Fats:</span><span className="font-semibold text-blue-700">{item.fat}</span></div>
                        <div className="pt-1.5 mt-1 border-t border-gray-200/60 text-center text-red-700 font-bold tracking-wide bg-red-50 rounded-lg py-0.5">{item.extra}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-red-700 text-white font-medium py-2.5 sm:py-3 rounded-2xl hover:bg-red-800 transition active:scale-[0.98] text-sm"
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

      {/* ================= PLACEHOLDER VIEWS FOR ABOUT/CONTACT ================= */}
      {(currentPage === "about" || currentPage === "contact") && (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl max-w-lg text-center border border-gray-100">
            <span className="text-4xl sm:text-5xl mb-4 block">📍</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold capitalize text-gray-900 mb-3">{currentPage} Prototype Profile</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              This space acts as an illustrative block for your Seouhungry MVP layout. Active page route detection flags this link correctly.
            </p>
            <button onClick={() => setCurrentPage("home")} className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-gray-800 transition">
              Return Home
            </button>
          </div>
        </div>
      )}

      {/* ================= INLINE REUSABLE AUTH MODAL ================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition"
            >
              &times;
            </button>

            {authMode === "login" ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-6">Please enter your details to sign in and place your order</p>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" required placeholder="name@example.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" required placeholder="••••••••" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    />
                  </div>
                  <button type="submit" className="w-full bg-red-700 text-white py-3 sm:py-3.5 rounded-xl font-medium hover:bg-red-800 transition mt-4 shadow-md text-sm">
                    Sign In
                  </button>
                </form>
                <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
                  Don't have an account?{" "}
                  <button onClick={() => setAuthMode("register")} className="text-red-700 font-bold hover:underline">
                    Sign up free
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-gray-900 mb-1">Create Account</h2>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-6">Join Seouhungry today and start tracking nutrition</p>
                
                <form onSubmit={handleRegisterSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" required placeholder="John Doe" value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" required placeholder="name@example.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" required placeholder="••••••••" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    />
                  </div>
                  <button type="submit" className="w-full bg-red-700 text-white py-3 sm:py-3.5 rounded-xl font-medium hover:bg-red-800 transition mt-4 shadow-md text-sm">
                    Create Account
                  </button>
                </form>
                <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
                  Already have an account?{" "}
                  <button onClick={() => setAuthMode("login")} className="text-red-700 font-bold hover:underline">
                    Sign In
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= ACTIVE SHOPPING CART OVERLAY DRAWER ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="bg-white h-full w-full max-w-md shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Your Shopping Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-black font-bold bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition"
                >
                  &times;
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <span className="text-5xl mb-3 block">📥</span>
                  <p className="font-medium">Your shopping cart is currently empty.</p>
                  <p className="text-xs text-gray-400 mt-1">Explore our menus to add healthy items!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.cartId}
                      className="flex gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100 items-center justify-between"
                    >
                      <div className="flex gap-3 items-center">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-white" />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                          <p className="text-xs font-semibold text-red-700 mt-0.5">{item.price}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(item.cartId)}
                        className="text-gray-400 hover:text-red-700 transition text-xs bg-white p-2 rounded-xl border border-gray-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-gray-200 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">Estimated Total:</span>
                  <span className="text-2xl font-serif font-bold text-red-700">{calculateTotalCost()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3.5 rounded-2xl shadow-lg transition"
                >
                  Place Order (Not Paid Yet)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TRACKED ORDERS HISTORY DRAWER OVERLAY ================= */}
      {isOrdersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="bg-white h-full w-full max-w-md shadow-2xl flex flex-col p-6 overflow-y-auto">
            
            {/* Header Section */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">Your Placed Orders</h2>
              <button 
                onClick={() => setIsOrdersOpen(false)}
                className="text-gray-400 hover:text-black font-bold bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition"
              >
                &times;
              </button>
            </div>

            {/* Orders Iterative List */}
            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-500 my-auto">
                <span className="text-5xl mb-3 block">📦</span>
                <p className="font-medium">No placed orders found yet.</p>
                <p className="text-xs text-gray-400 mt-1">Once you check out from your active cart, orders appear here.</p>
              </div>
            ) : (
              <div className="space-y-6 overflow-y-auto pr-1 flex-1">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3"
                  >
                    {/* Top line ID information */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{order.id}</h4>
                        <p className="text-[11px] text-gray-400">Placed at {order.timestamp}</p>
                      </div>
                      
                      {/* Dynamic color badges depending on custom order status state updates */}
                      <span 
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.status === "Paid"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Quick listing text for mini summaries inside order cards */}
                    <div className="text-xs text-gray-600 border-t border-b border-gray-200/60 py-2 space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="line-clamp-1">{item.title}</span>
                          <span className="font-medium text-gray-900">{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total cost display rows and simulate action click handler injections */}
                    <div className="flex justify-between items-center pt-1">
                      <div>
                        <span className="text-[11px] text-gray-400 block font-medium">Total Amount</span>
                        <span className="font-serif font-bold text-base text-gray-900">{order.total}</span>
                      </div>
                      
                      {order.status === "Not Paid Yet" && (
                        <button
                          onClick={() => handlePayOrder(order.id)}
                          className="bg-black hover:bg-neutral-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow"
                        >
                          Simulate Payment
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;