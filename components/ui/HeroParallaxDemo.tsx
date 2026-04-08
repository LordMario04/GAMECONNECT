"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="h-screen w-full antialiased relative flex flex-col justify-center px-8 md:px-16">
      <h1 className="text-3xl md:text-7xl font-bold text-white leading-tight text-left">
        GAME <br /> CONNECT
      </h1>
      <p className="max-w-xl text-base md:text-xl mt-6 text-white text-left">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
}
