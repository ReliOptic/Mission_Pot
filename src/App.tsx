import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutGrid, Camera, Trophy, User, Plus, Minus, Zap, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Screen } from './types/index';
import { HABITS, STAKEHOLDERS, RANKINGS } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ONBOARDING');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-surface-container-lowest text-black dark:text-on-surface font-body min-h-screen transition-colors duration-300">
        <Header 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
          onToggleDark={toggleDarkMode} 
          isDarkMode={isDarkMode} 
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onNavigate={(s) => {
            setCurrentScreen(s);
            setIsSidebarOpen(false);
          }}
        />
        
        <main className="pt-20 pb-28 px-5 max-w-lg mx-auto min-h-screen overflow-x-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === 'ONBOARDING' && (
              <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <OnboardingScreen onJoin={() => setCurrentScreen('LOBBY')} />
              </motion.div>
            )}
            {currentScreen === 'LOBBY' && (
              <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LobbyScreen onSubmitProof={() => setCurrentScreen('PROOF')} />
              </motion.div>
            )}
            {currentScreen === 'PROOF' && (
              <motion.div key="proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProofScreen onSubmit={() => setCurrentScreen('RANKINGS')} onCancel={() => setCurrentScreen('LOBBY')} />
              </motion.div>
            )}
            {currentScreen === 'RANKINGS' && (
              <motion.div key="rankings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RankingsScreen onStakeNext={() => setCurrentScreen('ONBOARDING')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {currentScreen !== 'ONBOARDING' && currentScreen !== 'PROOF' && (
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        )}

        {/* Ambient Overlays */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-[300px] bg-gradient-to-t from-secondary/5 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function Header({ currentScreen, onNavigate, onToggleDark, isDarkMode, onOpenSidebar }: { currentScreen: Screen, onNavigate: (s: Screen) => void, onToggleDark: () => void, isDarkMode: boolean, onOpenSidebar: () => void }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-surface/90 backdrop-blur-xl flex justify-between items-center px-5 h-14 border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center gap-3">
        {currentScreen === 'PROOF' ? (
          <button onClick={() => onNavigate('LOBBY')} className="text-black dark:text-primary p-1">
            <X size={20} />
          </button>
        ) : (
          <button onClick={onOpenSidebar} className="text-black dark:text-primary p-1 active:scale-90 transition-transform">
            <Menu size={20} />
          </button>
        )}
        <h1 className="text-lg font-black italic text-black dark:text-primary font-headline tracking-tighter uppercase">MISSION POT</h1>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onToggleDark} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-primary active:scale-90 transition-transform">
          {isDarkMode ? <Zap size={16} /> : <Zap size={16} fill="currentColor" />}
        </button>
        <div className="text-black dark:text-primary font-headline font-bold text-sm">₩2,450</div>
      </div>
    </header>
  );
}

function Sidebar({ isOpen, onClose, onNavigate }: { isOpen: boolean, onClose: () => void, onNavigate: (s: Screen) => void }) {
  const menuItems = [
    { id: 'ONBOARDING' as Screen, label: '홈 / 온보딩', icon: LayoutGrid },
    { id: 'LOBBY' as Screen, label: '스테이크 로비', icon: Zap },
    { id: 'RANKINGS' as Screen, label: '리더보드', icon: Trophy },
    { id: 'SETTINGS' as any, label: '설정', icon: User },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-surface-container-low z-[101] shadow-2xl border-r border-black/5 dark:border-white/5 flex flex-col"
          >
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
              <h2 className="font-headline font-black italic text-xl tracking-tighter uppercase text-primary">MISSION POT</h2>
              <button onClick={onClose} className="text-neutral-400 p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow py-6 px-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.id !== 'SETTINGS' && onNavigate(item.id)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                  <item.icon size={20} className="text-neutral-400 group-hover:text-primary transition-colors" />
                  <span className="font-headline font-bold text-sm tracking-tight text-black dark:text-on-surface">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">나</div>
                <div>
                  <p className="font-headline font-bold text-sm text-black dark:text-on-surface">사용자님</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">LEVEL 4 STAKER</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-lg bg-black dark:bg-white/5 text-white dark:text-primary font-headline font-bold text-xs uppercase tracking-widest">로그아웃</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BottomNav({ currentScreen, onNavigate }: { currentScreen: Screen, onNavigate: (s: Screen) => void }) {
  const navItems = [
    { id: 'LOBBY' as Screen, label: '로비', icon: LayoutGrid },
    { id: 'PROOF' as Screen, label: '인증', icon: Camera },
    { id: 'RANKINGS' as Screen, label: '순위', icon: Trophy },
    { id: 'PROFILE' as any, label: '프로필', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-[2rem] bg-white/90 dark:bg-surface/80 backdrop-blur-xl flex justify-around items-center h-20 px-4 pb-safe border-t border-black/5 dark:border-white/5 shadow-[0_-8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_-24px_48px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => item.id !== 'PROFILE' && onNavigate(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
              isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(142,255,113,0.5)]' : 'text-neutral-400 dark:text-white/40'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="font-headline text-[10px] font-bold tracking-widest mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function OnboardingScreen({ onJoin }: { onJoin: () => void }) {
  const [stake, setStake] = useState(50000);
  const [selectedHabit, setSelectedHabit] = useState('1');

  return (
    <div className="space-y-8">
      <section className="pt-4">
        <h2 className="text-5xl leading-[0.85] font-headline font-black tracking-tighter mb-4 text-black dark:text-on-surface uppercase">
          CHOOSE YOUR <br />
          <span className="text-primary italic">STAKE.</span>
        </h2>
        <p className="text-neutral-500 dark:text-on-surface-variant text-base leading-snug max-w-[280px]">
          의지력은 믿지 마세요. <br />
          오직 잃을 것이 있을 때만 움직입니다.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline font-bold text-[10px] tracking-[0.2em] text-neutral-400 dark:text-on-surface-variant uppercase">OBJECTIVE</h3>
          <span className="text-[10px] font-mono text-primary">01 / 03</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {HABITS.map((habit) => (
            <div
              key={habit.id}
              onClick={() => setSelectedHabit(habit.id)}
              className={`group relative bg-neutral-50 dark:bg-surface-container-high rounded-lg overflow-hidden cursor-pointer active:scale-[0.98] transition-all border ${selectedHabit === habit.id ? 'border-primary bg-primary/5' : 'border-neutral-200 dark:border-white/5'}`}
            >
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded flex items-center justify-center ${selectedHabit === habit.id ? 'bg-primary text-black' : 'bg-black/5 dark:bg-white/5 text-neutral-400'}`}>
                    {habit.icon === 'Moon' && <Clock size={20} />}
                    {habit.icon === 'Dumbbell' && <Zap size={20} />}
                    {habit.icon === 'BookOpen' && <Trophy size={20} />}
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg tracking-tight text-black dark:text-on-surface">{habit.title}</h4>
                    <p className="text-[10px] text-neutral-400 dark:text-on-surface-variant font-headline tracking-widest uppercase">{habit.subtitle}</p>
                  </div>
                </div>
                {selectedHabit === habit.id && <CheckCircle2 size={18} className="text-primary" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 dark:bg-surface-container-low p-6 rounded-lg border border-neutral-200 dark:border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline font-bold text-[10px] tracking-[0.2em] text-neutral-400 dark:text-on-surface-variant uppercase">CAPITAL</h3>
          <span className="font-mono text-[10px] text-tertiary">RISK LEVEL: HIGH</span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => setStake(Math.max(10000, stake - 10000))} className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-black dark:text-on-surface active:scale-90 transition-transform">
              <Minus size={18} />
            </button>
            <div className="text-center">
              <span className="text-4xl font-headline font-black tracking-tighter text-black dark:text-on-surface">₩{stake.toLocaleString()}</span>
            </div>
            <button onClick={() => setStake(stake + 10000)} className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-black dark:text-on-surface active:scale-90 transition-transform">
              <Plus size={18} />
            </button>
          </div>
          <div className="flex gap-2">
            {[10000, 50000, 100000].map((val) => (
              <button key={val} onClick={() => setStake(stake + val)} className="px-3 py-1.5 rounded bg-white dark:bg-white/5 text-[10px] font-headline font-bold text-neutral-500 dark:text-white/40 border border-neutral-200 dark:border-white/10 active:scale-95 transition-transform">
                +₩{(val/1000)}K
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-4">
        <button onClick={onJoin} className="w-full h-14 bg-primary text-black rounded-lg flex items-center justify-center gap-2 group active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
          <span className="font-headline font-black tracking-widest text-base uppercase">ENTER THE POT</span>
          <Zap size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

function LobbyScreen({ onSubmitProof }: { onSubmitProof: () => void }) {
  return (
    <div className="space-y-6">
      <section className="bg-black dark:bg-surface-container-low rounded-lg p-8 text-center border-b-4 border-secondary overflow-hidden relative">
        <div className="relative z-10">
          <span className="font-headline text-[10px] tracking-[0.3em] text-white/40 font-bold uppercase mb-2 block">CURRENT POT</span>
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-headline text-6xl font-black tracking-tighter text-white">₩2,450,000</h1>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neutral-50 dark:bg-surface-container-high p-4 rounded-lg border border-neutral-200 dark:border-white/5">
          <span className="text-[10px] font-headline font-bold text-neutral-400 dark:text-white/30 uppercase tracking-widest">DEADLINE</span>
          <div className="text-2xl font-headline font-black text-primary mt-1">04:22:15</div>
        </div>
        <div className="bg-neutral-50 dark:bg-surface-container-high p-4 rounded-lg border border-neutral-200 dark:border-white/5">
          <span className="text-[10px] font-headline font-bold text-neutral-400 dark:text-white/30 uppercase tracking-widest">HEALTH</span>
          <div className="text-2xl font-headline font-black text-on-surface mt-1">88%</div>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-headline text-xs font-bold tracking-widest text-neutral-400 uppercase">STAKEHOLDERS</h2>
          <span className="text-[10px] font-mono text-secondary">12 ACTIVE</span>
        </div>
        <div className="space-y-2">
          {STAKEHOLDERS.map((member) => (
            <div key={member.id} className="bg-white dark:bg-surface-container-high rounded-lg border border-neutral-200 dark:border-white/5 overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img alt={member.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" src={member.avatar} />
                  <div>
                    <h3 className="font-headline font-bold text-sm text-on-surface">{member.name}</h3>
                    <p className={`text-[9px] font-bold font-headline tracking-widest uppercase ${member.status === 'VERIFIED' ? 'text-primary' : member.status === 'PENDING' ? 'text-secondary' : 'text-error'}`}>
                      {member.status === 'VERIFIED' ? 'VERIFIED' : member.status === 'PENDING' ? 'PENDING' : 'FAILED'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-headline font-black text-sm ${member.amount > 0 ? 'text-on-surface' : 'text-error'}`}>
                    {member.amount > 0 ? `+₩${Math.abs(member.amount)}K` : `-₩${Math.abs(member.amount)}K`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button onClick={onSubmitProof} className="w-full h-14 bg-primary text-black rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
        <Camera size={20} fill="currentColor" />
        <span className="font-headline font-black tracking-widest text-base uppercase">SUBMIT PROOF</span>
      </button>
    </div>
  );
}

function ProofScreen({ onSubmit, onCancel }: { onSubmit: () => void, onCancel: () => void }) {
  const [isCameraActive, setIsCameraActive] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] bg-black overflow-hidden flex flex-col">
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-5 h-14 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onCancel} className="text-white p-2">
          <X size={20} />
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
          <span className="font-headline font-bold text-[10px] text-white uppercase tracking-widest">RISK: ₩45K</span>
        </div>
      </header>

      <main className="relative flex-grow flex items-center justify-center">
        {!isCameraActive ? (
          <div className="text-center p-8 space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Camera size={32} className="text-white/40" />
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-headline font-bold text-xl uppercase tracking-tight">인증 카메라 활성화</h3>
              <p className="text-white/40 text-sm max-w-[240px] mx-auto">
                인증을 위해 카메라 접근 권한이 필요합니다. <br />
                인증샷은 그룹원들에게만 공개됩니다.
              </p>
            </div>
            <button 
              onClick={() => setIsCameraActive(true)}
              className="px-8 py-3 bg-primary text-black rounded-lg font-headline font-black text-sm uppercase tracking-widest active:scale-95 transition-transform"
            >
              카메라 켜기
            </button>
          </div>
        ) : (
          <div className="absolute inset-0">
            <img alt="Viewfinder" className="w-full h-full object-cover" referrerPolicy="no-referrer" src="https://picsum.photos/seed/shoes/800/1200" />
            <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
            <div className="absolute inset-x-10 inset-y-32 border border-white/20 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
            </div>
          </div>
        )}

        {isCameraActive && (
          <div className="absolute bottom-0 w-full z-30 pb-10 pt-20 px-8 flex flex-col items-center gap-8 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center justify-between w-full max-w-xs">
              <div className="w-12 h-12" />
              <button onClick={onSubmit} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 active:scale-90 transition-transform">
                <div className="w-full h-full rounded-full bg-white" />
              </button>
              <button onClick={() => setIsCameraActive(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function RankingsScreen({ onStakeNext }: { onStakeNext: () => void }) {
  return (
    <div className="space-y-8 pb-10">
      <section className="text-center pt-4">
        <h2 className="font-headline text-4xl font-black tracking-tighter leading-none mb-3 uppercase text-black dark:text-on-surface italic">
          THE POT <br />
          <span className="text-primary">CLAIMED.</span>
        </h2>
        <div className="inline-flex items-center gap-2 bg-black dark:bg-surface-container-high px-5 py-2 rounded-full">
          <Zap className="text-primary" size={14} fill="currentColor" />
          <span className="font-headline font-bold text-lg text-white tracking-tight">₩2,450,000 분배</span>
        </div>
      </section>

      <section className="relative bg-neutral-50 dark:bg-surface-container-low p-6 rounded-lg border border-neutral-200 dark:border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <div className="bg-primary text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">WINNER</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden">
            <img className="w-full h-full object-cover" referrerPolicy="no-referrer" src="https://picsum.photos/seed/winner/200/200" alt="Winner" />
          </div>
          <div>
            <h3 className="font-headline text-2xl font-black tracking-tighter text-black dark:text-on-surface uppercase italic">ALEXA_STAKES</h3>
            <p className="font-headline text-primary text-[10px] tracking-widest font-bold uppercase">100% SUCCESS RATE</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-white/5 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">REWARD</p>
            <div className="font-headline text-4xl font-black text-black dark:text-on-surface tracking-tighter">₩842,500</div>
          </div>
          <Trophy className="text-primary/20" size={48} />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-headline text-xs font-bold tracking-widest text-neutral-400 uppercase px-1">LEADERBOARD</h3>
        <div className="space-y-2">
          {RANKINGS.map((rank) => (
            <div key={rank.name} className={`p-4 rounded-lg flex items-center gap-4 border ${rank.isUser ? 'bg-primary/5 border-primary/20' : 'bg-white dark:bg-surface-container-low border-neutral-200 dark:border-white/5'}`}>
              <div className={`w-6 font-headline font-black italic text-lg ${rank.isUser ? 'text-primary' : 'text-neutral-300'}`}>{rank.rank}</div>
              <div className="flex-grow">
                <p className={`font-headline font-bold text-sm leading-none ${rank.isUser ? 'text-primary' : 'text-black dark:text-on-surface'}`}>{rank.name}</p>
                <p className="text-[9px] text-neutral-400 tracking-widest font-bold uppercase mt-1">{rank.successRate}</p>
              </div>
              <div className="text-right">
                <p className={`font-headline font-bold text-sm ${rank.amount > 0 ? 'text-on-surface' : 'text-error'}`}>
                  {rank.amount > 0 ? `+₩${Math.abs(rank.amount)}K` : `-₩${Math.abs(rank.amount)}K`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button onClick={onStakeNext} className="w-full h-14 bg-primary text-black rounded-lg font-headline font-black text-base uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-primary/20">
        STAKE NEXT WEEK
      </button>
    </div>
  );
}
