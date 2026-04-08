import { useEffect } from 'react';

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3e] rounded-3xl max-w-3xl w-[90%] max-h-[90vh] overflow-y-auto border-2 border-cyan-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 rounded-t-3xl relative">
          <h2 className="text-white text-3xl font-bold flex items-center gap-4">
            <span className="text-4xl">🎮</span>
            Sobre Nosotros
          </h2>
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full text-2xl transition-all hover:rotate-90"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-gray-300">
          <h3 className="text-cyan-400 text-2xl mb-4 flex items-center gap-2">
            🎮 Bienvenido a Game Connect
          </h3>
          <p className="leading-relaxed mb-5">
            Somos tu tienda online especializada en videojuegos, donde encontrarás los últimos lanzamientos, títulos clásicos y todo lo que necesitas para disfrutar de tu pasión gamer. Desde 2020, nos dedicamos a ofrecer la mejor experiencia de compra para jugadores de todas las plataformas.
          </p>

          <div className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-l-4 border-pink-600 p-5 rounded-lg mb-5">
            <p className="text-gray-200">
              <strong>🛒 Tu tienda gamer de confianza</strong><br />
              Ofrecemos videojuegos físicos y digitales para PlayStation, Xbox, Nintendo Switch y PC, con los mejores precios y entregas rápidas.
            </p>
          </div>

          <h3 className="text-cyan-400 text-2xl mb-4 flex items-center gap-2">
            💡 Nuestra Misión
          </h3>
          <p className="leading-relaxed mb-5">
            Conectar a gamers de todo el mundo con sus videojuegos favoritos, ofreciendo una plataforma de compra fácil, segura y accesible. Además, te mantenemos informado con las últimas noticias, lanzamientos, eventos y todo lo relacionado con el universo gaming.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            {[
              { icon: '🎯', title: 'Amplio Catálogo', desc: 'Miles de títulos para todas las plataformas y géneros' },
              { icon: '🚀', title: 'Envíos Rápidos', desc: 'Recibe tus juegos en tiempo récord' },
              { icon: '💎', title: 'Mejores Precios', desc: 'Ofertas exclusivas y precios competitivos' },
              { icon: '📰', title: 'Noticias Gaming', desc: 'Mantente actualizado con las últimas novedades' },
              { icon: '🎪', title: 'Eventos Exclusivos', desc: 'Acceso a lanzamientos y promociones especiales' },
              { icon: '🌟', title: 'Comunidad Activa', desc: 'Miles de gamers compartiendo su pasión' }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-[#2a2a3e] to-[#1e1e2e] p-5 rounded-xl border border-cyan-500/20 hover:border-pink-600 hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <h4 className="text-pink-600 font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-cyan-400 text-2xl mb-4 flex items-center gap-2">
            🌐 Únete a Nosotros
          </h3>
          <p className="leading-relaxed mb-5">
            Forma parte de la comunidad gaming más grande y vibrante. Compra tus juegos favoritos, mantente actualizado con las últimas noticias, comparte tus opiniones y conecta con otros gamers que comparten tu pasión por los videojuegos.
          </p>

          <div className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-l-4 border-pink-600 p-5 rounded-lg">
            <p className="text-gray-200">
              <strong>✨ ¿Por qué elegirnos?</strong><br />
              Seguridad en tus compras, atención personalizada, garantía en todos nuestros productos y una comunidad que respira gaming todos los días.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/30 rounded-b-3xl flex justify-center">
          <button 
            onClick={onClose}
            className="px-8 py-3 border-2 border-cyan-400 text-white rounded-full hover:bg-cyan-400/10 transition-all hover:-translate-y-1"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}