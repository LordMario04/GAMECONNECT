// src/components/BackgroundVideo.jsx
export default function BackgroundVideo({ src, overlay = true, children }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      {/* Overlay opcional */}
      {overlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      )}

      {/* Contenido encima */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}
