"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { supabase } from "../../supabase/client";
import { useCart } from "../../components/features/CartContext";
import { createPortal } from "react-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  feature?: string;
  tematica?: string;
  description?: string;
  brand?: string;
};

export default function GamingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filters = ["Todos", "Acción", "Aventura", "RPG", "Estrategia", "Simulación", "Deportes"];

  // 👇 Funciones para abrir y cerrar el modal bloqueando el scroll
  const openModal = (p: Product) => {
    setSelectedProduct(p);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url, feature, tematica, description, brand");

      if (error) {
        console.error("Error al cargar productos:", error);
        return;
      }

      setProducts(data || []);
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = selectedFilter === "Todos" || p.tematica === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollPrev()) emblaApi.scrollPrev();
    else emblaApi.scrollTo(filtered.length - 1);
  }, [emblaApi, filtered.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) emblaApi.scrollNext();
    else emblaApi.scrollTo(0);
  }, [emblaApi]);

  return (
    <>
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
                  className="min-w-[320px] sm:min-w-[400px] md:min-w-[440px] relative rounded-2xl shadow-lg overflow-hidden border border-transparent bg-gradient-to-br from-[#5e00a6] via-[#9a00ff] to-[#ff00b8] p-[2px] hover:shadow-pink-500/50 transition-transform duration-300 group will-change-transform origin-center"
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
                    />
                    <div className="relative z-10 flex flex-col justify-end items-center p-8 bg-black/40 backdrop-blur-sm h-full rounded-2xl">
                      <h3 className="text-xl font-bold text-center drop-shadow-md mb-2">{p.name}</h3>
                      <p className="text-lg font-semibold text-pink-400 mb-4">${p.price.toFixed(2)}</p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => openModal(p)} // 👈 openModal
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white font-medium shadow-md hover:shadow-pink-500/40 transition-all"
                        >
                          Visualizar
                        </button>
                        <button
                          onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image_url: p.image_url })}
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

      {/* 🔍 MODAL */}
      {selectedProduct &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal} // 👈 closeModal
          >
            <div
              className="relative bg-gradient-to-br from-[#1e003e] to-[#3b007a] rounded-2xl border border-pink-500/40 shadow-[0_0_30px_#ff00b840] w-[90%] max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen */}
              <div className="relative h-64 w-full flex-shrink-0">
                <img
                  src={selectedProduct.image_url || "https://via.placeholder.com/300"}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e003e] to-transparent" />
                {selectedProduct.feature && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {selectedProduct.feature}
                  </span>
                )}
                <button
                  onClick={closeModal} // 👈 closeModal
                  className="absolute top-3 right-3 bg-black/50 hover:bg-pink-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sky-400 text-sm">{selectedProduct.brand}</span>
                  <span className="text-xs text-gray-400 border border-pink-500/30 px-2 py-0.5 rounded-full">
                    {selectedProduct.tematica}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedProduct.description || "Sin descripción disponible."}
                </p>
                <p className="text-2xl font-bold text-pink-400">
                  ${selectedProduct.price.toFixed(2)}
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => {
                      addToCart({
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        image_url: selectedProduct.image_url,
                      });
                      closeModal(); // 👈 closeModal
                    }}
                    className="flex-1 py-2 rounded-xl font-bold text-black uppercase tracking-wide transition-all hover:scale-105"
                    style={{ background: "linear-gradient(90deg, #00ffff 0%, #7dffb2 100%)", boxShadow: "0 0 10px #00ffff60" }}
                  >
                    Añadir al carrito
                  </button>
                  <button
                    onClick={closeModal} // 👈 closeModal
                    className="flex-1 py-2 rounded-xl font-bold text-white uppercase tracking-wide border border-pink-500/40 hover:bg-pink-700/20 transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}