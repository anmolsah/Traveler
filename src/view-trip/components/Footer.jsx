import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../../App.css'

function Footer() {
  return (
    <div className=" text-[#F5F5F5] py-2 mt-6 cursor-pointer">
      <div className="footer">
        <img src="/rahi-logo.png" alt="RAHi Logo" className="h-auto w-12" />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
          RAHi
        </h1>
      </div>
      <h2 className="text-center font-mono text-xl mb-4 text-[#073107]">
        Created By Anmol - RAHi
      </h2>
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/anmolsah"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FC5185] hover:text-[#3FC1C9] text-2xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/anmol-sah-551083238/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FC5185] hover:text-[#3FC1C9] text-2xl"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Footer;
