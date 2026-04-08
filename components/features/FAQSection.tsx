"use client";
import React, { useState } from "react";
import { Sparkles, ChevronDown, Flame, Star, Trophy } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo puedo registrarme?",
    answer:
      "Puedes registrarte haciendo clic en el botón de 'Registro' y completando el formulario con tus datos.",
    tag: "Cuenta",
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer:
      "Aceptamos tarjetas de crédito, débito y pagos a través de PayPal o plataformas gamer seguras.",
    tag: "Pagos",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer:
      "Sí, tienes hasta 30 días para solicitar la devolución desde la fecha de compra. El reembolso se realiza mediante tu método original de pago.",
    tag: "Soporte",
  },
  {
    question: "¿Hay descuentos para miembros?",
    answer:
      "Sí, nuestros miembros VIP obtienen promociones exclusivas, puntos de recompensa y acceso anticipado a lanzamientos.",
    tag: "Beneficios",
  },
];

const highlights = [
  {
    id: 1,
    title: "Evento GamerFest 2025 confirmado 🎮",
    description: "La convención más grande del año llega con torneos, sorteos y nuevos lanzamientos.",
    icon: <Flame className="text-pink-500" size={20} />,
    tag: "Eventos",
  },
  {
    id: 2,
    title: "Nuevas recompensas en nuestra tienda 🏆",
    description: "Acumula puntos por cada compra y desbloquea premios exclusivos.",
    icon: <Trophy className="text-purple-400" size={20} />,
    tag: "Recompensas",
  },
  {
    id: 3,
    title: "Top 10 lanzamientos del mes 🚀",
    description: "Descubre los videojuegos más esperados de octubre seleccionados por nuestros jugadores.",
    icon: <Star className="text-fuchsia-400" size={20} />,
    tag: "Lanzamientos",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#1e003e] via-[#3b007a] to-[#5b00d3] py-16 overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute -top-24 -left-20 w-[300px] h-[300px] bg-fuchsia-600/40 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-purple-700/30 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start p-6 gap-10 relative z-10">
        {/* Columna lateral estilo “Trending” */}
        <div className="md:w-2/5 w-full bg-[#1a0038]/70 border border-[#a855f7]/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_25px_rgba(157,78,221,0.3)]">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-5 flex items-center gap-2">
            <Flame className="text-fuchsia-400" /> Tendencias Gamer
          </h3>

          <div className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#2a0055]/60 border border-[#8b5cf6]/20 hover:border-fuchsia-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]"
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <span className="bg-gradient-to-r from-pink-600 to-purple-700 text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-white font-semibold text-md leading-tight">{item.title}</h4>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ principal */}
        <div className="md:w-3/5 w-full space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 mb-6 flex items-center gap-2">
            <Sparkles className="text-fuchsia-400" /> Preguntas Frecuentes
          </h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-[#8b5cf6]/30 rounded-xl p-4 transition-all duration-300 bg-[#140027]/70 backdrop-blur-md hover:border-fuchsia-500/60 hover:shadow-[0_0_25px_rgba(157,78,221,0.5)] ${
                openIndex === index ? "shadow-[0_0_25px_#9d4edd]" : ""
              }`}
            >
              <button
                className="w-full text-left flex justify-between items-center text-lg font-semibold text-white"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex flex-col">
                  <span className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-pink-600 to-purple-700 text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                      {faq.tag}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </div>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-fuchsia-400" : ""
                  }`}
                  size={22}
                />
              </button>

              <div
                className={`transition-all duration-500 ease-in-out mt-3 ${
                  openIndex === index
                    ? "opacity-100 visible max-h-[180px]"
                    : "opacity-0 invisible max-h-[0px]"
                }`}
              >
                <p className="text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
