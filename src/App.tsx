import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Map, 
  TrendingUp, 
  Layers, 
  Share2,
  Menu,
  X,
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CompatibilityView, 
  InterestMapView, 
  TrendView, 
  ComparisonView, 
  ShareableView 
} from './components/Views';

type ViewType = 'compatibility' | 'interest' | 'trend' | 'comparison' | 'share';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('compatibility');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'compatibility', label: 'Compatibility', icon: Users, color: 'var(--text)' },
    { id: 'interest', label: 'Interest Map', icon: Map, color: 'var(--text)' },
    { id: 'trend', label: 'Vibe Trend', icon: TrendingUp, color: 'var(--text)' },
    { id: 'comparison', label: 'Comparison', icon: Layers, color: 'var(--text)' },
    { id: 'share', label: 'Vibe Cards', icon: Share2, color: 'var(--text)' },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'compatibility': return <CompatibilityView />;
      case 'interest': return <InterestMapView />;
      case 'trend': return <TrendView />;
      case 'comparison': return <ComparisonView />;
      case 'share': return <ShareableView />;
      default: return <CompatibilityView />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/10 transition-transform duration-300 transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--text)', shadowColor: 'var(--border)' }}>
              <Zap size={20} style={{ color: 'var(--bg)', fill: 'var(--bg)' }} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">VibeIRL</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                  ${activeView === item.id 
                    ? 'bg-white/10 shadow-lg border border-white/10' 
                    : 'opacity-50 hover:opacity-100 hover:bg-white/5'}
                `}
                style={{ color: activeView === item.id ? 'var(--text)' : 'var(--text)' }}
              >
                <item.icon size={20} className={activeView === item.id ? item.color : ''} />
                <span className="font-medium">{item.label}</span>
                {activeView === item.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--text)' }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 overflow-hidden">
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-2 text-center">Live Status</p>
            <div className="marquee-container">
              <div className="marquee-content flex gap-8 items-center">
                <span className="text-[10px] font-mono flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#00FF00] animate-pulse" />
                  SYSTEMS_NOMINAL
                </span>
                <span className="text-[10px] font-mono flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#00FF00] animate-pulse" />
                  VIBE_STREAM_ACTIVE
                </span>
                <span className="text-[10px] font-mono flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#00FF00] animate-pulse" />
                  ANALYZING_HANDLES
                </span>
                {/* Duplicate for seamless loop */}
                <span className="text-[10px] font-mono flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#00FF00] animate-pulse" />
                  SYSTEMS_NOMINAL
                </span>
                <span className="text-[10px] font-mono flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#00FF00] animate-pulse" />
                  VIBE_STREAM_ACTIVE
                </span>
                <span className="text-[10px] font-mono flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#00FF00] animate-pulse" />
                  ANALYZING_HANDLES
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: 'var(--bg)' }}>
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 border-b" style={{ borderColor: 'var(--border)' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-sm opacity-30">
            <span>Dashboard</span>
            <span>/</span>
            <span className="opacity-70 capitalize">{activeView.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-4">
            <div 
              onClick={toggleTheme}
              className="theme-toggle"
            >
              <motion.div 
                className="theme-toggle-thumb"
                animate={{ x: theme === 'light' ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                <Moon size={10} className={theme === 'dark' ? 'text-white' : 'text-transparent'} />
                <Sun size={10} className={theme === 'light' ? 'text-black' : 'text-transparent'} />
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold">Prototype Mode</span>
              <span className="text-[10px] opacity-30">Mock Data Active</span>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <Users size={18} className="opacity-50" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
