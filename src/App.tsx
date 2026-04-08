import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutGrid, Camera, Trophy, User, Plus, Minus, Zap, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Screen } from './types/index';
import { HABITS, STAKEHOLDERS, RANKINGS } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ONBOARDING');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-surface-container-lowest text-black dark:text-on-surface font-body min-h-screen transition-colors duration-300">
        <Header currentScreen={currentScreen} onNavigate={setCurrentScreen} onToggleDark={toggleDarkMode} isDarkMode={isDarkMode} />
        
        <main className="pt-24 pb-32 px-6 max-w-lg mx-auto min-h-screen overflow-x-hidden">
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

function Header({ currentScreen, onNavigate, onToggleDark, isDarkMode }: { currentScreen: Screen, onNavigate: (s: Screen) => void, onToggleDark: () => void, isDarkMode: boolean }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-surface/80 backdrop-blur-md flex justify-between items-center px-6 h-16 border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {currentScreen === 'PROOF' ? (
          <button onClick={() => onNavigate('LOBBY')} className="text-black dark:text-primary">
            <X size={24} />
          </button>
        ) : (
          <Menu size={24} className="text-black dark:text-primary cursor-pointer" />
        )}
        <h1 className="text-xl font-black italic text-black dark:text-primary font-headline tracking-tighter uppercase">MISSION POT</h1>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onToggleDark} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-primary">
          {isDarkMode ? <Zap size={18} /> : <Zap size={18} fill="currentColor" />}
        </button>
        <div className="text-black dark:text-primary font-headline font-bold">$2,450</div>
      </div>
    </header>
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
    <div className="space-y-10">
      <section>
        <div className="inline-block px-3 py-1 rounded-full bg-black/5 dark:bg-surface-container-highest text-black dark:text-primary font-headline text-[10px] tracking-widest mb-4">온보딩 V1.0</div>
        <h2 className="text-[3.5rem] leading-[0.9] font-headline font-extrabold tracking-tighter mb-4 text-black dark:text-on-surface">목표를 <span className="text-primary">선택하세요.</span></h2>
        <p className="text-neutral-500 dark:text-on-surface-variant text-lg leading-tight">추적은 없습니다. 오직 실전뿐입니다. 목표를 정하고 자본을 거세요.</p>
      </section>

      <section>
        <h3 className="font-headline font-bold text-sm tracking-widest text-neutral-400 dark:text-on-surface-variant uppercase mb-6">목표 선택</h3>
        <div className="grid grid-cols-2 gap-4">
          {HABITS.map((habit, idx) => (
            <div
              key={habit.id}
              onClick={() => setSelectedHabit(habit.id)}
              className={`${idx === 0 ? 'col-span-2' : ''} group relative bg-neutral-50 dark:bg-surface-container-high rounded-xl overflow-hidden cursor-pointer active:scale-95 duration-150 border border-neutral-200 dark:border-transparent ${selectedHabit === habit.id ? 'border-primary ring-1 ring-primary' : ''}`}
            >
              <div className="p-6 relative z-10 flex justify-between items-center">
                <div>
                  <div className={`mb-2 ${habit.color === 'primary' ? 'text-primary' : habit.color === 'secondary' ? 'text-secondary' : 'text-tertiary'}`}>
                    {habit.icon === 'Moon' && <Clock size={24} />}
                    {habit.icon === 'Dumbbell' && <Zap size={24} />}
                    {habit.icon === 'BookOpen' && <Trophy size={24} />}
                  </div>
                  <h4 className="font-headline font-bold text-xl tracking-tight text-black dark:text-on-surface">{habit.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-on-surface-variant font-headline tracking-wide uppercase">{habit.subtitle}</p>
                </div>
                <div className={`w-10 h-10 rounded-full border border-neutral-300 dark:border-outline-variant flex items-center justify-center transition-colors ${selectedHabit === habit.id ? 'bg-primary text-black' : 'group-hover:bg-primary/20'}`}>
                  <Plus size={20} />
                </div>
              </div>
              <div className={`h-2 absolute bottom-0 left-0 transition-all ${habit.color === 'primary' ? 'bg-primary' : habit.color === 'secondary' ? 'bg-secondary' : 'bg-tertiary'} ${selectedHabit === habit.id ? 'w-full' : 'w-1/3'}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-neutral-50 dark:bg-surface-container-low p-8 rounded-xl border border-neutral-200 dark:border-transparent">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <h3 className="font-headline font-bold text-sm tracking-widest text-neutral-400 dark:text-on-surface-variant uppercase mb-8">자본 예치</h3>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setStake(Math.max(0, stake - 10000))} className="w-12 h-12 rounded-full bg-white dark:bg-surface-container-highest border border-neutral-200 dark:border-transparent flex items-center justify-center text-black dark:text-on-surface hover:bg-neutral-100 dark:hover:bg-surface-bright transition-colors">
              <Minus size={20} />
            </button>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[4rem] font-headline font-black tracking-tighter relative z-10 leading-none text-black dark:text-on-surface">₩{stake.toLocaleString()}</span>
            </div>
            <button onClick={() => setStake(stake + 10000)} className="w-12 h-12 rounded-full bg-white dark:bg-surface-container-highest border border-neutral-200 dark:border-transparent flex items-center justify-center text-black dark:text-on-surface hover:bg-neutral-100 dark:hover:bg-surface-bright transition-colors">
              <Plus size={20} />
            </button>
          </div>
          <div className="flex gap-2">
            {[10000, 50000, '최대'].map((val) => (
              <span key={val} onClick={() => typeof val === 'number' ? setStake(stake + val) : setStake(1000000)} className="px-4 py-2 rounded-full bg-white dark:bg-surface-container-highest text-xs font-headline text-neutral-600 dark:text-on-surface-variant border border-neutral-200 dark:border-outline-variant/20 hover:border-primary transition-colors cursor-pointer">
                {typeof val === 'number' ? `+ ₩${val/1000}k` : val}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-surface-container-high/50 border-l-4 border-tertiary shadow-sm">
          <AlertTriangle className="text-tertiary shrink-0" size={20} />
          <div>
            <h5 className="font-headline font-bold text-xs uppercase text-tertiary">청산 경고</h5>
            <p className="text-xs text-neutral-500 dark:text-on-surface-variant">매일 인증을 제공하지 않으면 예치금이 즉시 그룹 풀로 몰수됩니다.</p>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        <button onClick={onJoin} className="w-full h-16 kinetic-gradient rounded-xl flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(57,255,20,0.3)]">
          <span className="text-black font-headline font-black tracking-widest text-lg uppercase">스테이크 그룹 참여</span>
          <Zap className="text-black group-hover:translate-x-1 transition-transform" size={20} fill="currentColor" />
        </button>
        <button className="w-full h-16 bg-white dark:glass-card border border-neutral-200 dark:border-outline-variant/30 rounded-xl flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-surface-bright/40 transition-colors">
          <span className="text-black dark:text-on-surface font-headline font-bold tracking-widest text-sm uppercase">개인 스테이크 생성</span>
        </button>
      </div>

      <section className="mt-16 text-center">
        <h4 className="font-headline font-bold text-[10px] tracking-widest text-neutral-400 dark:text-on-surface-variant uppercase mb-4">실시간 경쟁자</h4>
        <div className="flex justify-center -space-x-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-12 h-12 rounded-full border-4 border-white dark:border-surface-container-lowest overflow-hidden">
              <img className="w-full h-full object-cover" referrerPolicy="no-referrer" src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
              <div className={`absolute inset-0 ring-2 ${i === 1 ? 'ring-primary' : i === 2 ? 'ring-secondary' : i === 3 ? 'ring-tertiary' : ''} ring-inset rounded-full`} />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-white dark:border-surface-container-lowest bg-neutral-100 dark:bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-neutral-500 dark:text-on-surface-variant">
            +42
          </div>
        </div>
        <p className="mt-4 text-xs font-headline text-neutral-400 dark:text-on-surface-variant tracking-wider uppercase">₩4,250,000 현재 예치 중</p>
      </section>
    </div>
  );
}

function LobbyScreen({ onSubmitProof }: { onSubmitProof: () => void }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-surface-container-low p-8 text-center border-b-8 border-secondary shadow-sm">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="font-headline text-xs tracking-[0.2em] text-on-surface-variant font-bold uppercase">현재 그룹 팟</span>
          <div className="flex items-center gap-3">
            <Zap className="text-secondary" size={40} fill="currentColor" />
            <h1 className="font-headline text-6xl font-black tracking-tighter text-on-surface text-glow-secondary">$1,840.00</h1>
          </div>
          <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-headline text-[10px] font-bold text-secondary tracking-widest uppercase">실시간 스테이크 진행 중</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-high rounded-xl p-6 flex flex-col justify-between border border-outline-variant/50">
          <span className="font-headline text-[10px] font-black text-on-surface-variant tracking-widest uppercase">마감까지</span>
          <div>
            <div className="font-headline text-5xl font-black text-primary">04:22:15</div>
            <p className="font-body text-xs text-on-surface-variant mt-2 leading-relaxed">마감이 오기 전에 오늘의 인증을 완료하세요.</p>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-xl p-6 flex flex-col justify-between border-r-8 border-primary border border-outline-variant/50">
          <span className="font-headline text-[10px] font-black text-on-surface-variant tracking-widest uppercase">그룹 건강도</span>
          <div className="flex items-end justify-between">
            <div className="font-headline text-5xl font-black text-on-surface">88%</div>
            <div className="flex gap-1 pb-2">
              {[6, 8, 5, 10].map((h, i) => (
                <div key={i} className="w-1.5 bg-primary rounded-full" style={{ height: `${h * 4}px` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="font-headline text-2xl font-bold tracking-tight">이해관계자</h2>
          <span className="font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">12명 활동 중</span>
        </div>
        <div className="space-y-3">
          {STAKEHOLDERS.map((member) => (
            <div key={member.id} className="bg-white dark:bg-surface-container-high rounded-xl overflow-hidden relative border border-outline-variant/30 shadow-sm">
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${member.status === 'VERIFIED' ? 'bg-primary' : member.status === 'PENDING' ? 'bg-secondary/50' : 'bg-error'}`} />
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img alt={member.name} className={`w-12 h-12 rounded-full object-cover ${member.status !== 'VERIFIED' ? 'grayscale' : ''}`} referrerPolicy="no-referrer" src={member.avatar} />
                    <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 border-2 border-white dark:border-surface-container-high ${member.status === 'VERIFIED' ? 'bg-primary text-black' : member.status === 'PENDING' ? 'bg-secondary text-black' : 'bg-error text-white'}`}>
                      {member.status === 'VERIFIED' ? <CheckCircle2 size={12} /> : member.status === 'PENDING' ? <Clock size={12} /> : <AlertTriangle size={12} />}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface">{member.name}</h3>
                    <p className={`text-[10px] font-bold font-headline tracking-wider uppercase ${member.status === 'VERIFIED' ? 'text-primary' : member.status === 'PENDING' ? 'text-secondary' : 'text-error'}`}>{member.status === 'VERIFIED' ? '인증 완료' : member.status === 'PENDING' ? '인증 대기' : '인증 실패'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-headline font-black text-lg ${member.amount > 0 ? 'text-on-surface' : member.status === 'PENDING' ? 'text-secondary' : 'text-error'}`}>
                    {member.amount > 0 ? `+$${member.amount.toFixed(2)}` : `-$${Math.abs(member.amount).toFixed(2)}`}
                  </div>
                  <p className="text-[10px] font-bold text-on-surface-variant font-headline uppercase">{member.label}</p>
                </div>
              </div>
              <div className="h-2 w-full bg-surface-container-highest">
                <div className={`h-full ${member.status === 'VERIFIED' ? 'bg-primary w-full shadow-[0_0_8px_#8eff71]' : member.status === 'PENDING' ? 'bg-secondary w-1/3' : 'bg-error w-0'}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <button onClick={onSubmitProof} className="w-full gradient-primary rounded-xl py-6 flex items-center justify-center gap-3 active:scale-95 duration-150 group shadow-lg shadow-primary/20 dark:shadow-none">
        <Camera className="text-on-primary text-3xl" size={32} fill="currentColor" />
        <span className="font-headline font-black text-xl text-on-primary tracking-tight uppercase">오늘의 인증 제출</span>
      </button>
    </div>
  );
}

function ProofScreen({ onSubmit, onCancel }: { onSubmit: () => void, onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-surface-container-lowest overflow-hidden flex flex-col">
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="text-primary">
            <X size={24} />
          </button>
          <span className="font-headline font-bold tracking-tighter text-xl font-black italic text-primary">MISSION POT</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full">
          <AlertTriangle className="text-tertiary" size={14} />
          <span className="font-headline font-bold text-xs text-white/90 uppercase">위험: $45.00</span>
        </div>
      </header>

      <main className="relative flex-grow">
        <div className="absolute inset-0 z-0">
          <img alt="Viewfinder" className="w-full h-full object-cover grayscale brightness-50" referrerPolicy="no-referrer" src="https://picsum.photos/seed/shoes/800/1200" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          
          {/* Viewfinder Grid */}
          <div className="absolute inset-x-8 inset-y-24 border border-white/10 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />
          </div>
        </div>

        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-full px-8">
          <div className="bg-black/60 backdrop-blur-md border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3 w-full max-w-sm">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <p className="font-headline text-[10px] tracking-widest text-white/60 uppercase">시스템 활성: 매일 인증 필요</p>
            <div className="ml-auto font-headline font-black text-tertiary">14:22:01</div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full z-30 pb-12 pt-20 px-8 flex flex-col items-center gap-8 bg-gradient-to-t from-black to-transparent">
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-headline text-4xl font-black italic tracking-tighter text-white uppercase">아침 조깅</h1>
            <p className="font-body text-secondary text-sm font-medium tracking-wide uppercase">스테이크: 팟 내 $250.00</p>
          </div>

          <div className="flex items-center justify-between w-full max-w-xs">
            <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-white/60">
              <LayoutGrid size={24} />
            </button>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-active:bg-primary/40 transition-all" />
              <button onClick={onSubmit} className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent group-active:scale-90 transition-transform">
                <div className="w-16 h-16 rounded-full bg-white group-hover:bg-primary transition-colors" />
              </button>
            </div>
            <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-white/60">
              <Camera size={24} />
            </button>
          </div>

          <button onClick={onSubmit} className="w-full max-w-md h-16 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-on-primary-fixed font-headline font-bold text-lg tracking-tight uppercase shadow-[0_0_24px_rgba(142,255,113,0.3)] active:scale-95 transition-all">
            인증 제출
          </button>
        </div>
      </main>
    </div>
  );
}

function RankingsScreen({ onStakeNext }: { onStakeNext: () => void }) {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <p className="font-headline text-secondary text-xs font-black tracking-[0.3em] mb-2 uppercase">42주차 결과</p>
        <h2 className="font-headline text-5xl font-black italic tracking-tighter leading-none mb-4 uppercase text-black dark:text-on-surface">팟이 회수되었습니다.</h2>
        <div className="inline-flex items-center gap-2 bg-neutral-50 dark:bg-surface-container-high px-6 py-2 rounded-full border border-outline-variant/20">
          <Zap className="text-secondary" size={16} fill="currentColor" />
          <span className="font-headline font-bold text-xl text-black dark:text-on-surface">$1,840.00 분배됨</span>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-8">
            <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse" />
            <div className="relative w-40 h-40 rounded-full border-[6px] border-primary overflow-hidden shadow-[0_0_40px_rgba(142,255,113,0.25)]">
              <img className="w-full h-full object-cover" referrerPolicy="no-referrer" src="https://picsum.photos/seed/winner/200/200" alt="Winner" />
            </div>
            <div className="absolute -bottom-2 right-2 bg-primary text-on-primary px-3 py-1 rounded-full font-headline font-black italic text-sm tracking-tighter shadow-lg">
              우승자
            </div>
          </div>
          <h3 className="font-headline text-4xl font-black tracking-tighter text-primary mb-1 uppercase text-glow-primary">ALEXA_STAKES</h3>
          <p className="font-headline text-on-surface-variant text-sm tracking-widest font-bold mb-6">100% 달성률</p>
          
          <div className="w-full glass-card border border-primary/30 rounded-xl p-8 text-center relative overflow-hidden shadow-xl shadow-primary/5">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            <p className="font-headline text-xs font-bold text-primary tracking-widest mb-2 uppercase">주간 보상</p>
            <div className="font-headline text-7xl font-black italic tracking-tighter text-black dark:text-on-surface mb-2">$842.50</div>
            <p className="text-neutral-500 dark:text-on-surface-variant text-sm">이번 주 14개의 습관을 모두 성공적으로 완료했습니다.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-50 dark:bg-surface-container-high p-6 rounded-xl relative overflow-hidden flex flex-col justify-between aspect-square border border-outline-variant/20">
          <Zap className="text-secondary" size={24} />
          <div>
            <p className="text-xs font-bold text-neutral-400 dark:text-on-surface-variant uppercase tracking-widest mb-1">그룹 평균</p>
            <h4 className="font-headline text-4xl font-black italic text-black dark:text-on-surface">84%</h4>
          </div>
        </div>
        <div className="bg-neutral-50 dark:bg-surface-container-high p-6 rounded-xl relative overflow-hidden flex flex-col justify-between aspect-square border border-outline-variant/20">
          <Zap className="text-error" size={24} />
          <div>
            <p className="text-xs font-bold text-neutral-400 dark:text-on-surface-variant uppercase tracking-widest mb-1">손실액</p>
            <h4 className="font-headline text-4xl font-black italic text-black dark:text-on-surface">$420</h4>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6 px-2">
          <h3 className="font-headline text-2xl font-black italic tracking-tight text-black dark:text-on-surface">순위</h3>
          <p className="text-xs font-bold text-neutral-400 dark:text-on-surface-variant tracking-widest uppercase">전체 보기</p>
        </div>
        <div className="space-y-4">
          {RANKINGS.map((rank) => (
            <div key={rank.name} className={`p-4 rounded-xl flex items-center gap-4 border ${rank.isUser ? 'bg-primary/5 border-primary/20' : 'bg-neutral-50 dark:bg-surface-container-low border-outline-variant/20'}`}>
              <div className={`w-8 font-headline font-black italic text-2xl ${rank.isUser ? 'text-primary' : 'text-neutral-400 dark:text-on-surface-variant'}`}>{rank.rank}</div>
              {rank.avatar ? (
                <img className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" src={rank.avatar} alt={rank.name} />
              ) : (
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-surface-container-highest border border-primary/40 flex items-center justify-center font-headline font-black text-primary">나</div>
              )}
              <div className="flex-grow">
                <p className={`font-headline font-bold text-lg leading-none ${rank.isUser ? 'text-primary' : 'text-black dark:text-on-surface'}`}>{rank.name}</p>
                <p className="text-[10px] text-neutral-400 dark:text-on-surface-variant tracking-[0.2em] font-bold uppercase">{rank.successRate}</p>
              </div>
              <div className="text-right">
                <p className={`font-headline font-bold ${rank.amount > 0 ? 'text-secondary' : 'text-error'}`}>
                  {rank.amount > 0 ? `+$${rank.amount.toFixed(2)}` : `-$${Math.abs(rank.amount).toFixed(2)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <button onClick={onStakeNext} className="w-full h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-black italic tracking-tight text-xl uppercase shadow-[0_8px_24px_rgba(39,174,0,0.3)] active:scale-95 transition-transform">
          다음 주 스테이크 참여
        </button>
        <p className="mt-4 text-neutral-400 dark:text-on-surface-variant text-xs font-bold tracking-widest uppercase">참여 마감까지 14:02:45</p>
      </section>
    </div>
  );
}
