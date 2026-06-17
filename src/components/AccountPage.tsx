import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Tab = "login" | "orders" | "settings" | "address" | "wallet" | "saved" | "appointments";

export function AccountPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("login");

  // Read tab from navigation state if available
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab as Tab);
    }
  }, [location.state]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "login", label: "Sign In" },
    { id: "orders", label: "My Orders" },
    { id: "settings", label: "Account Settings" },
    { id: "address", label: "Address Book" },
    { id: "wallet", label: "Wallet" },
    { id: "saved", label: "Saved Items" },
    { id: "appointments", label: "My Appointments" },
  ];

  return (
    <div className="bg-white">
      <div className="px-4 md:px-6 pt-16 pb-8 md:pt-24 md:pb-12 border-b border-[var(--color-rule)]">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink-muted)] mb-4">Account</p>
        <h1 className="font-serif font-light text-[48px] md:text-[64px] leading-[0.95] tracking-[-0.01em]">My Account</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-6 py-6 border-b border-[var(--color-rule)] flex items-center gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase whitespace-nowrap border transition-colors duration-[var(--duration-instant)] ${
              activeTab === t.id
                ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                : "bg-white text-[var(--color-ink-soft)] border-transparent hover:border-[var(--color-ink)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 md:px-6 py-16 md:py-20">
        {activeTab === "login" && <LoginForm />}
        {activeTab === "orders" && <EmptyTab title="My Orders" desc="You haven't placed any orders yet." />}
        {activeTab === "settings" && <EmptyTab title="Account Settings" desc="Manage your personal information and preferences." />}
        {activeTab === "address" && <EmptyTab title="Address Book" desc="Manage your shipping and billing addresses." />}
        {activeTab === "wallet" && <PaymentMethods />}
        {activeTab === "saved" && <EmptyTab title="Saved Items" desc="Items you save will appear here." />}
        {activeTab === "appointments" && <EmptyTab title="My Appointments" desc="You have no upcoming appointments." />}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  async function mockHash(_pwd: string) {
    // Visual simulation of password hashing time
    return new Promise((resolve) => setTimeout(resolve, 800));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      if (!phoneRegex.test(phone)) {
        setError("Please enter a valid phone number.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setIsProcessing(true);
    await mockHash(password); // Simulate secure hashing
    setIsProcessing(false);
    
    alert(`${mode === "signin" ? "Signed in" : "Registered securely"}!`);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-8 bg-[var(--color-surface-raised)] p-1 rounded-full w-fit mx-auto">
        <button
          onClick={() => { setMode("signin"); setError(""); }}
          className={`px-6 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase transition-colors duration-[var(--duration-fast)] ${
            mode === "signin" ? "bg-[var(--color-ink)] text-white shadow-md" : "text-[var(--color-ink-soft)] hover:bg-white"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setMode("register"); setError(""); }}
          className={`px-6 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase transition-colors duration-[var(--duration-fast)] ${
            mode === "register" ? "bg-[var(--color-ink)] text-white shadow-md" : "text-[var(--color-ink-soft)] hover:bg-white"
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="account-email" className="text-[11px] tracking-[0.18em] uppercase block mb-2 text-[var(--color-ink-soft)]">Email</label>
          <input
            id="account-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-[var(--color-rule)] text-[13px] focus:outline-none focus:border-[var(--color-ink)] transition-colors duration-[var(--duration-instant)]"
            placeholder="your@email.com"
          />
        </div>
        
        {mode === "register" && (
          <div>
            <label htmlFor="account-phone" className="text-[11px] tracking-[0.18em] uppercase block mb-2 text-[var(--color-ink-soft)]">Phone Number</label>
            <input
              id="account-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[var(--color-rule)] text-[13px] focus:outline-none focus:border-[var(--color-ink)] transition-colors duration-[var(--duration-instant)]"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        )}

        <div>
          <label htmlFor="account-password" className="text-[11px] tracking-[0.18em] uppercase block mb-2 text-[var(--color-ink-soft)]">Password</label>
          <input
            id="account-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-[var(--color-rule)] text-[13px] focus:outline-none focus:border-[var(--color-ink)] transition-colors duration-[var(--duration-instant)]"
            placeholder="••••••••"
          />
        </div>

        {mode === "register" && (
          <div>
            <label htmlFor="account-confirm" className="text-[11px] tracking-[0.18em] uppercase block mb-2 text-[var(--color-ink-soft)]">Confirm Password</label>
            <input
              id="account-confirm" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[var(--color-rule)] text-[13px] focus:outline-none focus:border-[var(--color-ink)] transition-colors duration-[var(--duration-instant)]"
              placeholder="••••••••"
            />
          </div>
        )}

        {error && <p className="text-[12px] text-red-600 bg-red-50 p-3 rounded-2xl">{error}</p>}

        <button 
          type="submit" 
          disabled={isProcessing}
          className="w-full py-4 mt-2 rounded-full bg-[var(--color-ink)] text-white text-[12px] tracking-[0.22em] uppercase hover:bg-[var(--color-ink-soft)] transition-colors duration-[var(--duration-instant)] disabled:opacity-70 shadow-md"
        >
          {isProcessing ? "Processing..." : (mode === "signin" ? "Sign In" : "Create Account")}
        </button>
      </form>
    </div>
  );
}

function EmptyTab({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="text-center py-16">
      <p className="font-serif text-[24px]">{title}</p>
      <p className="mt-3 text-[13px] text-[var(--color-ink-muted)]">{desc}</p>
    </div>
  );
}

function PaymentMethods() {
  const methods = [
    { type: "Visa", last4: "4242", exp: "08/28", default: true },
    { type: "Mastercard", last4: "1234", exp: "12/27", default: false },
  ];

  return (
    <div className="max-w-md mx-auto">
      <p className="text-[11px] tracking-[0.22em] uppercase mb-6">Saved Payment Methods</p>
      <div className="space-y-4">
        {methods.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-[var(--color-rule)] rounded-2xl">
            <div>
              <p className="text-[13px] font-medium">{m.type} ···· {m.last4}</p>
              <p className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">Expires {m.exp}</p>
            </div>
            {m.default && <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)] bg-[var(--color-surface-raised)] px-3 py-1 rounded-full">Default</span>}
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-4 rounded-full border border-[var(--color-rule)] text-[11px] tracking-[0.22em] uppercase hover:border-[var(--color-ink)] transition-colors duration-[var(--duration-instant)]">
        Add New Card
      </button>
    </div>
  );
}
