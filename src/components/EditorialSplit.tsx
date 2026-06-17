import { Link } from "react-router-dom";

export function EditorialSplit() {
  return (
    <section className="w-full bg-white pt-2 md:pt-4">
      {/* 2-Column Grid with tight gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 px-1 md:px-2">
        
        {/* Left Column */}
        <div className="relative group overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-[#111]">
          <img 
            src="https://images.pexels.com/photos/8767269/pexels-photo-8767269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900" 
            alt="Women's Collection" 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
          
          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center text-center pointer-events-none">
            <h2 className="text-white font-serif text-[32px] md:text-[44px] mb-4 tracking-wide select-none drop-shadow-md">
              Women's Fall Winter
            </h2>
            <Link 
              to="/category/Women" 
              className="pointer-events-auto text-white text-[11px] tracking-[0.25em] uppercase border-b border-white pb-1 hover:text-white/70 hover:border-white/70 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative group overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-[#111]">
          <img 
            src="https://images.pexels.com/photos/5706269/pexels-photo-5706269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900" 
            alt="Men's Collection" 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
          
          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center text-center pointer-events-none">
            <h2 className="text-white font-serif text-[32px] md:text-[44px] mb-4 tracking-wide select-none drop-shadow-md">
              Men's Tailoring
            </h2>
            <Link 
              to="/category/Men" 
              className="pointer-events-auto text-white text-[11px] tracking-[0.25em] uppercase border-b border-white pb-1 hover:text-white/70 hover:border-white/70 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
