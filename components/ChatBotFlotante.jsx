// app/components/ChatBotFlotante.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

const RESPUESTAS = {
  '¿Cómo recupero mi contraseña?': {
    texto: '🔐 Para recuperar tu contraseña:\n\n1. Ve a inicio de sesión\n2. Click en "¿Olvidaste tu contraseña?"\n3. Ingresa tu correo\n4. Revisa tu bandeja y spam\n5. Sigue el enlace (24h)\n6. Crea nueva contraseña',
    opciones: ['Otra pregunta', 'Es todo', 'Más preguntas']
  },
  '¿Cómo descargo un juego comprado?': {
    texto: '📥 Para descargar:\n\n1. Inicia sesión\n2. Ve a "Mi Biblioteca"\n3. Busca el juego\n4. Click "Descargar"\n5. Selecciona plataforma\n6. Espera la descarga',
    opciones: ['Otra pregunta', 'Es todo', 'Más preguntas']
  },
  'Problemas de conexión al jugar': {
    texto: '🌐 Soluciones:\n\n1. Verifica internet\n2. Reinicia router\n3. Cierra otras apps\n4. Desactiva VPN\n5. Verifica servidores\n6. Actualiza el juego\n7. Configura firewall',
    opciones: ['Otra pregunta', 'Es todo', 'Más preguntas']
  },
  'Más preguntas': {
    texto: 'Preguntas frecuentes:',
    opciones: ['¿Cómo recupero mi contraseña?', '¿Cómo descargo un juego comprado?', 'Problemas de conexión al jugar']
  },
  'Otra pregunta': {
    texto: 'Selecciona o escribe tu pregunta:',
    opciones: ['¿Cómo recupero mi contraseña?', '¿Cómo descargo un juego comprado?', 'Problemas de conexión al jugar']
  },
  'Es todo': {
    texto: '¡Genial! Gracias por usar GameBot 🎮\n\n¡Disfruta tus juegos!',
    opciones: []
  }
};

const PREGUNTAS = ['¿Cómo recupero mi contraseña?', '¿Cómo descargo un juego comprado?', 'Problemas de conexión al jugar'];

export default function ChatBotFlotante() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMin, setIsMin] = useState(false);
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([
    { tipo: 'bot', texto: '¡Hola! 👋 Soy GameBot. ¿En qué puedo ayudarte?', opciones: PREGUNTAS }
  ]);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [chat]);

  const enviar = () => {
    if (!msg.trim()) return;
    const res = RESPUESTAS[msg.trim()] || { texto: 'Un agente revisará tu consulta. ¿Te ayudo con algo más?', opciones: PREGUNTAS };
    setChat([...chat, { tipo: 'usuario', texto: msg }, { tipo: 'bot', texto: res.texto, opciones: res.opciones }]);
    setMsg('');
  };

  const seleccionar = (op) => {
    const res = RESPUESTAS[op];
    setChat([...chat, { tipo: 'usuario', texto: op }, { tipo: 'bot', texto: res?.texto || 'Déjame ayudarte.', opciones: res?.opciones || [] }]);
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 transition-transform shadow-2xl z-50 animate-bounce flex items-center justify-center">
        <MessageCircle size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl shadow-2xl overflow-hidden z-50 transition-all ${isMin ? 'h-14' : 'h-[480px]'}`}>
      {/* Header */}
      <div className="bg-purple-900 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <MessageCircle size={16} className="text-purple-600" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-purple-900" />
          </div>
          <div>
            <span className="text-white font-bold text-xs">GameBot</span>
            <span className="block text-[10px] text-green-300">En línea</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setIsMin(!isMin)} className="text-white hover:bg-purple-800 p-1.5 rounded transition">
            <Minimize2 size={16} />
          </button>
          <button onClick={() => setIsOpen(false)} className="text-white hover:bg-purple-800 p-1.5 rounded transition">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMin && (
        <>
          {/* Mensajes */}
          <div ref={ref} className="p-3 h-[360px] overflow-y-auto bg-purple-800/30 space-y-2">
            {chat.map((m, i) => (
              <div key={i} className="space-y-1.5">
                <div className={`flex ${m.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-xl text-xs ${m.tipo === 'usuario' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'bg-purple-900/70 text-white whitespace-pre-line'}`}>
                    {m.texto}
                  </div>
                </div>
                {m.opciones && (
                  <div className="flex flex-wrap gap-1.5">
                    {m.opciones.map((op, j) => (
                      <button key={j} onClick={() => seleccionar(op)} className="px-2.5 py-1 bg-purple-900/50 hover:bg-purple-800 text-white border border-purple-500 rounded-full text-[10px] transition">
                        {op}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-purple-900 border-t border-purple-700 flex gap-2">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && enviar()} placeholder="Escribe tu mensaje..." className="flex-1 px-3 py-2 text-sm rounded-full bg-purple-800/50 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400" />
            <button onClick={enviar} className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:scale-110 transition-transform">
              <Send size={16} className="text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}