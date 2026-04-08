'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Tag, TrendingUp, Flame, Clock } from 'lucide-react';

export default function GamingNews() {
  const [expandedNews, setExpandedNews] = useState(null);

  const featuredNews = [
    {
      id: 1,
      title: "GTA 6 revela su fecha de lanzamiento oficial",
      category: "Lanzamientos",
      date: "3 Oct 2025",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=500&fit=crop",
      preview: "Rockstar Games finalmente confirma la fecha de lanzamiento de GTA 6 para finales de 2025, prometiendo la experiencia más inmersiva de la saga.",
      fullContent: "Después de años de especulación, Rockstar Games ha confirmado oficialmente que Grand Theft Auto 6 llegará el 15 de diciembre de 2025 para PlayStation 5 y Xbox Series X|S. El juego presentará dos protagonistas jugables por primera vez en la serie, ambientado en una versión moderna de Vice City expandida. Los desarrolladores prometen gráficos de última generación con ray tracing completo, un mapa del mundo abierto 50% más grande que GTA V, y una narrativa completamente nueva que explorará el mundo del crimen organizado moderno. La versión para PC llegará en 2026."
    },
    {
      id: 2,
      title: "Nintendo anuncia nueva consola Switch 2",
      category: "Hardware",
      date: "1 Oct 2025",
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=500&fit=crop",
      preview: "La próxima generación de Nintendo Switch promete 4K en modo dock y compatibilidad total con juegos de Switch original.",
      fullContent: "Nintendo ha levantado el velo sobre la Switch 2, su consola de próxima generación que llegará en marzo de 2026. La nueva consola contará con un procesador personalizado basado en arquitectura ARM de última generación, 12GB de RAM, y capacidad de salida 4K cuando está conectada al dock. En modo portátil, ofrecerá una pantalla OLED de 8 pulgadas con resolución 1080p. La gran noticia es la retrocompatibilidad completa: todos los juegos de Switch original funcionarán en la nueva consola, muchos con mejoras de rendimiento automáticas. El precio estimado es de $449 USD."
    },
    {
      id: 3,
      title: "Elden Ring: Shadow of the Erdtree bate récords",
      category: "Expansiones",
      date: "29 Sep 2025",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      preview: "La expansión de Elden Ring se convierte en el DLC más vendido de la historia, superando los 15 millones de copias en su primer mes.",
      fullContent: "FromSoftware ha anunciado que Shadow of the Erdtree ha vendido más de 15 millones de copias en su primer mes, convirtiéndose en el DLC más exitoso de la historia de los videojuegos. La expansión añade un nuevo continente completo al mapa de Elden Ring, con más de 40 horas de contenido nuevo, 8 jefes principales, y decenas de enemigos y armas únicas. Los jugadores han elogiado la dificultad aumentada y la narrativa que expande significativamente la historia del juego base. FromSoftware ya está trabajando en un nuevo proyecto no anunciado para su lanzamiento en 2027."
    },
    {
      id: 4,
      title: "Xbox Game Pass alcanza 50 millones de suscriptores",
      category: "Servicios",
      date: "28 Sep 2025",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=500&fit=crop",
      preview: "Microsoft celebra un hito importante mientras Game Pass supera los 50 millones de usuarios activos en todo el mundo.",
      fullContent: "Microsoft ha anunciado que Xbox Game Pass ha alcanzado oficialmente los 50 millones de suscriptores activos, consolidándose como el servicio de suscripción de juegos más grande del mundo. Este crecimiento se atribuye a la inclusión de títulos exclusivos día uno como Starfield y Forza Motorsport, además de la reciente adquisición de Activision Blizzard que trajo Call of Duty al servicio. Microsoft también reveló que están trabajando en una nueva categoría 'Game Pass Ultimate+' que incluirá acceso anticipado a todos los lanzamientos y contenido exclusivo. El anuncio viene acompañado de la confirmación de que más de 450 juegos están actualmente disponibles en el catálogo."
    }
  ];

  const trendingNews = [
    { id: 5, title: "The Last of Us Part III confirmado para 2026", category: "Anuncio", date: "Hace 2 horas" },
    { id: 6, title: "Fortnite lanza colaboración con Final Fantasy", category: "Eventos", date: "Hace 5 horas" },
    { id: 7, title: "PlayStation 5 Pro supera expectativas de ventas", category: "Hardware", date: "Hace 8 horas" },
    { id: 8, title: "Hogwarts Legacy anuncia expansión masiva", category: "DLC", date: "Hace 12 horas" },
    { id: 9, title: "Call of Duty: Black Ops 6 rompe récords", category: "Lanzamientos", date: "Hace 1 día" },
    { id: 10, title: "Minecraft alcanza 300 millones de jugadores", category: "Milestone", date: "Hace 1 día" },
    { id: 11, title: "Steam anuncia nueva interfaz renovada", category: "Plataformas", date: "Hace 2 días" },
    { id: 12, title: "Valorant introduce nuevo agente 'Phantom'", category: "Actualizaciones", date: "Hace 2 días" }
  ];

  const toggleExpand = (id) => {
    setExpandedNews(expandedNews === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Últimas Noticias
          </h1>
          <p className="text-xl text-purple-300">
            Lo más reciente del mundo gaming
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6"></div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Trending News */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden sticky top-4">
              {/* Sidebar Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center gap-2">
                <Flame className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">TRENDING</h3>
              </div>

              {/* Trending List */}
              <div className="divide-y divide-purple-500/10">
                {trendingNews.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-purple-500/10 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded mb-2">
                          {item.category}
                        </span>
                        <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Clock size={12} />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 bg-slate-900/50 border-t border-purple-500/20">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  <TrendingUp size={16} />
                  Ver todas las tendencias
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Featured News Grid */}
          <div className="flex-1">
            <div className="grid gap-8 md:grid-cols-2">
              {featuredNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Tag size={14} />
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-purple-300 text-sm mb-3">
                      <Calendar size={16} />
                      <span>{item.date}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h2>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {item.preview}
                    </p>

                    {/* Expanded Content */}
                    {expandedNews === item.id && (
                      <div className="mb-4 p-4 bg-slate-900/50 rounded-lg border-l-4 border-purple-500">
                        <p className="text-gray-300 leading-relaxed">
                          {item.fullContent}
                        </p>
                      </div>
                    )}

                    {/* Button */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>
                        {expandedNews === item.id ? 'Ver menos' : 'Ver más'}
                      </span>
                      {expandedNews === item.id ? (
                        <ChevronUp className="group-hover:-translate-y-1 transition-transform" size={20} />
                      ) : (
                        <ChevronDown className="group-hover:translate-y-1 transition-transform" size={20} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Section */}
            <div className="text-center mt-12">
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-lg border-2 border-purple-500/50 hover:border-purple-500 transition-all duration-300">
                Cargar más noticias destacadas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
