import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-[#111]">
      <div className="absolute inset-0">
        <video 
          autoPlay loop muted playsInline 
          className="h-full w-full object-cover opacity-80"
          poster="https://images.pexels.com/videos/6661932/pexels-photo-6661932.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
        >
          <source src="https://videos.pexels.com/video-files/6661932/6661932-uhd_4096_2160_25fps.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="font-serif text-[44px] md:text-[80px] lg:text-[110px] leading-[0.9] tracking-widest uppercase drop-shadow-xl select-none">
          The Artisan <br /> <em className="italic font-light">Collection</em>
        </h1>
        <Link
          to="/category/Women"
          className="mt-12 px-10 py-4 border border-white text-white text-[12px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors duration-500 rounded-full"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
