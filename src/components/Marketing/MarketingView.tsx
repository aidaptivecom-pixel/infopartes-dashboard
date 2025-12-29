import React, { useState, useRef } from 'react';
import { 
  Instagram, 
  Facebook, 
  Clock, 
  Calendar,
  Check, 
  X, 
  RefreshCw, 
  Edit3, 
  Eye,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  MoreVertical,
  Loader2,
  Wand2,
  Trash2,
  Plus,
  Save,
  ImageIcon,
  Smartphone,
  Globe,
  Square,
  RectangleVertical,
  RectangleHorizontal,
  MessageSquare
} from 'lucide-react';

type ContentStatus = 'pending' | 'approved' | 'published' | 'rejected';
type Platform = 'instagram' | 'facebook' | 'tiktok' | 'whatsapp' | 'web';
type ContentType = 'feed' | 'story' | 'reel' | 'carousel' | 'banner';
type ContentFormat = 'feed' | 'story' | 'banner';
type GenerationStatus = 'idle' | 'uploading' | 'generating' | 'complete';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  gradient: string;
  bgClass: string;
}

interface PlatformOption {
  id: Platform;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface FormatOption {
  id: ContentFormat;
  name: string;
  ratio: string;
  icon: React.ReactNode;
  dimensions: string;
}

interface GeneratedVariant {
  id: number;
  gradient: string;
  caption: string;
}

interface ContentPiece {
  id: string;
  product: {
    name: string;
    sku: string;
    price: number;
    image: string;
  };
  type: ContentType;
  platforms: Platform[];
  status: ContentStatus;
  caption: string;
  hashtags: string[];
  cta: string;
  scheduledDate: string;
  scheduledTime: string;
  selectedStyle: string;
  gradient: string;
  metrics?: {
    reach: number;
    engagement: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

const PLATFORM_OPTIONS: PlatformOption[] = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={18} />, color: 'text-pink-600', bgColor: 'bg-pink-50 border-pink-200 hover:bg-pink-100' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} />, color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { id: 'tiktok', name: 'TikTok', icon: <Play size={18} />, color: 'text-gray-900', bgColor: 'bg-gray-100 border-gray-300 hover:bg-gray-200' },
  { id: 'whatsapp', name: 'WA Story', icon: <Smartphone size={18} />, color: 'text-green-600', bgColor: 'bg-green-50 border-green-200 hover:bg-green-100' },
  { id: 'web', name: 'Web', icon: <Globe size={18} />, color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
];

const FORMAT_OPTIONS: FormatOption[] = [
  { id: 'feed', name: 'Feed', ratio: '1:1', icon: <Square size={16} />, dimensions: '1080×1080' },
  { id: 'story', name: 'Story', ratio: '9:16', icon: <RectangleVertical size={16} />, dimensions: '1080×1920' },
  { id: 'banner', name: 'Banner', ratio: '16:9', icon: <RectangleHorizontal size={16} />, dimensions: '1920×1080' },
];

const STYLE_OPTIONS: StyleOption[] = [
  { 
    id: 'render', 
    name: 'Render producto', 
    description: 'Fondo limpio y profesional',
    gradient: 'from-gray-50 to-white',
    bgClass: 'bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200'
  },
  { 
    id: 'promo', 
    name: 'Promocional', 
    description: 'Colores llamativos para ofertas',
    gradient: 'from-orange-500 to-pink-500',
    bgClass: 'bg-gradient-to-br from-orange-500 to-pink-500'
  },
  { 
    id: 'infopartes', 
    name: 'Estilo InfoPartes', 
    description: 'Identidad de marca',
    gradient: 'from-purple-600 to-cyan-400',
    bgClass: 'bg-gradient-to-br from-purple-600 to-cyan-400'
  },
  { 
    id: 'tech', 
    name: 'Tech Premium', 
    description: 'Tonos azules profesionales',
    gradient: 'from-blue-600 to-teal-400',
    bgClass: 'bg-gradient-to-br from-blue-600 to-teal-400'
  },
  { 
    id: 'gaming', 
    name: 'Gaming RGB', 
    description: 'Estilo gamer con colores vivos',
    gradient: 'from-amber-500 to-rose-500',
    bgClass: 'bg-gradient-to-br from-amber-500 to-rose-500'
  },
];

const MOCK_CONTENT: ContentPiece[] = [
  {
    id: '1',
    product: {
      name: 'RTX 4070 Super 12GB',
      sku: 'GPU-4070S-12G',
      price: 890000,
      image: '🎮'
    },
    type: 'feed',
    platforms: ['instagram', 'facebook'],
    status: 'pending',
    caption: '¡La RTX 4070 SUPER ya está en stock! 12GB GDDR6X con Ray Tracing de última generación.',
    hashtags: ['#RTX4070', '#Gaming', '#PCGamer'],
    cta: 'Consultar por WhatsApp',
    scheduledDate: '2025-12-27',
    scheduledTime: '10:00',
    selectedStyle: 'infopartes',
    gradient: 'from-purple-600 to-cyan-400'
  },
  {
    id: '2',
    product: {
      name: 'RAM DDR5 32GB Kit',
      sku: 'RAM-DDR5-32K',
      price: 185000,
      image: '💾'
    },
    type: 'story',
    platforms: ['instagram', 'tiktok'],
    status: 'pending',
    caption: 'Kit RAM DDR5 32GB (2x16GB) a 5600MHz. Compatibilidad total con Intel y AMD.',
    hashtags: ['#RAM', '#DDR5', '#PCGamer'],
    cta: 'Ver disponibilidad',
    scheduledDate: '2025-12-28',
    scheduledTime: '14:00',
    selectedStyle: 'render',
    gradient: 'from-gray-50 to-white'
  },
  {
    id: '3',
    product: {
      name: 'Monitor LG 27" 165Hz',
      sku: 'MON-LG27-165',
      price: 420000,
      image: '🖥️'
    },
    type: 'story',
    platforms: ['instagram', 'facebook'],
    status: 'approved',
    caption: 'Monitor LG UltraGear 27" con 165Hz IPS y 99% sRGB.',
    hashtags: ['#Monitor', '#Gaming', '#LG'],
    cta: 'Ver en tienda',
    scheduledDate: '2025-12-27',
    scheduledTime: '18:00',
    selectedStyle: 'tech',
    gradient: 'from-blue-600 to-teal-400'
  },
  {
    id: '4',
    product: {
      name: 'PC Armada Gamer Pro',
      sku: 'PC-GAMER-PRO',
      price: 2450000,
      image: '🖥️'
    },
    type: 'carousel',
    platforms: ['instagram'],
    status: 'published',
    caption: 'PC GAMER PRO lista para jugar. RTX 4070 Ti, Intel i7-14700K, 32GB DDR5.',
    hashtags: ['#PCGamer', '#Gaming', '#RTX4070Ti'],
    cta: 'Solicitar cotización',
    scheduledDate: '2025-12-26',
    scheduledTime: '12:00',
    selectedStyle: 'promo',
    gradient: 'from-orange-500 to-pink-500',
    metrics: {
      reach: 3850,
      engagement: 9.4,
      likes: 287,
      comments: 45,
      shares: 23
    }
  }
];

const WEEKLY_SCHEDULE = [
  { day: 'Lun', date: '23', posts: 1, status: 'published' },
  { day: 'Mar', date: '24', posts: 0, status: 'empty' },
  { day: 'Mié', date: '25', posts: 1, status: 'published' },
  { day: 'Jue', date: '26', posts: 1, status: 'published' },
  { day: 'Vie', date: '27', posts: 2, status: 'scheduled' },
  { day: 'Sáb', date: '28', posts: 1, status: 'pending' },
  { day: 'Dom', date: '29', posts: 0, status: 'empty' },
];

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Instagram size={14} className="text-pink-500" />,
  facebook: <Facebook size={14} className="text-blue-600" />,
  tiktok: <Play size={14} className="text-gray-900" />,
  whatsapp: <Smartphone size={14} className="text-green-600" />,
  web: <Globe size={14} className="text-purple-600" />,
};

const statusConfig = {
  pending: { label: 'Pendiente', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  approved: { label: 'Aprobado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  published: { label: 'Publicado', color: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  rejected: { label: 'Descartado', color: 'bg-gray-50 text-gray-500 border-gray-200', dot: 'bg-gray-400' },
};

const typeLabels: Record<ContentType, string> = {
  feed: 'Feed',
  story: 'Story',
  reel: 'Reel',
  carousel: 'Carrusel',
  banner: 'Banner',
};

const SAMPLE_CAPTIONS: Record<string, string[]> = {
  render: [
    'Disponible en stock. Calidad premium garantizada.',
    'Nuevo ingreso. Consultá precio y disponibilidad.',
    'Stock limitado. El mejor precio del mercado.',
  ],
  promo: [
    '¡OFERTA ESPECIAL! Solo por tiempo limitado.',
    'Los mejores precios del año están acá.',
    'No te lo pierdas. Stock limitado.',
  ],
  infopartes: [
    'Llevá tu setup al siguiente nivel.',
    'RGB + Potencia. Dominá cada partida.',
    'El upgrade que tu PC necesita.',
  ],
  tech: [
    'Tecnología de última generación.',
    'Rendimiento profesional garantizado.',
    'Calidad que marca la diferencia.',
  ],
  gaming: [
    'Dale vida a tu espacio de trabajo.',
    'Diseño y performance en uno.',
    'Elegí lo mejor para vos.',
  ],
};

const VARIANT_GRADIENTS = [
  'from-purple-600 to-cyan-400',
  'from-orange-500 to-pink-500',
  'from-blue-600 to-teal-400',
];

export const MarketingView: React.FC = () => {
  const [content, setContent] = useState<ContentPiece[]>(MOCK_CONTENT);
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'calendar' | 'published'>('generate');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [promptInstructions, setPromptInstructions] = useState<string>('');
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram']);
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>('feed');
  const [generatedVariants, setGeneratedVariants] = useState<GeneratedVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const pendingContent = content.filter(c => c.status === 'pending');
  const approvedContent = content.filter(c => c.status === 'approved');
  const publishedContent = content.filter(c => c.status === 'published');

  const handleApprove = (id: string) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as ContentStatus } : c));
  };

  const handleReject = (id: string) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as ContentStatus } : c));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file: File) => {
    setGenerationStatus('uploading');
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        setUploadedImage(e.target?.result as string);
        setGenerationStatus('idle');
        setSelectedStyle(null);
        setGeneratedCaption('');
        setGeneratedVariants([]);
        setSelectedVariant(null);
        setIsEditingCaption(false);
      }, 400);
    };
    reader.readAsDataURL(file);
  };

  const handlePlatformToggle = (platformId: Platform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        if (prev.length === 1) return prev;
        return prev.filter(p => p !== platformId);
      }
      return [...prev, platformId];
    });
  };

  const handleStyleSelect = (styleId: string) => {
    if (selectedStyle === styleId) return;
    
    setSelectedStyle(styleId);
    setGenerationStatus('generating');
    setIsEditingCaption(false);
    setSelectedVariant(null);
    
    setTimeout(() => {
      const captions = SAMPLE_CAPTIONS[styleId] || SAMPLE_CAPTIONS['render'];
      
      const variants: GeneratedVariant[] = [
        { id: 1, gradient: VARIANT_GRADIENTS[0], caption: captions[0] },
        { id: 2, gradient: VARIANT_GRADIENTS[1], caption: captions[1] },
        { id: 3, gradient: VARIANT_GRADIENTS[2], caption: captions[2] },
      ];
      
      setGeneratedVariants(variants);
      setSelectedVariant(1);
      setGeneratedCaption(variants[0].caption);
      setEditedCaption(variants[0].caption);
      setGenerationStatus('complete');
    }, 1500);
  };

  const handleVariantSelect = (variantId: number) => {
    setSelectedVariant(variantId);
    const variant = generatedVariants.find(v => v.id === variantId);
    if (variant) {
      setGeneratedCaption(variant.caption);
      setEditedCaption(variant.caption);
    }
  };

  const handleRegenerate = () => {
    if (!selectedStyle || isRegenerating) return;
    setIsRegenerating(true);
    setSelectedVariant(null);
    
    setTimeout(() => {
      const captions = SAMPLE_CAPTIONS[selectedStyle] || SAMPLE_CAPTIONS['render'];
      const shuffledCaptions = [...captions].sort(() => Math.random() - 0.5);
      const shuffledGradients = [...VARIANT_GRADIENTS].sort(() => Math.random() - 0.5);
      
      const variants: GeneratedVariant[] = [
        { id: 1, gradient: shuffledGradients[0], caption: shuffledCaptions[0] },
        { id: 2, gradient: shuffledGradients[1], caption: shuffledCaptions[1] },
        { id: 3, gradient: shuffledGradients[2], caption: shuffledCaptions[2] },
      ];
      
      setGeneratedVariants(variants);
      setSelectedVariant(1);
      setGeneratedCaption(variants[0].caption);
      setEditedCaption(variants[0].caption);
      setIsRegenerating(false);
    }, 1200);
  };

  const handleSaveCaption = () => {
    setGeneratedCaption(editedCaption);
    setIsEditingCaption(false);
  };

  const handleClearAll = () => {
    setUploadedImage(null);
    setPromptInstructions('');
    setGeneratedCaption('');
    setGenerationStatus('idle');
    setSelectedStyle(null);
    setHoveredStyle(null);
    setIsEditingCaption(false);
    setIsRegenerating(false);
    setGeneratedVariants([]);
    setSelectedVariant(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApproveGenerated = () => {
    if (!selectedStyle || !generatedCaption || !selectedVariant) return;
    
    const variant = generatedVariants.find(v => v.id === selectedVariant);
    const newContent: ContentPiece = {
      id: String(Date.now()),
      product: {
        name: 'Nuevo Producto',
        sku: 'NEW-001',
        price: 100000,
        image: '📦'
      },
      type: selectedFormat,
      platforms: selectedPlatforms,
      status: 'approved',
      caption: generatedCaption,
      hashtags: [],
      cta: 'Consultar por WhatsApp',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:00',
      selectedStyle: selectedStyle,
      gradient: variant?.gradient || 'from-gray-100 to-white'
    };
    
    setContent(prev => [newContent, ...prev]);
    handleClearAll();
    setActiveTab('pending');
  };

  const getAspectClass = (format: ContentFormat) => {
    switch (format) {
      case 'feed': return 'aspect-square';
      case 'story': return 'aspect-[9/16]';
      case 'banner': return 'aspect-video';
      default: return 'aspect-square';
    }
  };

  const getMockupStyle = (format: ContentFormat) => {
    switch (format) {
      case 'feed': return { width: '280px' };
      case 'story': return { width: '200px' };
      case 'banner': return { width: '320px' };
      default: return { width: '280px' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contenido</h1>
          <p className="text-sm text-gray-500 mt-1">Generá contenido para redes con IA</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">
          <Calendar size={16} />
          Calendario
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Alcance', value: '18.2K', change: '+24%', icon: TrendingUp, color: 'text-emerald-600' },
          { label: 'Engagement', value: '7.8%', change: '+1.2%', icon: Heart, color: 'text-pink-600' },
          { label: 'Programados', value: String(approvedContent.length + pendingContent.length), sub: `${pendingContent.length} pendientes`, icon: Calendar, color: 'text-sky-600' },
          { label: 'Clicks WA', value: '156', change: '+32%', icon: MessageCircle, color: 'text-emerald-600' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">{kpi.label}</span>
              <kpi.icon size={14} className={kpi.color} />
            </div>
            <p className="text-xl font-semibold text-gray-900">{kpi.value}</p>
            {kpi.change && <p className={`text-xs ${kpi.color}`}>{kpi.change}</p>}
            {kpi.sub && <p className="text-xs text-gray-400">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { id: 'generate', label: 'Crear', icon: Wand2 },
          { id: 'pending', label: `Pendientes (${pendingContent.length})` },
          { id: 'calendar', label: 'Calendario' },
          { id: 'published', label: `Publicados (${publishedContent.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon && <tab.icon size={15} />}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Upload */}
          <div className="space-y-5">
            {/* Upload Area */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {!uploadedImage ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative p-8 text-center cursor-pointer transition-all ${
                    isDragging ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  {generationStatus === 'uploading' ? (
                    <div className="py-8">
                      <Loader2 size={32} className="text-gray-400 animate-spin mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">Subiendo...</p>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                        isDragging ? 'bg-gray-200' : 'bg-gray-100'
                      }`}>
                        <ImageIcon size={28} className="text-gray-400" />
                      </div>
                      <p className="text-gray-700 font-medium mb-1">
                        Arrastrá una imagen o hacé click
                      </p>
                      <p className="text-sm text-gray-400">PNG, JPG hasta 10MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="p-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src={uploadedImage} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={handleClearAll}
                      className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Options + Preview */}
          <div className="space-y-5">
            {/* Platform Selection */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Red social</h3>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        isSelected 
                          ? `${platform.bgColor} border-2 ${platform.color}` 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className={isSelected ? platform.color : 'text-gray-400'}>{platform.icon}</span>
                      {platform.name}
                      {isSelected && <Check size={14} className={platform.color} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Format Selection */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Formato</h3>
              <div className="grid grid-cols-3 gap-3">
                {FORMAT_OPTIONS.map((format) => {
                  const isSelected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-gray-900 bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={isSelected ? 'text-gray-900' : 'text-gray-400'}>{format.icon}</span>
                      <div className="text-center">
                        <p className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{format.name}</p>
                        <p className="text-xs text-gray-400">{format.ratio}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Style Selection */}
            <div className={`bg-white rounded-2xl border border-gray-100 p-5 transition-opacity ${
              uploadedImage ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Elegí un estilo</h3>
              
              <div className="flex gap-3 justify-between">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  const isHovered = hoveredStyle === style.id;
                  
                  return (
                    <button
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      onMouseEnter={() => setHoveredStyle(style.id)}
                      onMouseLeave={() => setHoveredStyle(null)}
                      disabled={!uploadedImage || generationStatus === 'generating'}
                      className="flex-1 group"
                    >
                      <div className={`relative aspect-square rounded-xl ${style.bgClass} transition-all duration-200 ${
                        isSelected 
                          ? 'ring-2 ring-gray-900 ring-offset-2 scale-105' 
                          : isHovered
                          ? 'ring-2 ring-gray-300 ring-offset-2 scale-105'
                          : 'hover:scale-105'
                      }`}>
                        {isSelected && generationStatus === 'generating' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                            <Loader2 size={20} className="text-white animate-spin" />
                          </div>
                        )}
                        {isSelected && generationStatus === 'complete' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className={`text-xs mt-2 text-center transition-colors ${
                        isSelected ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {style.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Instructions Card */}
            <div className={`bg-white rounded-2xl border border-gray-100 p-5 transition-opacity ${
              uploadedImage ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare size={16} />
                Instrucciones personalizadas
              </h3>
              <textarea
                value={promptInstructions}
                onChange={(e) => setPromptInstructions(e.target.value)}
                placeholder="Ej: Agrega nieve, incluí '25% OFF', estilo navideño, destacar que es último stock..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-400 resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">Opcional: se agregan al prompt de generación de IA</p>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <Eye size={16} />
                  Vista previa
                </h3>
                {selectedPlatforms.length > 0 && (
                  <div className="flex items-center gap-1">
                    {selectedPlatforms.map((p) => (
                      <span key={p} className="p-1">{platformIcons[p]}</span>
                    ))}
                    <span className="text-xs text-gray-400 ml-2">
                      {FORMAT_OPTIONS.find(f => f.id === selectedFormat)?.dimensions}
                    </span>
                  </div>
                )}
              </div>
              
              {uploadedImage && generatedVariants.length > 0 ? (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-3">Elegí una variante</p>
                    <div className="grid grid-cols-3 gap-3">
                      {generatedVariants.map((variant) => {
                        const isSelected = selectedVariant === variant.id;
                        return (
                          <button
                            key={variant.id}
                            onClick={() => handleVariantSelect(variant.id)}
                            className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                              isSelected 
                                ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className={`${getAspectClass(selectedFormat)} bg-gradient-to-br ${variant.gradient} flex items-center justify-center p-2`}>
                              <img 
                                src={uploadedImage} 
                                alt={`Variant ${variant.id}`} 
                                className="max-w-[80%] max-h-[80%] object-contain rounded shadow-lg"
                              />
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                                <Check size={14} className="text-white" />
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              {variant.id}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedVariant && (
                    <div className="flex justify-center">
                      <div className="bg-gray-900 rounded-[2rem] p-2.5 shadow-2xl" style={getMockupStyle(selectedFormat)}>
                        <div className="bg-white rounded-[1.5rem] overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                              <span className="text-xs font-semibold text-gray-900">infopartes</span>
                            </div>
                            <MoreVertical size={14} className="text-gray-400" />
                          </div>
                          
                          <div className={`${getAspectClass(selectedFormat)} bg-gradient-to-br ${generatedVariants.find(v => v.id === selectedVariant)?.gradient} flex items-center justify-center relative`}>
                            <img 
                              src={uploadedImage} 
                              alt="Preview" 
                              className="absolute inset-4 w-auto h-auto max-w-[70%] max-h-[70%] object-contain mx-auto my-auto rounded-lg shadow-2xl"
                            />
                          </div>
                          
                          <div className="p-3">
                            <div className="flex items-center gap-4 mb-2">
                              <Heart size={20} className="text-gray-800" />
                              <MessageCircle size={20} className="text-gray-800" />
                              <Share2 size={20} className="text-gray-800" />
                            </div>
                            <p className="text-xs text-gray-900">
                              <span className="font-semibold">infopartes</span>{' '}
                              <span className="text-gray-600">
                                {generatedCaption ? generatedCaption.substring(0, 40) + '...' : ''}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {generatedCaption && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Caption sugerido</span>
                        {!isEditingCaption && (
                          <button 
                            onClick={() => setIsEditingCaption(true)}
                            className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1"
                          >
                            <Edit3 size={12} />
                            Editar
                          </button>
                        )}
                      </div>
                      
                      {isEditingCaption ? (
                        <div className="space-y-2">
                          <textarea
                            value={editedCaption}
                            onChange={(e) => setEditedCaption(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={handleSaveCaption}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium"
                            >
                              <Save size={12} />
                              Guardar
                            </button>
                            <button 
                              onClick={() => {
                                setIsEditingCaption(false);
                                setEditedCaption(generatedCaption);
                              }}
                              className="px-3 py-1.5 text-gray-600 text-xs font-medium hover:bg-gray-200 rounded-lg"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">{generatedCaption}</p>
                      )}
                    </div>
                  )}
                  
                  {generationStatus === 'complete' && (
                    <div className="space-y-2">
                      <button 
                        onClick={handleApproveGenerated}
                        disabled={!selectedVariant}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check size={18} />
                        Aprobar y programar
                      </button>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={handleRegenerate}
                          disabled={isRegenerating}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                          {isRegenerating ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <RefreshCw size={14} />
                          )}
                          Regenerar 3 variantes
                        </button>
                        <button 
                          onClick={handleClearAll}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 size={14} />
                          Descartar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : uploadedImage && generationStatus === 'generating' ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Loader2 size={40} className="text-gray-400 animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Generando 3 variantes...</p>
                  <p className="text-sm text-gray-400 mt-1">Esto puede tomar unos segundos</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    {!uploadedImage ? 'Subí una imagen' : 'Elegí un estilo'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {!uploadedImage ? 'para empezar a crear' : 'para generar 3 variantes'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {pendingContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all p-4"
              >
                <div className="flex gap-4">
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center text-3xl flex-shrink-0`}>
                    {item.product.image}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[item.status].color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status].dot}`}></span>
                            {statusConfig[item.status].label}
                          </span>
                          <span className="text-xs text-gray-500">{typeLabels[item.type]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.platforms.map((p) => (
                          <span key={p} className="p-1">{platformIcons[p]}</span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.caption}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.scheduledDate).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {item.scheduledTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    <Check size={14} />
                    Aprobar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100">
                    <Edit3 size={14} />
                    Editar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100">
                    <RefreshCw size={14} />
                    Regenerar
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-red-600 rounded-lg text-sm hover:bg-red-50 ml-auto"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {pendingContent.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Sparkles size={40} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No hay contenido pendiente</p>
                <button 
                  onClick={() => setActiveTab('generate')}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium"
                >
                  Crear contenido
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-medium text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pendientes</span>
                  <span className="text-sm font-semibold text-amber-600">{pendingContent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aprobados</span>
                  <span className="text-sm font-semibold text-emerald-600">{approvedContent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Publicados</span>
                  <span className="text-sm font-semibold text-sky-600">{publishedContent.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">Semana 23-29 Diciembre</h3>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={18} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-3">
            {WEEKLY_SCHEDULE.map((day) => (
              <div
                key={day.day}
                className={`p-4 rounded-xl text-center border-2 cursor-pointer transition-all hover:shadow-md ${
                  day.status === 'empty'
                    ? 'border-dashed border-gray-200 bg-gray-50'
                    : day.status === 'published'
                    ? 'border-sky-200 bg-sky-50'
                    : day.status === 'scheduled'
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <p className="text-xs text-gray-500 font-medium">{day.day}</p>
                <p className="text-xl font-semibold text-gray-900 my-1">{day.date}</p>
                {day.posts > 0 ? (
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                    day.status === 'published' ? 'bg-sky-500 text-white'
                    : day.status === 'scheduled' ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500 text-white'
                  }`}>
                    {day.posts}
                  </span>
                ) : (
                  <button className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                    <Plus size={14} className="text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              Publicado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Programado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Pendiente
            </span>
          </div>
        </div>
      )}

      {activeTab === 'published' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedContent.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl`}>
                {item.product.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(item.scheduledDate).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {item.platforms.map((p) => (
                      <span key={p}>{platformIcons[p]}</span>
                    ))}
                  </div>
                </div>
                
                {item.metrics && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{(item.metrics.reach / 1000).toFixed(1)}K</p>
                      <p className="text-[10px] text-gray-500">Alcance</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{item.metrics.engagement}%</p>
                      <p className="text-[10px] text-gray-500">Eng.</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{item.metrics.likes}</p>
                      <p className="text-[10px] text-gray-500">Likes</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
