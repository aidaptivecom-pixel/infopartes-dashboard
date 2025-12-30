import React, { useState } from 'react';
import { 
  Film, 
  Clock, 
  TrendingUp, 
  Lightbulb, 
  Music, 
  Zap,
  Target,
  CheckCircle,
  Copy,
  Play,
  Smartphone,
  BarChart3,
  Hash,
  MessageCircle,
  Eye,
  Heart
} from 'lucide-react';

interface HookTemplate {
  id: string;
  category: string;
  hook: string;
  example: string;
}

interface BestPractice {
  icon: React.ReactNode;
  title: string;
  description: string;
  tip: string;
}

const HOOK_TEMPLATES: HookTemplate[] = [
  {
    id: '1',
    category: 'Curiosidad',
    hook: 'Lo que nadie te cuenta sobre...',
    example: 'Lo que nadie te cuenta sobre elegir una placa de video'
  },
  {
    id: '2',
    category: 'Problema/Solución',
    hook: '¿Tu PC se cuelga? Esto es lo que necesitás',
    example: '¿Tu PC se cuelga jugando? Esto es lo que necesitás'
  },
  {
    id: '3',
    category: 'Urgencia',
    hook: 'Últimas unidades de [producto]',
    example: 'Últimas 3 unidades de RTX 4070 al mejor precio'
  },
  {
    id: '4',
    category: 'Tutorial',
    hook: 'Cómo [acción] en 30 segundos',
    example: 'Cómo saber si tu RAM es compatible en 30 segundos'
  },
  {
    id: '5',
    category: 'Comparación',
    hook: '[Producto A] vs [Producto B] - ¿Cuál elegir?',
    example: 'RTX 4060 vs RTX 4070 - ¿Cuál te conviene?'
  },
  {
    id: '6',
    category: 'Revelación',
    hook: 'El secreto para [beneficio]',
    example: 'El secreto para que tu PC vuele en juegos'
  },
  {
    id: '7',
    category: 'Error común',
    hook: 'El error #1 al comprar [producto]',
    example: 'El error #1 al comprar tu primera placa de video'
  },
  {
    id: '8',
    category: 'Transformación',
    hook: 'Antes vs Después de [cambio]',
    example: 'Antes vs Después de cambiar el SSD'
  },
];

const BEST_PRACTICES: BestPractice[] = [
  {
    icon: <Clock size={24} />,
    title: 'Duración Óptima',
    description: '15-30 segundos para máximo alcance. Los primeros 3 segundos son cruciales.',
    tip: 'Hook fuerte en los primeros 2 segundos'
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Formato Vertical',
    description: 'Siempre 9:16 (1080x1920). Usa todo el espacio de pantalla.',
    tip: 'Evitá barras negras o contenido cortado'
  },
  {
    icon: <Music size={24} />,
    title: 'Audio Trending',
    description: 'Usa audios populares del momento. La música correcta puede 3x tu alcance.',
    tip: 'Revisá la sección "Trending" en Instagram'
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Subtítulos',
    description: '85% de usuarios ven sin sonido. Los subtítulos son obligatorios.',
    tip: 'Texto grande, contrastado y centrado'
  },
  {
    icon: <Hash size={24} />,
    title: 'Hashtags Estratégicos',
    description: '3-5 hashtags relevantes. Mezcla populares con nicho.',
    tip: '#pcgamer #hardware #tecnologia + específicos'
  },
  {
    icon: <Eye size={24} />,
    title: 'Call to Action',
    description: 'Siempre incluí una acción clara al final del Reel.',
    tip: '"Escribinos por WhatsApp" o "Link en bio"'
  },
];

const BEST_TIMES = [
  { day: 'Lunes', times: ['12:00', '18:00', '21:00'], engagement: 'Medio' },
  { day: 'Martes', times: ['11:00', '19:00', '21:00'], engagement: 'Alto' },
  { day: 'Miércoles', times: ['12:00', '18:00', '20:00'], engagement: 'Medio' },
  { day: 'Jueves', times: ['11:00', '19:00', '21:00'], engagement: 'Alto' },
  { day: 'Viernes', times: ['12:00', '17:00', '20:00'], engagement: 'Muy Alto' },
  { day: 'Sábado', times: ['10:00', '14:00', '19:00'], engagement: 'Alto' },
  { day: 'Domingo', times: ['10:00', '13:00', '18:00'], engagement: 'Medio' },
];

const CONTENT_IDEAS = [
  { type: 'Unboxing', icon: '📦', description: 'Abrir productos nuevos genera expectativa', frequency: '2-3/semana' },
  { type: 'Tutorial rápido', icon: '🎓', description: 'Tips de 30 seg que resuelven problemas', frequency: '1-2/semana' },
  { type: 'Comparativa', icon: '⚖️', description: 'A vs B, ayuda a decidir', frequency: '1/semana' },
  { type: 'Setup/PC del día', icon: '🖥️', description: 'Mostrar builds armados', frequency: '2-3/semana' },
  { type: 'Stock alert', icon: '🚨', description: 'Productos que llegaron o se agotan', frequency: 'Según stock' },
  { type: 'Behind scenes', icon: '🎬', description: 'El día a día del local/taller', frequency: '1/semana' },
];

export const ReelsGuideView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyHook = (hook: string, id: string) => {
    navigator.clipboard.writeText(hook);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Muy Alto': return 'text-green-600 bg-green-50';
      case 'Alto': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guía para Reels</h1>
          <p className="text-sm text-gray-500">Tips, plantillas y mejores prácticas para crear contenido viral</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          <Film size={20} />
          <span className="font-medium">3.2x más alcance que posts</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Play size={20} className="text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Duración ideal</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">15-30s</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap size={20} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Hook máximo</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">3 seg</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Frecuencia</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4-7/sem</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart size={20} className="text-pink-600" />
            </div>
            <span className="text-sm text-gray-500">Mejor día</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">Viernes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hook Templates */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Lightbulb size={20} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Plantillas de Hooks</h3>
              <p className="text-sm text-gray-500">Frases probadas para captar atención</p>
            </div>
          </div>

          <div className="space-y-3">
            {HOOK_TEMPLATES.map((template) => (
              <div 
                key={template.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900">{template.hook}</p>
                  <p className="text-sm text-gray-500 mt-1">Ej: "{template.example}"</p>
                </div>
                <button
                  onClick={() => copyHook(template.hook, template.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  {copiedId === template.id ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Best Times */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mejores Horarios</h3>
              <p className="text-sm text-gray-500">Cuándo publicar para máximo alcance</p>
            </div>
          </div>

          <div className="space-y-3">
            {BEST_TIMES.map((item) => (
              <div key={item.day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{item.day}</p>
                  <p className="text-xs text-gray-500">{item.times.join(' • ')}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getEngagementColor(item.engagement)}`}>
                  {item.engagement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Target size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Mejores Prácticas</h3>
            <p className="text-sm text-gray-500">Lo que funciona para maximizar engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEST_PRACTICES.map((practice, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg text-gray-600">
                  {practice.icon}
                </div>
                <h4 className="font-semibold text-gray-900">{practice.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{practice.description}</p>
              <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                <Zap size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">{practice.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Ideas */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart3 size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Ideas de Contenido</h3>
            <p className="text-sm text-gray-500">Tipos de Reels que funcionan para hardware/PC</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTENT_IDEAS.map((idea, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <span className="text-3xl">{idea.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{idea.type}</h4>
                <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {idea.frequency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Checklist */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <h3 className="font-semibold text-lg mb-4">✅ Checklist antes de publicar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Hook en primeros 3 seg</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Subtítulos agregados</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Audio trending o propio</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">CTA claro al final</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">3-5 hashtags relevantes</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Caption con gancho</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Portada atractiva</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Horario óptimo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
