"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { supabase } from "../../supabase/client";
import { useCart } from "../../components/features/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  feature?: string;
  features?: string[];
};

export default function GamingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // 🚫 sin loop brusco
    align: "start",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const { addToCart } = useCart();

  const filters = [
    "Todos",
    "Acción",
    "Aventura",
    "RPG",
    "Estrategia",
    "Simulación",
    "Deportes",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url, feature");

      if (error) {
        console.error("Error al cargar productos:", error);
        return;
      }

      const formatted = (data || []).map((p) => ({
        ...p,
        features: p.feature ? [p.feature] : [],
      }));

      setProducts(formatted);
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      selectedFilter === "Todos" ||
      p.features?.includes(selectedFilter) ||
      p.feature === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // 🕹️ Navegación suave sin loop feo
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
    } else {
      // 🔁 Si está al inicio → ir al último
      emblaApi.scrollTo(filtered.length - 1);
    }
  }, [emblaApi, filtered.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      // 🔁 Si está al final → volver al inicio
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#1e003e] to-[#3b007a] text-white px-6 py-10 rounded-3xl shadow-lg overflow-hidden">
      {/* 🔍 Buscador y filtros */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 flex-wrap mt-2 pt-4">
        <div className="relative w-full md:w-72 flex-shrink-0">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#2a0057] text-sm rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center md:justify-end">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? "bg-pink-600 text-white shadow-md"
                  : "bg-[#2a0057] text-gray-300 hover:bg-pink-700 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 🎮 Carrusel */}
      <div className="relative">
        {/* Flechas laterales */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#2a0057]/80 hover:bg-pink-700 text-white p-3 rounded-full shadow-md transition-all hover:scale-110 border border-pink-500"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#2a0057]/80 hover:bg-pink-700 text-white p-3 rounded-full shadow-md transition-all hover:scale-110 border border-pink-500"
        >
          <FaChevronRight size={20} />
        </button>

        <div ref={emblaRef} className="overflow-hidden px-6 py-8">
          <div className="flex gap-8 items-center">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.3 }}
                className="min-w-[320px] sm:min-w-[400px] md:min-w-[440px] relative rounded-2xl shadow-lg overflow-hidden 
                          border border-transparent bg-gradient-to-br from-[#5e00a6] via-[#9a00ff] to-[#ff00b8]
                          p-[2px] hover:shadow-pink-500/50 transition-transform duration-300 group will-change-transform origin-center"
              >
                <div className="relative rounded-2xl bg-[#100024] overflow-hidden">
                  {p.feature && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20">
                      {p.feature}
                    </div>
                  )}

                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-all duration-300 blur-[1px] group-hover:blur-0"
                    style={{
                      backgroundImage: p.image_url
                        ? `url(${p.image_url})`
                        : "linear-gradient(135deg, #3b007a, #1e003e)",
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col justify-end items-center p-8 bg-black/40 backdrop-blur-sm h-full rounded-2xl">
                    <h3 className="text-xl font-bold text-center drop-shadow-md mb-2">
                      {p.name}
                    </h3>
                    <p className="text-lg font-semibold text-pink-400 mb-4">
                      ${p.price.toFixed(2)}
                    </p>

                    <div className="flex gap-4">
                      <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white font-medium shadow-md hover:shadow-pink-500/40 transition-all">
                        Visualizar
                      </button>
                      <button
                        onClick={() =>
                          addToCart({
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            image_url: p.image_url,
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-800 to-pink-700 hover:from-purple-700 hover:to-pink-600 text-white font-medium shadow-md hover:shadow-pink-500/40 transition-all"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
