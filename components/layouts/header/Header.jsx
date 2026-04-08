"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { CartSheet } from "../../features/SheetDemo";
import { FaUserAstronaut, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "../../../supabase/client";
import { useCart } from "../../features/CartContext";
import AboutModal from '../../AboutModal';

// ----------------------------- COMPONENTES AUXILIARES -----------------------------
function NavButton({ onClick, href, children }) {
  const baseClass =
    "text-white text-sm font-medium relative py-1 transition-colors duration-300 tracking-widest group uppercase";
  const underline = (
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00ffff] transition-all duration-300 group-hover:w-full shadow-[0_0_6px_#00ffff]" />
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClass}>
        <span className="relative inline-block">
          {children}
          {underline}
        </span>
      </button>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      <span className="relative inline-block">
        {children}
        {underline}
      </span>
    </Link>
  );
}

function DropdownMenu({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-pointer text-white text-sm font-medium py-1 tracking-wide uppercase relative inline-block">
        {title}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00ffff] transition-all duration-300 group-hover:w-full shadow-[0_0_6px_#00ffff]" />
      </span>
      <div
        className={`absolute top-full left-0 mt-2 bg-[#0a0a0a]/95 border border-[#00ffff40] rounded-md shadow-lg z-50 w-56 backdrop-blur-md transition-all duration-200 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-white text-sm font-medium hover:text-[#00ffff] hover:pl-6 transition-all duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Modal({ open, onClose, children, size = "w-96" }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-[#0a0a0a] text-white rounded-lg shadow-[0_0_15px_#00ffff40] p-6 relative ${size} max-h-[80vh] overflow-y-auto border border-[#00ffff30]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-[#ff0055] text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function GradientTitle({ children }) {
  return (
    <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#00ffff] to-[#7dffb2] bg-clip-text text-transparent tracking-wide uppercase">
      {children}
    </h2>
  );
}

// ----------------------------- HEADER PRINCIPAL -----------------------------
export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false); // ✅ AGREGADO
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { clearCart } = useCart();

  const buttonStyle = {
    background: "linear-gradient(90deg, #00ffff 0%, #7dffb2 100%)",
    boxShadow: "0 0 10px #00ffff60",
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    clearCart();
    setUser(null);
    alert("👋 Sesión cerrada correctamente");
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-[#050505]/95 border-b border-[#00ffff30] shadow-[0_0_15px_#00ffff20] z-50 text-white relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo-2078018_1280.png"
            alt="Logo"
            className="h-9 drop-shadow-[0_0_10px_#00ffff80]"
          />
          <span className="hidden md:inline text-lg uppercase tracking-widest font-[var(--font-title)] text-[#00ffff] drop-shadow-[0_0_5px_#00ffff]">
            GAME CONNECT
          </span>
        </Link>

        {/* Menú hamburguesa (solo móvil) */}
        <button
          className="lg:hidden text-[#00ffff] text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación desktop */}
        <nav className="hidden lg:flex items-center gap-10 flex-1 justify-center text-sm">
          <NavButton href="/">Inicio</NavButton>
          <NavButton href="/noticias">Noticias</NavButton>
          <DropdownMenu
            title="Ingresar Como"
            items={[
              { href: "/empleado", label: "Como Empleado" },
              { href: "/admin", label: "Como Administrador" },
            ]}
          />
          <DropdownMenu
            title="Secciones"
            items={[
              { href: "/catalogo", label: "Catálogo de Juegos" },
              { href: "/recompensa", label: "Recompensas y Promociones" },
            ]}
          />
          <NavButton onClick={() => setAboutOpen(true)}>Sobre Nosotros</NavButton> {/* ✅ MODIFICADO */}
        </nav>

        {/* Botones desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <>
              <motion.div
                className="text-2xl text-[#00ffff] drop-shadow-[0_0_10px_#00ffff]"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaUserAstronaut />
              </motion.div>
              <span className="text-sm">{user.name}</span>
              <motion.button
                onClick={handleLogout}
                className="text-black text-sm font-bold px-3 py-2 rounded-md uppercase tracking-wide flex items-center gap-2"
                style={buttonStyle}
                whileHover={{ scale: 1.05 }}
              >
                <FaSignOutAlt /> Cerrar sesión
              </motion.button>
            </>
          ) : (
            <>
              <FaUserAstronaut className="text-2xl text-white opacity-80" />
              <motion.button
                onClick={() => setRegisterOpen(true)}
                className="text-black text-sm font-bold px-4 py-2 rounded-md uppercase tracking-wide"
                style={buttonStyle}
                whileHover={{ scale: 1.05 }}
              >
                Registrarse
              </motion.button>
              <motion.button
                onClick={() => setLoginOpen(true)}
                className="text-black text-sm font-bold px-4 py-2 rounded-md uppercase tracking-wide"
                style={buttonStyle}
                whileHover={{ scale: 1.05 }}
              >
                Iniciar Sesión
              </motion.button>
            </>
          )}
        </div>

        {/* Carrito */}
        <div className="hidden lg:block ml-6">
          <CartSheet />
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 border-t border-[#00ffff30] flex flex-col items-center py-4 space-y-3 lg:hidden z-40">
            <NavButton href="/">Inicio</NavButton>
            <NavButton href="/noticias">Noticias</NavButton>
            <NavButton href="/catalogo">Catálogo</NavButton>
            <NavButton href="/recompensa">Recompensas</NavButton>
            <NavButton onClick={() => { setAboutOpen(true); setMenuOpen(false); }}>Sobre Nosotros</NavButton> {/* ✅ MODIFICADO */}

            {user ? (
              <>
                <span className="text-sm">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-black text-sm font-bold px-3 py-2 rounded-md uppercase tracking-wide flex items-center gap-2"
                  style={buttonStyle}
                >
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="text-black text-sm font-bold px-4 py-2 rounded-md uppercase tracking-wide"
                  style={buttonStyle}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    setRegisterOpen(true);
                    setMenuOpen(false);
                  }}
                  className="text-black text-sm font-bold px-4 py-2 rounded-md uppercase tracking-wide"
                  style={buttonStyle}
                >
                  Registrarse
                </button>
              </>
            )}
            <CartSheet />
          </div>
        )}
      </header>

      {/* MODALES */}
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <GradientTitle>Iniciar Sesión</GradientTitle>
        <form
          className="flex flex-col space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            try {
              const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .eq("password", password)
                .single();
              if (error || !data) {
                alert("❌ Correo o contraseña incorrectos");
                return;
              }
              localStorage.setItem("user", JSON.stringify(data));
              setUser(data);
              alert(`✅ Bienvenido, ${data.name || "jugador"}`);
              setLoginOpen(false);
            } catch (err) {
              console.error("Error al verificar login:", err);
              alert("⚠️ Error al iniciar sesión. Intenta nuevamente.");
            }
          }}
        >
          <Input type="email" name="email" placeholder="Correo electrónico" required />
          <Input type="password" name="password" placeholder="Contraseña" required />
          <motion.button
            type="submit"
            className="text-black py-2 rounded-md font-bold uppercase tracking-wide"
            style={buttonStyle}
            whileHover={{ scale: 1.05 }}
          >
            Entrar
          </motion.button>
        </form>
      </Modal>

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <GradientTitle>Registro</GradientTitle>
        <form
          className="flex flex-col space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const createdAt = new Date().toISOString();

            try {
              const { data, error } = await supabase
                .from("users")
                .insert([{ name, email, password, created_at: createdAt }])
                .select()
                .single();

              if (error) {
                console.error("Error al registrar:", error);
                alert("⚠️ Error al registrar usuario");
                return;
              }

              alert(`✅ Usuario registrado correctamente: ${data.name}`);
              setRegisterOpen(false);
            } catch (err) {
              console.error("Error:", err);
              alert("⚠️ Error inesperado al registrar");
            }
          }}
        >
          <Input type="text" name="name" placeholder="Nombre completo" required />
          <Input type="email" name="email" placeholder="Correo electrónico" required />
          <Input type="password" name="password" placeholder="Contraseña" required />
          <motion.button
            type="submit"
            className="text-black py-2 rounded-md font-bold uppercase tracking-wide"
            style={buttonStyle}
            whileHover={{ scale: 1.05 }}
          >
            Registrarse
          </motion.button>
        </form>
      </Modal>

      {/* ✅ MODAL SOBRE NOSOTROS AGREGADO */}
      <AboutModal 
        isOpen={aboutOpen} 
        onClose={() => setAboutOpen(false)} 
      />
    </>
  );
}