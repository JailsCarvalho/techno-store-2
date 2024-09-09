"use client";
import React, { useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isHiding, setIsHiding] = useState(false);

  const handleClick = () => {
    setIsHiding(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 500); // Wait for the animation to complete
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-between bg-white cursor-pointer relative overflow-hidden transition-transform duration-500 ease-in-out ${
        isHiding ? "translate-y-[-100%]" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center items-center flex-1 w-full p-4">
        <div className="relative w-[90%] h-[50vh] max-h-[40%]">
          <Image
            src="/images/splash-logo.svg"
            alt="Techno Store Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      <div className="w-full h-[30%] relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[150%] h-[200%] rounded-[50%] bg-gradient-to-b from-[#B8EF78] to-[#66B118]"></div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-14">
          <p className="text-white text-xl sm:text-2xl md:text-6xl lg:text-8xl  font-bold">
            CLIQUE PARA COMEÇAR
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
