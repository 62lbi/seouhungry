
import { useState } from "react";

function App() {

  // ================= SLIDER DATA =================
  // All food and drink items stored in one array
  const nutritionItems = [

    {
      title: "Grilled Chicken Salad",

      image:
        "https://assets.epicurious.com/photos/64a845e67799ee8651e4fb8f/1:1/w_4198,h_4198,c_limit/AshaGrilledChickenSalad_RECIPE_070523_56498.jpg",

      calories: "350 kcal",
      protein: "30g",
      carbs: "15g",
      fat: "18g",
      extra: "Fiber: 5g",

      description:
        "High in protein and fiber, good for muscle growth and digestion.",
    },

    {
      title: "Salmon with Brown Rice",

      image:
        "https://www.sidechef.com/recipe/d196167d-562e-45ae-977a-0d1c3aa3b93c.jpg",

      calories: "520 kcal",
      protein: "35g",
      carbs: "40g",
      fat: "22g",
      extra: "Omega-3: High",

      description:
        "Rich in omega-3 and protein, supports heart and brain health.",
    },

    {
      title: "Banana Protein Smoothie",

      image:
        "https://cdn.lemonsforlulu.com/wp-content/uploads/2015/02/Roasted-Banana-Smoothie-Recipe-7.jpg",

      calories: "280 kcal",
      protein: "24g",
      carbs: "30g",
      fat: "6g",
      extra: "Sugar: 14g",

      description:
        "Great post-workout drink with high protein and natural energy.",
    },

    {
      title: "Green Detox Juice",

      image:
        "https://www.watermelon.org/wp-content/uploads/2017/07/super-green-detox-smoothie-scaled.jpg",

      calories: "120 kcal",
      protein: "3g",
      carbs: "20g",
      fat: "1g",
      extra: "Vitamin C: High",

      description:
        "Low-calorie drink packed with vitamins and antioxidants.",
    },
  ];

  // ================= CURRENT SLIDE =================
  const [currentIndex, setCurrentIndex] = useState(0);

  // ================= NEXT BUTTON =================
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === nutritionItems.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  // ================= PREVIOUS BUTTON =================
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? nutritionItems.length - 1
        : prevIndex - 1
    );
  };

  // Current displayed item
  const currentItem = nutritionItems[currentIndex];

  return (
    <div className="min-h-screen bg-white">

      {/* ================= NAVBAR ================= */}
      <div className="w-full flex items-center justify-between px-16 py-6 absolute top-0 left-0 z-20">

        {/* Website title */}
        <h1 className="text-4xl font-bold italic text-white">
          Seouhungry
        </h1>

        {/* Navigation links */}
        <ul className="flex gap-8 font-medium text-white">

          {/* Active page */}
          <li className="bg-white text-black px-4 py-2 rounded-full">
            Home
          </li>

          <li>About</li>
          <li>Menu</li>
          <li>Pages</li>
          <li>Contact</li>
        </ul>

        {/* Navbar button */}
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

        {/* Hero content */}
        <div className="relative z-10 px-5 max-w-4xl">

          {/* Main heading */}
          <h1 className="text-6xl md:text-6xl font-serif leading-tight text-white">
            Know what you eat, eat what you love
          </h1>

          {/* Description */}
          <p className="mt-8 text-xl text-gray-200 leading-relaxed">
            Discover the best food and drinks in town.
            From traditional dishes to modern cuisine,
            selected with care and served with perfection
          </p>

          {/* Hero buttons */}
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

        {/* Section title */}
        <h1 className="text-5xl font-bold text-center mb-6">
          What Makes Our Service Different?
        </h1>

        {/* Section description */}
        <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          At Seouhungry, we do more than just serve delicious food.
          We help people understand what they eat by providing
          nutritional information alongside every food and drink item.
          This allows our customers to enjoy meals they love while
          maintaining a healthier lifestyle.
        </p>
      </section>

      {/* ================= NUTRITION SLIDER SECTION ================= */}
      <section className="py-24 bg-white">

        {/* Main title */}
        <h1 className="text-5xl font-bold text-center mb-16">
          Nutritional Food & Drinks
        </h1>

        {/* Slider container */}
        <div className="flex items-center justify-center gap-8 px-10">

          {/* ================= LEFT ARROW BUTTON ================= */}
          <button
            onClick={prevSlide}
            className="
              w-16
              h-16
              rounded-full
              bg-red-700
              text-white
              text-3xl
              flex
              items-center
              justify-center
              hover:bg-red-800
              transition
              shadow-lg
            "
          >
            ←
          </button>

          {/* ================= SLIDER CARD ================= */}
          <div
            className="
              max-w-5xl
              w-full
              bg-gray-50
              rounded-3xl
              shadow-2xl
              overflow-hidden
              flex
              flex-col
              md:flex-row
            "
          >

            {/* Food/drink image */}
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="
                w-full
                md:w-[500px]
                h-[500px]
                object-cover
              "
            />

            {/* Nutrition information */}
            <div className="p-12 flex flex-col justify-center">

              {/* Food/drink title */}
              <h2 className="text-4xl font-bold mb-8">
                {currentItem.title}
              </h2>

              {/* Nutritional facts */}
              <div className="space-y-4 text-lg text-gray-700">

                <p>
                  <span className="font-bold">Calories:</span>{" "}
                  {currentItem.calories}
                </p>

                <p>
                  <span className="font-bold">Protein:</span>{" "}
                  {currentItem.protein}
                </p>

                <p>
                  <span className="font-bold">Carbohydrates:</span>{" "}
                  {currentItem.carbs}
                </p>

                <p>
                  <span className="font-bold">Fat:</span>{" "}
                  {currentItem.fat}
                </p>

                <p>
                  <span className="font-bold">
                    {currentItem.extra}
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                {currentItem.description}
              </p>
            </div>
          </div>

          {/* ================= RIGHT ARROW BUTTON ================= */}
          <button
            onClick={nextSlide}
            className="
              w-16
              h-16
              rounded-full
              bg-red-700
              text-white
              text-3xl
              flex
              items-center
              justify-center
              hover:bg-red-800
              transition
              shadow-lg
            "
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
