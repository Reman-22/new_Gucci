import { Link } from "react-router-dom";

export function VideoServices() {
  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-24">
          
          {/* Video 1: Find a Store */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-full aspect-square md:aspect-[4/5] overflow-hidden mb-8 bg-[#f5f5f5] rounded-3xl">
              <video 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              >
                <source src="https://videos.pexels.com/video-files/9463387/9463387-uhd_4096_2160_25fps.mp4" type="video/mp4" />
              </video>
            </div>
            <h3 className="font-serif text-[24px] md:text-[32px] text-[#111111] mb-3 tracking-wide select-none">
              Find a Boutique
            </h3>
            <p className="text-[14px] text-[#666666] mb-6 max-w-sm font-light leading-relaxed">
              Discover our global locations and book a personalized appointment with our dedicated client advisors.
            </p>
            <Link 
              to="/services" 
              state={{ tab: "store" }}
              className="text-[12px] tracking-[0.2em] uppercase text-[#111111] border-b border-[#111111] pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors duration-300"
            >
              Find a Store
            </Link>
          </div>

          {/* Video 2: Services */}
          <div className="flex flex-col items-center text-center group mt-8 md:mt-0">
            <div className="w-full aspect-square md:aspect-[4/5] overflow-hidden mb-8 bg-[#f5f5f5] rounded-3xl">
              <video 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              >
                <source src="https://videos.pexels.com/video-files/9595333/9595333-uhd_4096_2160_25fps.mp4" type="video/mp4" />
              </video>
            </div>
            <h3 className="font-serif text-[24px] md:text-[32px] text-[#111111] mb-3 tracking-wide select-none">
              Bespoke Services
            </h3>
            <p className="text-[14px] text-[#666666] mb-6 max-w-sm font-light leading-relaxed">
              Explore our exclusive offerings, from custom commissions and lifetime repairs to dedicated gift concierges.
            </p>
            <Link 
              to="/services" 
              state={{ tab: "services" }}
              className="text-[12px] tracking-[0.2em] uppercase text-[#111111] border-b border-[#111111] pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors duration-300"
            >
              Explore Services
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
