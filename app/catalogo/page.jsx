"use client";
import React, { useState, useEffect } from "react";

export default function Games() {
  const [products, setProducts] = useState([]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://pi-backend2-go2o.onrender.com/api/products");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  fetchProducts();
}, []);

  return (
    <div className="min-h-screen bg-[#06141B] text-white">
      {/* 🔹 HEADER */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#0B1D26] shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo-2078018_1280.png"
            alt="GameConnect Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-xl font-bold">GameConnect</h1>
        </div>

        <nav className="flex items-center gap-6">
          <a href="#" className="font-semibold hover:text-cyan-400 transition">
            Inicio
          </a>
          <a href="#" className="font-semibold text-cyan-400">
            Juegos
          </a>
          <a href="#" className="font-semibold hover:text-cyan-400 transition">
            Ofertas
          </a>
          <a href="#" className="font-semibold hover:text-cyan-400 transition">
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar un juego"
            className="px-4 py-2 rounded-full bg-transparent border border-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <img
            src="/images/user.png"
            alt="Usuario"
            className="h-8 w-8 rounded-full border border-gray-500"
          />
        </div>
      </header>

      {/* 🔹 TITULO CENTRAL */}
      <main className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug">
          Aquí podrás encontrar todos nuestros <br /> juegos.
        </h2>
      </main>

      {/* 🔹 GRID DE PRODUCTOS */}
      <section className="px-10 pb-16 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative rounded-xl shadow-lg overflow-hidden h-80 transform transition hover:scale-105 duration-300"
            >
              {/* Imagen de producto */}
              <img
                src={p.images?.[0] || "https://via.placeholder.com/300"}
                alt={p.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 text-center">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-sky-400">{p.brand}</p>
                <p className="text-gray-400 text-sm">{p.slug}</p>
                <p className="mt-2 text-lg font-semibold text-green-400">
                  ${p.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
