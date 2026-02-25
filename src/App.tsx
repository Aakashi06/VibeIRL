import React, { useState } from 'react';
import { 
  Users, 
  Map, 
  TrendingUp, 
  Layers, 
  Share2,
  Menu,
  X,
  Zap
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

  const navItems = [
    { id: 'compatibility', label: 'Compatibility', icon: Users, color: 'text-white' },
    { id: 'interest', label: 'Interest Map', icon: Map, color: 'text-white' },
    { id: 'trend', label: 'Vibe Trend', icon: TrendingUp, color: 'text-white' },
    { id: 'comparison', label: 'Comparison', icon: Layers, color: 'text-white' },
    { id: 'share', label: 'Vibe Cards', icon: Share2, color: 'text-white' },
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
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/10">
              <Zap className="text-black" fill="black" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">VibeCheck</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                  ${activeView === item.id 
                    ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'}
                `}
              >
                <item.icon size={20} className={activeView === item.id ? item.color : ''} />
                <span className="font-medium">{item.label}</span>
                {activeView === item.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">Status</p>
            <p className="text-xs text-emerald-400 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Systems Online
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 border-b border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-sm text-white/30">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-white/70 capitalize">{activeView.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold">Prototype Mode</span>
              <span className="text-[10px] text-white/30">Mock Data Active</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Users size={18} className="text-white/50" />
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
