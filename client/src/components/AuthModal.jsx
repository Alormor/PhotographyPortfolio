import { useState } from "react";
import { signIn, signUp } from "../lib/auth-client";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await signUp.email({
          name,
          email,
          password,
        });
        if (res.error) throw new Error(res.error.message || "Failed to sign up");
      } else {
        const res = await signIn.email({
          email,
          password,
        });
        if (res.error) throw new Error(res.error.message || "Invalid credentials");
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-xl bg-surface p-6 sm:p-8 border border-neutral-800 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-text text-xl cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h3 className="font-secondary text-2xl font-bold text-text">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1">
            {isSignUp
              ? "Sign up to book workshop tickets and save favorites"
              : "Sign in to manage your workshop bookings"}
          </p>
        </div>

        {/* Error message banner */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-text mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Clara Fan"
                className="w-full px-3 py-2 bg-bg text-text rounded border border-neutral-700 focus:border-accent focus:outline-none text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-bg text-text rounded border border-neutral-700 focus:border-accent focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-3 py-2 bg-bg text-text rounded border border-neutral-700 focus:border-accent focus:outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2.5 bg-accent text-bg font-bold text-xs uppercase tracking-wider rounded hover:bg-[#e5b382] transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-6 text-center text-xs text-muted">
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-accent font-semibold hover:underline cursor-pointer ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
