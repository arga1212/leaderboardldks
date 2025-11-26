import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminPoints } from './components/AdminPoints';
import { AdminImport } from './components/AdminImport';

import type { Participant } from './types';
import { TabView } from './types';


// Komponen Panduan
const GuideView = () => (
  <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8">
    <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Panduan Penggunaan</h2>
    <p className="text-slate-600">...</p>
  </div>
);

function App() {
  const [currentTab, setCurrentTab] = useState<TabView>(TabView.LEADERBOARD);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ====== FIX BAGIAN INI ======
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load LocalStorage sekali di awal
  useEffect(() => {
    const saved = localStorage.getItem('ldks-participants');
    if (saved) {
      try {
        setParticipants(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
    setHasLoaded(true); // tandai bahwa load selesai
  }, []);

  // Save ke LocalStorage hanya setelah load selesai
  useEffect(() => {
    if (!hasLoaded) return;   // cegah overwrite sebelum load
    localStorage.setItem('ldks-participants', JSON.stringify(participants));
  }, [participants, hasLoaded]);
  // ===========================================

  const handleImport = (newParticipants: Participant[]) => {
    setParticipants(prev => [...prev, ...newParticipants]);
    setCurrentTab(TabView.LEADERBOARD);
  };

  const updateScore = (id: string, delta: number) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, score: p.score + delta, lastUpdated: Date.now() }
          : p
      )
    );
  };

  const renderContent = () => {
    switch (currentTab) {
      case TabView.LEADERBOARD:
        return <LeaderboardView participants={participants} />;
      case TabView.ADMIN_POINTS:
        return <AdminPoints participants={participants} updateScore={updateScore} />;
      case TabView.ADMIN_IMPORT:
        return <AdminImport onImport={handleImport} />;
      case TabView.GUIDE:
        return <GuideView />;
      default:
        return <LeaderboardView participants={participants} />;
    }
  };

  const resetData = () => {
  if (confirm("Yakin ingin menghapus semua data peserta?")) {
    setParticipants([]);
    localStorage.removeItem('ldks-participants');
  }
};

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentTab={currentTab}
        setTab={setCurrentTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        resetData={resetData}
      />

      <div className="flex-1 lg:ml-64">
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
