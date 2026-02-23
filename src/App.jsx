import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ParallaxBackground from "./components/ParallaxBackground";

export default function App() {
  const [githubData, setGithubData] = useState(null);


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_GITHUB_API_LINK)
      .then((res) => setGithubData(res.data))
      .catch(() => { });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center relative overflow-hidden">

      {/* 🔲 Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* 🌐 Floating Social Icons */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 space-y-4 hidden md:block">
        <a href={import.meta.env.VITE_GITHUB_LINK} target="_blank" className="text-gray-400 hover:text-white"><Github /></a>
        <a href={import.meta.env.VITE_LINKEDIN_LINK} target="_blank" className="text-gray-400 hover:text-white"><Linkedin /></a>
        {/* <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a> */}
      </div>

      {/* 🧠 Mouse Parallax Icons */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxIcon x={15} y={10} speed={30} label="JS" />
        <ParallaxIcon x={80} y={20} speed={30} label="TS" />
        <ParallaxIcon x={90} y={60} speed={30} label="C++" />
        <ParallaxIcon x={20} y={70} speed={30} label="Go" />
        <ParallaxIcon x={65} y={80} speed={30} label="Java" />
        <ParallaxIcon x={5} y={40} speed={30} label="Swift" />
      </div> */}
      <ParallaxBackground />

      {/* 🧑 Main Card */}
      <div className="relative z-10 w-full max-w-md text-center px-6">

        {/* 👤 Profile Image + Online Dot */}
        <div className="flex justify-center mb-4 relative">
          <img
            src="/profile-img.png"
            alt="profile"
            className="h-45 w-45 rounded-full border-4 border-white/80 shadow-lg object-cover"
          />

          {/* 🟢 Online Status */}
          <span className="absolute bottom-2 right-[calc(50%-56px)] w-5 h-5 bg-green-500 border-2 border-[#0b0b0f] rounded-full"></span>
        </div>

        {/* 🧑 Name */}
        <h1 className="text-3xl font-bold">Khushmeet Saini</h1>

        {/* ✨ Typing Role Animation */}
        <p className="text-cyan-400 font-medium mt-2 h-6">
          <Typewriter
            words={[
              "Frontend Developer",
              "React Specialist",
              "MERN Developer",
            ]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 mb-6 text-sm">
          <span className="text-gray-400">📍 Chandigarh, India</span>

          <span className="text-gray-600 hidden sm:block">|</span>

          <span className="text-green-400 font-medium">
            Available
          </span>
        </div>

        {/* 📊 GitHub Stats */}
        {githubData && (
          <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
            <div className="bg-gray-900 p-3 rounded-lg shadow-sm shadow-cyan-600/50">
              <p className="font-bold">{githubData.public_repos}</p>
              <p className="text-gray-400">Repos</p>
            </div>

            <div className="bg-gray-900 p-3 rounded-lg shadow-sm shadow-cyan-600/50">
              <p className="font-bold">600+</p>
              <p className="text-gray-400">Followers</p>
            </div>

            <div className="bg-gray-900 p-3 rounded-lg shadow-sm shadow-cyan-600/50">
              <p className="font-bold">500+</p>
              <p className="text-gray-400">Connections</p>
            </div>
          </div>
        )}

        {/* 🔗 Social Buttons */}
        <div className="space-y-4">

          <SocialButton icon={<Github />} label="GitHub" link={import.meta.env.VITE_GITHUB_LINK} />
          <SocialButton icon={<Linkedin />} label="LinkedIn" link={import.meta.env.VITE_LINKEDIN_LINK} />

          {/* 💜 Portfolio CTA */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={import.meta.env.VITE_PORTFOLIO_LINK}
            className="block mt-4 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-xl py-3 font-semibold text-lg shadow-lg"
          >
            View Portfolio
          </motion.a>

        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Button Component
function SocialButton({ icon, label, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between bg-gray-900 hover:bg-gray-800 border border-cyan-600/30 rounded-xl px-5 py-4 transition hover:shadow-md hover:shadow-cyan-600/50"
    >
      <div className="flex items-center gap-3">
        <span className="text-cyan-400">{icon}</span>
        <span>{label}</span>
      </div>
      <ArrowUpRight size={18} />
    </a>
  );
}


function ParallaxIcon({ x, y, speed = 3, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const moveX = (e.clientX - innerWidth / 2) / speed;
      const moveY = (e.clientY - innerHeight / 2) / speed;

      if (ref.current) {
        ref.current.style.transform =
          `translate(calc(${x}vw + ${moveX}px), calc(${y}vh + ${moveY}px))`;
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [speed, x, y]);

  return (
    <div
      ref={ref}
      className="absolute w-16 h-16 rounded-xl
      bg-white/5 backdrop-blur-md
      border border-white/10
      flex items-center justify-center
      text-gray-300 font-semibold shadow-lg"
      style={{
        transform: `translate(${x}vw, ${y}vh)`
      }}
    >
      {label}
    </div>
  );
}