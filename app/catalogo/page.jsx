"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { useCart } from "@/components/features/CartContext"; 

export default function Games() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [tematica, setTematica] = useState("Todos");
  const { addToCart } = useCart();

  const tematicas = ["Todos", "Acción", "Aventura", "RPG", "Estrategia", "Simulación", "Deportes"];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      if (error) console.error(error);
      else setProducts(data);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchTematica = tematica === "Todos" || p.tematica === tematica;
    return matchSearch && matchTematica;
  });

  return (
    <div className="min-h-screen bg-[#06141B] text-white px-10 py-12">
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug">
          Aquí podrás encontrar todos <br /> nuestros juegos.
        </h2>
        <input
          type="text"
          placeholder="Buscar un juego..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-6 px-4 py-2 rounded-full bg-transparent border border-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-72"
        />
      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {tematicas.map((t) => (
          <button
            key={t}
            onClick={() => setTematica(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              tematica === t
                ? "bg-[#00ffff] text-black"
                : "border border-[#00ffff40] text-white hover:bg-[#00ffff20]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="relative rounded-xl shadow-lg overflow-hidden h-80 transform transition hover:scale-105 duration-300"
          >
            <img
              src={p.image_url || "https://via.placeholder.com/300"}
              alt={p.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 text-center">
              {p.feature && (
                <span className="text-xs font-bold text-[#00ffff] uppercase mb-1">{p.feature}</span>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-sky-400 text-sm">{p.brand}</p>
              <p className="text-gray-400 text-xs">{p.tematica}</p>
              <p className="mt-2 text-lg font-semibold text-green-400">${p.price}</p>

              {/* 👇 BOTÓN AÑADIR AL CARRITO */}
              <button
                onClick={() => addToCart({
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  image_url: p.image_url,
                })}
                className="mt-3 w-full py-2 rounded-lg font-bold text-sm text-black uppercase tracking-wide transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(90deg, #00ffff 0%, #7dffb2 100%)",
                  boxShadow: "0 0 10px #00ffff60",
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}