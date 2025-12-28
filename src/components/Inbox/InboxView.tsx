import React, { useState } from 'react';
import { 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Mail, 
  Search, 
  Filter, 
  MoreVertical,
  Send,
  Paperclip,
  Clock,
  CheckCheck,
  Bot,
  User,
  Tag,
  ShoppingCart,
  Wrench,
  HelpCircle,
  Truck,
  Star,
  Archive,
  Zap,
  TrendingUp,
  ExternalLink,
  Phone
} from 'lucide-react';

// Types
interface Conversation {
  id: string;
  contact: {
    name: string;
    phone?: string;
    email?: string;
    avatar?: string;
  };
  channel: 'whatsapp' | 'instagram' | 'facebook' | 'email';
  status: 'active' | 'waiting' | 'resolved' | 'escalated';
  tag: 'venta' | 'consulta' | 'servicio' | 'posventa';
  lastMessage: string;
  timestamp: string;
  unread: number;
  isAutomated: boolean;
  duxId?: string;
  tiendaNubeOrder?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'customer' | 'agent' | 'bot';
  status?: 'sent' | 'delivered' | 'read';
}

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    contact: { name: 'Juan Pérez', phone: '+54 11 5019-8131' },
    channel: 'whatsapp',
    status: 'active',
    tag: 'venta',
    lastMessage: 'Hola, tienen stock de la RTX 4060?',
    timestamp: '10:32',
    unread: 2,
    isAutomated: true,
    tiendaNubeOrder: '#TN-4521'
  },
  {
    id: '2',
    contact: { name: 'María García', email: 'maria@gmail.com' },
    channel: 'email',
    status: 'waiting',
    tag: 'posventa',
    lastMessage: 'El pedido llegó con la caja dañada...',
    timestamp: '10:15',
    unread: 1,
    isAutomated: false,
    duxId: 'CLI-2341'
  },
  {
    id: '3',
    contact: { name: 'Carlos López', phone: '+54 11 4532-1234' },
    channel: 'whatsapp',
    status: 'escalated',
    tag: 'servicio',
    lastMessage: 'Mi notebook no enciende después de la reparación',
    timestamp: '09:45',
    unread: 0,
    isAutomated: false,
    duxId: 'CLI-1892'
  },
  {
    id: '4',
    contact: { name: 'Ana Rodríguez' },
    channel: 'instagram',
    status: 'active',
    tag: 'consulta',
    lastMessage: 'Hacen envíos al interior?',
    timestamp: '09:30',
    unread: 1,
    isAutomated: true
  },
  {
    id: '5',
    contact: { name: 'Pedro Martínez', phone: '+54 11 6789-0123' },
    channel: 'facebook',
    status: 'resolved',
    tag: 'venta',
    lastMessage: 'Perfecto, ya hice la transferencia',
    timestamp: 'Ayer',
    unread: 0,
    isAutomated: true,
    tiendaNubeOrder: '#TN-4519'
  },
  {
    id: '6',
    contact: { name: 'Laura Fernández', email: 'laura.f@empresa.com' },
    channel: 'email',
    status: 'active',
    tag: 'venta',
    lastMessage: 'Necesito cotización para 10 notebooks Dell Latitude',
    timestamp: 'Ayer',
    unread: 0,
    isAutomated: false,
    duxId: 'CLI-3102'
  },
];

const MOCK_MESSAGES: Message[] = [
  { id: '1', content: 'Hola! Bienvenido a InfoPartes 👋 ¿En qué puedo ayudarte?', timestamp: '10:30', sender: 'bot' },
  { id: '2', content: 'Hola, tienen stock de la RTX 4060?', timestamp: '10:31', sender: 'customer' },
  { id: '3', content: '¡Sí! Tenemos la RTX 4060 8GB disponible ✅\n\n💰 Precio: $498.999\n📦 Stock: 3 unidades\n🚚 Envío gratis CABA\n\n¿Te gustaría que te pase el link para comprar?', timestamp: '10:31', sender: 'bot', status: 'read' },
  { id: '4', content: 'Si dale, y hacen factura A?', timestamp: '10:32', sender: 'customer' },
];

const CHANNEL_CONFIG = {
  whatsapp: { icon: MessageSquare, color: 'bg-green-500', label: 'WhatsApp' },
  instagram: { icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500', label: 'Instagram' },
  facebook: { icon: Facebook, color: 'bg-blue-600', label: 'Facebook' },
  email: { icon: Mail, color: 'bg-gray-500', label: 'Email' }
};

const STATUS_CONFIG = {
  active: { color: 'bg-green-100 text-green-700', label: 'Activa' },
  waiting: { color: 'bg-yellow-100 text-yellow-700', label: 'Esperando' },
  resolved: { color: 'bg-gray-100 text-gray-600', label: 'Resuelta' },
  escalated: { color: 'bg-red-100 text-red-700', label: 'Escalada' }
};

const TAG_CONFIG = {
  venta: { icon: ShoppingCart, color: 'text-blue-600 bg-blue-50', label: 'Venta' },
  consulta: { icon: HelpCircle, color: 'text-purple-600 bg-purple-50', label: 'Consulta' },
  servicio: { icon: Wrench, color: 'text-orange-600 bg-orange-50', label: 'Servicio Técnico' },
  posventa: { icon: Truck, color: 'text-green-600 bg-green-50', label: 'Posventa' }
};

export const InboxView: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(MOCK_CONVERSATIONS[0]);
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv => {
    if (filterChannel !== 'all' && conv.channel !== filterChannel) return false;
    if (filterStatus !== 'all' && conv.status !== filterStatus) return false;
    if (searchQuery && !conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: MOCK_CONVERSATIONS.length,
    automated: MOCK_CONVERSATIONS.filter(c => c.isAutomated).length,
    pending: MOCK_CONVERSATIONS.filter(c => c.status === 'waiting' || c.status === 'escalated').length,
    resolved: MOCK_CONVERSATIONS.filter(c => c.status === 'resolved').length
  };

  return (
    <div className="h-full flex flex-col -mx-8 -mt-6 -mb-8">
      {/* Header with Stats */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inbox Unificado</h1>
            <p className="text-sm text-gray-500 mt-1">Centro de atención multicanal con IA</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter size={16} />
              Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Zap size={16} />
              Config. Automatización
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Conversaciones Hoy</span>
              <MessageSquare size={18} className="text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Automatizadas</span>
              <Bot size={18} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-700 mt-1">{stats.automated}</p>
            <p className="text-xs text-green-600 mt-1">{Math.round((stats.automated / stats.total) * 100)}% del total</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-600">Pendientes</span>
              <Clock size={18} className="text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-yellow-700 mt-1">{stats.pending}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">Resueltas</span>
              <CheckCheck size={18} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-700 mt-1">{stats.resolved}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative mb-3">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar conversación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none"
              >
                <option value="all">Todos los canales</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="email">Email</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activas</option>
                <option value="waiting">Esperando</option>
                <option value="escalated">Escaladas</option>
                <option value="resolved">Resueltas</option>
              </select>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => {
              const ChannelIcon = CHANNEL_CONFIG[conv.channel].icon;
              const TagIcon = TAG_CONFIG[conv.tag].icon;
              const isSelected = selectedConversation?.id === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar with channel indicator */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                        {conv.contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${CHANNEL_CONFIG[conv.channel].color} flex items-center justify-center`}>
                        <ChannelIcon size={10} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 truncate">{conv.contact.name}</span>
                        <span className="text-xs text-gray-400">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-2">{conv.lastMessage}</p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${TAG_CONFIG[conv.tag].color}`}>
                          <TagIcon size={10} />
                          {TAG_CONFIG[conv.tag].label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[conv.status].color}`}>
                          {STATUS_CONFIG[conv.status].label}
                        </span>
                        {conv.isAutomated && (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <Bot size={12} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Unread badge */}
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat View */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                      {selectedConversation.contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${CHANNEL_CONFIG[selectedConversation.channel].color} flex items-center justify-center border-2 border-white`}>
                      {React.createElement(CHANNEL_CONFIG[selectedConversation.channel].icon, { size: 8, className: 'text-white' })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.contact.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.contact.phone || selectedConversation.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedConversation.duxId && (
                    <a href="#" className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-100">
                      <ExternalLink size={12} />
                      DUX: {selectedConversation.duxId}
                    </a>
                  )}
                  {selectedConversation.tiendaNubeOrder && (
                    <a href="#" className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100">
                      <ExternalLink size={12} />
                      {selectedConversation.tiendaNubeOrder}
                    </a>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Phone size={18} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Star size={18} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Archive size={18} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {MOCK_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'customer'
                        ? 'bg-white border border-gray-200 text-gray-900'
                        : msg.sender === 'bot'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.sender !== 'customer' && (
                      <div className="flex items-center gap-1 mb-1 opacity-80">
                        {msg.sender === 'bot' ? <Bot size={12} /> : <User size={12} />}
                        <span className="text-xs">{msg.sender === 'bot' ? 'Asistente IA' : 'Agente'}</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      msg.sender === 'customer' ? 'text-gray-400' : 'opacity-70'
                    }`}>
                      <span className="text-xs">{msg.timestamp}</span>
                      {msg.status && msg.sender !== 'customer' && (
                        <CheckCheck size={14} className={msg.status === 'read' ? 'text-blue-300' : ''} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl text-white">
                  <Send size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600">
                    📦 Consultar Stock
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600">
                    💰 Enviar Cotización
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600">
                    🚚 Tracking Envío
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Bot size={14} className="text-green-500" />
                  Automatización activa
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Selecciona una conversación</p>
            </div>
          </div>
        )}

        {/* Right Panel - Contact Info */}
        {selectedConversation && (
          <div className="w-80 border-l border-gray-200 bg-white p-6 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Información del Contacto</h3>
            
            {/* Contact Card */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
                  {selectedConversation.contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedConversation.contact.name}</h4>
                  <p className="text-sm text-gray-500">{selectedConversation.contact.phone || selectedConversation.contact.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Canal</span>
                  <span className="font-medium">{CHANNEL_CONFIG[selectedConversation.channel].label}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Estado</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[selectedConversation.status].color}`}>
                    {STATUS_CONFIG[selectedConversation.status].label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tipo</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${TAG_CONFIG[selectedConversation.tag].color}`}>
                    {TAG_CONFIG[selectedConversation.tag].label}
                  </span>
                </div>
              </div>
            </div>

            {/* Integrations */}
            <h4 className="font-medium text-gray-900 mb-3">Integraciones</h4>
            <div className="space-y-3 mb-6">
              {selectedConversation.duxId && (
                <a href="#" className="flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">DX</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-900">DUX ERP</p>
                      <p className="text-xs text-purple-600">{selectedConversation.duxId}</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-purple-500" />
                </a>
              )}
              {selectedConversation.tiendaNubeOrder && (
                <a href="#" className="flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TN</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">Tienda Nube</p>
                      <p className="text-xs text-blue-600">{selectedConversation.tiendaNubeOrder}</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-blue-500" />
                </a>
              )}
              {!selectedConversation.duxId && !selectedConversation.tiendaNubeOrder && (
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-sm text-gray-500">Sin integraciones vinculadas</p>
                  <button className="mt-2 text-xs text-blue-600 font-medium hover:underline">
                    + Vincular cliente
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <h4 className="font-medium text-gray-900 mb-3">Acciones Rápidas</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <Tag size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Cambiar etiqueta</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <User size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Asignar agente</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <TrendingUp size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Escalar conversación</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-colors">
                <CheckCheck size={16} className="text-green-600" />
                <span className="text-sm text-green-700">Marcar como resuelta</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
