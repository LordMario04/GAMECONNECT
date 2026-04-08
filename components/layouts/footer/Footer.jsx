"use client";
import React from "react";
import { Facebook, Instagram, Twitter, Gamepad2 } from "lucide-react";

const Footer = () => (
  <footer className="bg-black text-[#d9d9d9] p-8 sm:p-10 border-t border-[#222] relative overflow-hidden">
    {/* Fondo neón difuminado */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,170,0.1),transparent_70%)] pointer-events-none"></div>

    <div className="flex flex-wrap justify-between items-start gap-10 relative z-10">
      {/* Logo y descripción */}
      <div>
        <div className="flex items-center gap-2">
          <Gamepad2 size={28} className="text-[#00ff99] drop-shadow-[0_0_6px_#00ff99]" />
          <strong className="text-2xl font-bold text-[#9b59ff] drop-shadow-[0_0_8px_#9b59ff]">
            Game Connect
          </strong>
        </div>
        <p className="text-sm sm:text-base text-[#ccc] mt-2">
          Una comunidad global de <span className="text-[#00ffcc] font-semibold">Gamers</span>.
        </p>
      </div>

      {/* Navegación */}
      <nav className="flex flex-wrap gap-5 sm:gap-8 items-center text-sm sm:text-base">
        {[
          "Escríbenos",
          "Normas de la Comunidad",
          "Términos de Servicio",
          "Política de Privacidad",
          "Política de Devolución",
        ].map((item) => (
          <a
            key={item}
            href="#"
            className="text-[#f5f5f5] transition-all duration-200 hover:text-[#00ffcc] hover:drop-shadow-[0_0_6px_#00ffcc]"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Redes sociales */}
      <div className="flex gap-5 items-center mt-4 sm:mt-0">
        <a
          href="#"
          aria-label="Facebook"
          className="text-[#9b59ff] hover:text-[#00ffcc] transition-all duration-300 hover:drop-shadow-[0_0_8px_#00ffcc]"
        >
          <Facebook size={22} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="text-[#ff00aa] hover:text-[#00ffcc] transition-all duration-300 hover:drop-shadow-[0_0_8px_#00ffcc]"
        >
          <Instagram size={22} />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="text-[#00acee] hover:text-[#00ffcc] transition-all duration-300 hover:drop-shadow-[0_0_8px_#00ffcc]"
        >
          <Twitter size={22} />
        </a>
      </div>
    </div>

    {/* Derechos reservados */}
    <div className="flex justify-between items-center mt-8 border-t border-[#222] pt-4 text-sm text-[#888] relative z-10">
      <span>© 2025 <span className="text-[#00ffcc]">Game Connect</span> - Todos los derechos reservados.</span>
    </div>
  </footer>
);

export default Footer;
