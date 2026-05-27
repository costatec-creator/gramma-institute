import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0805]">
      <div className="text-center px-6">
        <p className="font-cinzel text-xs tracking-[0.4em] text-amber-400/60 uppercase mb-6">
          Gramma Institute
        </p>
        <h1
          className="font-cormorant text-white font-light mb-6"
          style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}
        >
          404
        </h1>
        <p className="font-eb-garamond text-white/50 text-xl mb-10">
          This page does not exist.
        </p>
        <Link
          href="/"
          className="font-cinzel text-sm tracking-[0.2em] px-8 py-3 border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-all duration-300"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
