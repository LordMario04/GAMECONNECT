"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Icono circular */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00f2ff] to-[#7a00ff] text-white shadow-[0_0_15px_#00f2ff] hover:shadow-[0_0_25px_#7a00ff] transition-all duration-300"
      >
        <FaUser className="text-2xl" />
      </button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-48 rounded-xl bg-[#0b0b1a] border border-[#00f2ff40] shadow-[0_0_15px_#00f2ff80] text-white overflow-hidden backdrop-blur-sm"
          >
            <ul className="flex flex-col text-sm">
              <li className="px-4 py-3 hover:bg-[#00f2ff20] cursor-pointer transition-colors">
                Editar perfil
              </li>
              <li className="px-4 py-3 hover:bg-[#00f2ff20] cursor-pointer transition-colors">
                Mirar mis juegos
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
