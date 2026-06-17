import { Link } from "react-router-dom";

const CATEGORIES = [
  { label: "HANDBAGS", image: "https://images.pexels.com/photos/20380733/pexels-photo-20380733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", link: "/category/Women?sub=Bags" },
  { label: "SANDALS", image: "https://images.pexels.com/photos/9463353/pexels-photo-9463353.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", link: "/category/Women?sub=Shoes" },
  { label: "SNEAKERS", image: "https://images.pexels.com/photos/37443512/pexels-photo-37443512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", link: "/category/Men?sub=Shoes" },
  { label: "ACCESSORIES", image: "https://images.pexels.com/photos/34372582/pexels-photo-34372582.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", link: "/category/Women?sub=Jewelry" },
];

export function FourColumnGrid() {
  return (
    <section className="w-full bg-white">
      {/* Seamless Grid (gap-0) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {CATEGORIES.map((item, idx) => (
          <Link key={idx} to={item.link} className="group flex flex-col items-center">
            {/* Vertically rectangular aspect ratio */}
            <div className="w-full aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
              <img 
                src={item.image} 
                alt={item.label} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
              />
            </div>
            {/* Minimalist Centered Text */}
            <div className="py-6 text-center w-full">
              <span className="text-[12px] md:text-[13px] tracking-[0.2em] text-[#111111] uppercase font-medium relative inline-block">
                {item.label}
                {/* Custom animated underline effect */}
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#111111] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
