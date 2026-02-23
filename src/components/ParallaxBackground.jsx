import { useEffect, useRef } from "react";
import {
    FaReact,
    FaNodeJs,
    FaJs,
} from "react-icons/fa";

import {
    SiNextdotjs,
    SiTailwindcss,
    SiMysql,
} from "react-icons/si";

function ParallaxBackground() {
    const containerRef = useRef(null);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;

        const speed = 0.05; // 👈 smaller = smoother

        const handleMove = (e) => {
            mouseX = e.clientX - window.innerWidth / 2;
            mouseY = e.clientY - window.innerHeight / 2;
        };

        const animate = () => {
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;

            const objects =
                containerRef.current.querySelectorAll(".object");

            objects.forEach((el) => {
                const depth = el.getAttribute("data-value");

                const x = (currentX * depth) / 100;
                const y = (currentY * depth) / 100;

                el.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >

            {/* GROUP 1 */}
            <div className="logo-xs object left-[5%] top-[15%]" data-value="5" />
            <div className="logo-sm object left-[8%] top-[50%]" data-value="1" />
            <div className="logo-md object left-[10%] top-[20%]" data-value="6">
                <FaReact className="text-cyan-400 text-3xl opacity-80" />
            </div>

            <div className="logo-xs object left-[10%] top-[70%]" data-value="2" />
            <div className="logo-md object left-[20%] top-[70%]" data-value="4">
                <SiTailwindcss className="text-sky-400 text-4xl opacity-70" />
            </div>

            {/* GROUP 2 */}
            <div className="logo-md object left-[30%] top-[10%]" data-value="1" />
            <div className="logo-sm object left-[35%] top-[25%]" data-value="4" />
            {/* NODE JS */}
            <div className="logo-lg object left-[25%] top-[35%]" data-value="8">
                <FaNodeJs className="text-green-500 text-5xl opacity-80" />
            </div>
            <div className="logo-md object right-[5%] top-[40%]" data-value="5">
                <FaJs className="text-yellow-400 text-4xl opacity-80" />
            </div>
            <div className="logo-md object left-[33%] top-[85%]" data-value="4" />

            {/* GROUP 3 */}
            <div className="logo-xs object right-[15%] top-[15%]" data-value="5" />
            <div className="logo-sm object right-[20%] top-[40%]" data-value="3" />
            <div className="logo-lg object right-[25%] top-[20%]" data-value="7">
                <SiNextdotjs className="text-white text-5xl opacity-80" />
            </div>
            <div className="logo-xs object right-[18%] top-[60%]" data-value="3" />
            <div className="logo-md object right-[15%] top-[80%]" data-value="6">
                <SiMysql className="text-blue-400 text-4xl opacity-80" />
            </div>

        </div>
    );
}

export default ParallaxBackground;