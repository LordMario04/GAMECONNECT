"use client";
import BackgroundVideo from "@/components/features/BackgroundVideo";
import { CarouselSpacing } from "@/components/features/CarouselDemo";
import FAQSection from "@/components/features/FAQSection";
import Hero from "../components/ui/HeroParallaxDemo";
import React, { useRef } from "react";
import GamingCarousel from "@/components/features/GamingCarousel";

export default function Page() {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a001a] text-white overflow-hidden">
      {/* 🌌 Efecto de partículas o fondo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(157,78,221,0.15),transparent_80%)] animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-10 pointer-events-none" />

      {/* 🎬 HERO con video de fondo */}
      <div className="w-full border-b border-fuchsia-700/50 shadow-[0_0_40px_rgba(255,0,255,0.4)]">
        <BackgroundVideo src="/videos/89894-616430996.mp4" overlay={true}>
          <Hero />
        </BackgroundVideo>
      </div>

      {/* ⚡ División neón entre secciones */}
      <div className="w-full h-1 bg-gradient-to-r from-fuchsia-600 via-purple-400 to-fuchsia-600 animate-pulse shadow-[0_0_20px_rgba(255,0,255,0.8)]"></div>

      {/* 🕹️ Carrusel de noticias destacadas */}
      <section className="relative w-full py-12 bg-[#0a001a] flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,0,211,0.15),transparent_70%)] animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]">
          🚀 DESTACADOS DE LA SEMANA
        </h2>
        <div className="max-w-[95%] mx-auto z-10">
          <GamingCarousel />
        </div>
      </section>

      {/* ⚡ División neón */}
      <div className="w-full h-1 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-purple-600 animate-pulse shadow-[0_0_20px_rgba(200,0,255,0.8)]"></div>

      {/* 💎 Recompensas y Promociones */}
      <section className="w-full px-6 py-16 bg-[#0a001a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,255,0.1),transparent_70%)]" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-[0_0_15px_rgba(255,0,255,0.7)]">
          🎮 RECOMPENSAS Y PROMOCIONES
        </h2>

        <div className="flex flex-wrap justify-center gap-10 relative z-10">
          {[
            {
              title: "10% Descuento en tu Primera Compra",
              desc: "Regístrate y obtén un 10% de descuento en tu primera compra.",
            },
            {
              title: "Programa de Puntos de Fidelidad",
              desc: "Acumula puntos con cada compra y canjéalos por descuentos en futuras compras.",
            },
            {
              title: "Ofertas Especiales Semanales",
              desc: "Consulta nuestras ofertas especiales cada semana y ahorra en tus juegos favoritos.",
            },
            {
              title: "Promoción de Recomendación",
              desc: "Recomienda a un amigo y recibe un cupón de descuento en tu próxima compra.",
            },
          ].map((reward, index) => (
            <div
              key={index}
              className="bg-[#1a003a]/80 backdrop-blur-md border border-fuchsia-600/40 rounded-2xl p-6 w-[320px] sm:w-[350px] hover:scale-105 hover:shadow-[0_0_35px_#ff00ff] transition-all duration-300 hover:border-fuchsia-400"
            >
              <h3 className="text-xl font-semibold text-fuchsia-400 mb-3">
                {reward.title}
              </h3>
              <p className="text-gray-300 text-sm">{reward.desc}</p>
              <div className="mt-5 flex justify-center">
                <button className="px-5 py-2 text-sm font-bold text-white rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.5)]">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🌈 Luces ambientales dinámicas */}
        <div className="absolute -bottom-24 -right-20 w-[300px] h-[300px] bg-fuchsia-600/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-10 -left-20 w-[250px] h-[250px] bg-purple-700/30 blur-[100px] rounded-full animate-pulse"></div>
      </section>

      {/* ⚡ División neón */}
      <div className="w-full h-1 bg-gradient-to-r from-fuchsia-500 via-purple-400 to-fuchsia-500 animate-pulse shadow-[0_0_25px_rgba(255,0,255,0.7)]"></div>

      {/* 💬 Preguntas Frecuentes */}
      <section className="relative w-full py-1 bg-[#0a001a] mb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,255,0.15),transparent_80%)] animate-pulse" />
        <FAQSection />
      </section>
    </main>
  );
}
