import { useState } from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing to Omran updates.");
      setEmail("");
    }
  }

  return (
    <footer className="bg-[#111111] text-[#e8dccb] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        {/* ───── Top Section (Newsletter/CTA) ───── */}
        <div className="text-center mb-24 md:mb-32">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#a99c8f] mb-6">
            SIGN UP FOR OMRAN UPDATES
          </p>
          <p className="max-w-2xl mx-auto text-[14px] md:text-[16px] leading-[1.8] tracking-widest font-light mb-10 text-[#f2ebe1]">
            Get exclusive updates on our latest software releases, solutions, and news.
          </p>
          <button className="text-[13px] tracking-[0.2em] uppercase border-b border-[#e8dccb] pb-1 hover:text-[#a99c8f] hover:border-[#a99c8f] transition-colors duration-500">
            + Subscribe
          </button>
        </div>

        {/* ───── Bottom Section (Grid Links) ───── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-[12px] tracking-[0.25em] uppercase mb-8 text-[#f2ebe1]">MAY WE HELP YOU?</h3>
            <ul className="space-y-4">
              {["Contact Us", "Status", "FAQs", "Client Care"].map((item) => (
                <li key={item}>
                  <Link 
                    to="/" 
                    className="text-[13px] text-[#a99c8f] tracking-wide hover:text-[#e8dccb] hover:underline underline-offset-[6px] decoration-1 transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[12px] tracking-[0.25em] uppercase mb-8 text-[#f2ebe1]">THE COMPANY</h3>
            <ul className="space-y-4">
              {["Careers", "Legal", "About Us", "Sustainability"].map((item) => (
                <li key={item}>
                  <Link 
                    to="/" 
                    className="text-[13px] text-[#a99c8f] tracking-wide hover:text-[#e8dccb] hover:underline underline-offset-[6px] decoration-1 transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <div className="mb-14">
              <h3 className="text-[12px] tracking-[0.25em] uppercase mb-6 text-[#f2ebe1]">STORE LOCATOR</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter your region..." 
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[13px] placeholder:text-[#666666] text-[#e8dccb] focus:outline-none focus:border-[#e8dccb] transition-colors duration-500"
                />
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className="relative mb-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail" 
                  required
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-[13px] placeholder:text-[#666666] text-[#e8dccb] focus:outline-none focus:border-[#e8dccb] transition-colors duration-500"
                />
              </div>
              <p className="text-[10px] leading-[1.8] text-[#777777] tracking-wider mt-4">
                By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives. More details on this are provided in our <Link to="/" className="underline underline-offset-2 hover:text-[#a99c8f] transition-colors">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
        
        {/* ───── Very Bottom ───── */}
        <div className="mt-24 pt-10 border-t border-[#222222] flex flex-col items-center gap-10 overflow-hidden">
          <p className="text-center text-[#777777] text-[10px] tracking-[0.25em] uppercase">
            © {new Date().getFullYear()} MAISON ARTÉ. All rights reserved.
          </p>
          
          {/* Website Name rendered at the very bottom in large bold font */}
          <div className="w-full flex justify-center pb-2 select-none">
            <span className="font-serif font-bold text-[56px] md:text-[140px] leading-[0.8] tracking-widest text-[#1a1a1a] opacity-80 whitespace-nowrap">
              MAISON ARTÉ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
