import React, { useState, useRef } from 'react';
import { 
  Users, 
  Map, 
  TrendingUp, 
  Layers, 
  Share2, 
  Search, 
  Heart, 
  Zap, 
  Brain, 
  Smile,
  Download,
  Info
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { UserVibeProfile, CompatibilityResult } from '../types';
import { getCompatibility, getRandomUser, mockUsers } from '../mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Feature 1: Compatibility ---
export const CompatibilityView = () => {
  const [handle1, setHandle1] = useState('elonmusk');
  const [handle2, setHandle2] = useState('taylorswift13');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    /**
     * REAL API CALL:
     * const res = await fetch(`/api/compatibility?u1=${handle1}&u2=${handle2}`);
     * const data = await res.json();
     * setResult(data);
     */
    setTimeout(() => {
      setResult(getCompatibility(handle1, handle2));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="text-white" /> Vibe Compatibility
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm text-white/50 ml-1">Handle 1</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
              <input 
                value={handle1}
                onChange={(e) => setHandle1(e.target.value)}
                className="input-field w-full pl-8"
                placeholder="handle1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/50 ml-1">Handle 2</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
              <input 
                value={handle2}
                onChange={(e) => setHandle2(e.target.value)}
                className="input-field w-full pl-8"
                placeholder="handle2"
              />
            </div>
          </div>
        </div>
        <button onClick={handleAnalyze} disabled={loading} className="btn-minimal w-full">
          {loading ? 'Analyzing Vibes...' : 'Check Compatibility'}
        </button>
      </div>

      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Heart size={120} className="text-pink-500" />
            </div>
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="8" 
                  />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="8" 
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * result.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#666666" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black">{result.score}%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{result.verdict}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {result.sharedInterests.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Tone Similarity</span>
                  <span>{result.toneSimilarity}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.toneSimilarity}%` }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Posting Style</span>
                  <span>{result.postingStyleMatch}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.postingStyleMatch}%` }}
                    className="h-full bg-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Engagement</span>
                  <span>{result.engagementPatternMatch}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.engagementPatternMatch}%` }}
                    className="h-full bg-white/30"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Feature 2: Interest Map ---
export const InterestMapView = () => {
  const [handle, setHandle] = useState('elonmusk');
  const [user, setUser] = useState<UserVibeProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    /**
     * REAL API CALL:
     * const res = await fetch(`/api/user/${handle}`);
     * const data = await res.json();
     * setUser(data);
     */
    setTimeout(() => {
      setUser(getRandomUser(handle));
      setLoading(false);
    }, 1000);
  };

  const radarData = user ? user.interestMap.posted.map((item, idx) => ({
    subject: item.topic,
    posted: item.score,
    engaged: user.interestMap.engaged[idx]?.score || 0,
    fullMark: 100,
  })) : [];

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Map className="text-white" /> Topic Interest Map
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
            <input 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="input-field w-full pl-8"
              placeholder="Enter handle..."
            />
          </div>
          <button onClick={handleSearch} disabled={loading} className="btn-minimal">
            <Search size={20} />
          </button>
        </div>
      </div>

      {user && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card h-[400px]"
          >
            <h3 className="text-lg font-bold mb-4">Passion Radar</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Radar
                  name="Posted About"
                  dataKey="posted"
                  stroke="#ffffff"
                  fill="#ffffff"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Engaged With"
                  dataKey="engaged"
                  stroke="#666666"
                  fill="#666666"
                  fillOpacity={0.4}
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h3 className="text-lg font-bold mb-6">Vibe Breakdown</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Smile className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Positivity</span>
                    <span className="text-sm text-white/50">{user.stats.positivity}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${user.stats.positivity}%` }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Zap className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Chaos Energy</span>
                    <span className="text-sm text-white/50">{user.stats.chaos}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${user.stats.chaos}%` }}
                      className="h-full bg-white/60"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Brain className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Intellect</span>
                    <span className="text-sm text-white/50">{user.stats.intellect}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${user.stats.intellect}%` }}
                      className="h-full bg-white/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- Feature 3: Vibe Trend ---
export const TrendView = () => {
  const [handle, setHandle] = useState('taylorswift13');
  const [user, setUser] = useState<UserVibeProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    /**
     * REAL API CALL:
     * const res = await fetch(`/api/trend/${handle}`);
     * const data = await res.json();
     * setUser(data);
     */
    setTimeout(() => {
      setUser(getRandomUser(handle));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="text-white" /> Vibe Trend Over Time
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
            <input 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="input-field w-full pl-8"
              placeholder="Enter handle..."
            />
          </div>
          <button onClick={handleSearch} disabled={loading} className="btn-minimal">
            <Search size={20} />
          </button>
        </div>
      </div>

      {user && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card h-[500px]"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Sentiment & Tone Shift</h3>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <div className="w-3 h-3 rounded-full bg-white" /> Sentiment Score
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={user.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#1a1a1e] border border-white/10 p-3 rounded-xl shadow-2xl">
                        <p className="text-white/50 text-xs mb-1">{data.date}</p>
                        <p className="font-bold text-white">Sentiment: {data.sentiment}</p>
                        <p className="text-sm">Tone: <span className="text-white/70">{data.tone}</span></p>
                        <p className="text-sm">Focus: <span className="text-white/50">{data.focus}</span></p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#ffffff" 
                strokeWidth={4}
                dot={{ fill: '#ffffff', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#000', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info size={18} className="text-white" />
              <span className="text-sm text-white/70">Vibe Drift Indicator: <span className="text-white font-bold">Low</span></span>
            </div>
            <span className="text-xs text-white/30">Stable personality detected</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// --- Feature 4: Multi-Account Comparison ---
export const ComparisonView = () => {
  const [handles, setHandles] = useState(['elonmusk', 'taylorswift13']);
  const [newHandle, setNewHandle] = useState('');
  const [users, setUsers] = useState<UserVibeProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCompare = () => {
    setLoading(true);
    /**
     * REAL API CALL:
     * const res = await fetch(`/api/compare?handles=${handles.join(',')}`);
     * const data = await res.json();
     * setUsers(data);
     */
    setTimeout(() => {
      setUsers(handles.map(h => getRandomUser(h)));
      setLoading(false);
    }, 1200);
  };

  const addHandle = () => {
    if (newHandle && !handles.includes(newHandle) && handles.length < 5) {
      setHandles([...handles, newHandle]);
      setNewHandle('');
    }
  };

  const removeHandle = (h: string) => {
    setHandles(handles.filter(item => item !== h));
  };

  const comparisonData = users.length > 0 ? [
    { name: 'Positivity', ...Object.fromEntries(users.map(u => [u.handle, u.stats.positivity])) },
    { name: 'Chaos', ...Object.fromEntries(users.map(u => [u.handle, u.stats.chaos])) },
    { name: 'Intellect', ...Object.fromEntries(users.map(u => [u.handle, u.stats.intellect])) },
    { name: 'Humor', ...Object.fromEntries(users.map(u => [u.handle, u.stats.humor])) },
  ] : [];

  const colors = ['#ffffff', '#999999', '#666666', '#333333', '#cccccc'];

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Layers className="text-white" /> Multi-Account Comparison
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {handles.map(h => (
              <span key={h} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/5 flex items-center gap-2 text-sm">
                @{h}
                <button onClick={() => removeHandle(h)} className="hover:text-red-400">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
              <input 
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHandle()}
                className="input-field w-full pl-8"
                placeholder="Add handle (max 5)..."
              />
            </div>
            <button onClick={addHandle} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">Add</button>
          </div>
          <button onClick={handleCompare} disabled={loading || handles.length < 2} className="btn-minimal w-full">
            {loading ? 'Comparing Vibes...' : 'Run Comparison'}
          </button>
        </div>
      </div>

      {users.length > 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card h-[500px]"
        >
          <h3 className="text-lg font-bold mb-8">Vibe Profile Comparison</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              {users.map((u, i) => (
                <Bar key={u.handle} dataKey={u.handle} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
};

// --- Feature 5: Shareable Vibe Cards ---
export const ShareableView = () => {
  const [handle, setHandle] = useState('elonmusk');
  const [user, setUser] = useState<UserVibeProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    setLoading(true);
    /**
     * REAL API CALL:
     * const res = await fetch(`/api/card/${handle}`);
     * const data = await res.json();
     * setUser(data);
     */
    setTimeout(() => {
      setUser(getRandomUser(handle));
      setLoading(false);
    }, 1000);
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `vibe-check-${handle}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Share2 className="neon-accent" /> Shareable Vibe Cards
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
            <input 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="input-field w-full pl-8"
              placeholder="Enter handle..."
            />
          </div>
          <button onClick={handleSearch} disabled={loading} className="btn-primary">
            <Search size={20} />
          </button>
        </div>
      </div>

      {user && !loading && (
        <div className="flex flex-col items-center gap-8">
          <div ref={cardRef} className="w-[350px] h-[500px] rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl bg-black border border-white/10">
            {/* Background Accents */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00FF00]/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00FF00]/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl border-2 border-[#00FF00]/30 shadow-[0_0_15px_rgba(0,255,0,0.2)]" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-black text-xl leading-tight tracking-tighter">{user.name}</h4>
                  <p className="text-[#00FF00] font-mono text-xs tracking-widest uppercase">@{user.handle}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {user.vibeTags.map(tag => (
                  <div key={tag.label} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.2em] font-black flex items-center gap-1">
                    {tag.emoji} {tag.label}
                  </div>
                ))}
              </div>

              <div className="flex-1">
                <p className="text-sm text-white/80 leading-relaxed mb-8 font-medium">
                  {user.summary}
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black">Chaos Level</span>
                      <span className="text-[#00FF00] font-mono text-xs">{user.stats.chaos}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.5)]" style={{ width: `${user.stats.chaos}%` }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black">Positivity</span>
                      <span className="text-white font-mono text-xs">{user.stats.positivity}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-white" style={{ width: `${user.stats.positivity}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-black">System Output</span>
                  <span className="text-xs font-black tracking-tighter text-[#00FF00]">VIBECHECK.OS</span>
                </div>
                <div className="w-10 h-10 bg-[#00FF00]/5 rounded-xl flex items-center justify-center border border-[#00FF00]/20">
                  <Zap size={16} className="text-[#00FF00]" fill="#00FF00" />
                </div>
              </div>
            </div>
          </div>

          <button onClick={downloadCard} className="btn-neon w-full max-w-[350px]">
            <Download size={20} /> Export Vibe Card
          </button>
        </div>
      )}
    </div>
  );
};
