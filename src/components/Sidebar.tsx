import React from 'react';

enum TabView {
  LEADERBOARD = 'LEADERBOARD',
  ADMIN_POINTS = 'ADMIN_POINTS',
  ADMIN_IMPORT = 'ADMIN_IMPORT',
  GUIDE = 'GUIDE'
}

interface SidebarProps {
  currentTab: TabView;
  setTab: (tab: TabView) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  resetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setTab,
  isMobileOpen,
  setIsMobileOpen,
  resetData
}) => {
  
  const navItems = [
    { id: TabView.LEADERBOARD, label: '🏆 Leaderboard', description: 'Klasemen Sementara' },
    { id: TabView.ADMIN_POINTS, label: 'Kelola Poin', description: 'Tambah/Kurang Poin' },
    { id: TabView.ADMIN_IMPORT, label: 'Import Data', description: 'Upload Peserta' },
    { id: TabView.GUIDE, label: 'Panduan', description: 'Cara Penggunaan' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-72 bg-white border-r border-slate-200 shadow-lg transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full px-4 py-5 overflow-y-auto relative">

          {/* Header */}
          <div className="flex items-start mb-8 border-b border-slate-100 pb-5">
            {/* Logo OSIS */}
            <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center mr-3 shadow-lg border border-slate-200 overflow-hidden">
              <img 
                src="/Logo Skomda.png" 
                alt="Logo OSIS SMK Telkom Sidoarjo" 
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Logo tidak ditemukan: /Logo Skomda.png');
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">
                LDKS
              </div>
              <div className="text-base font-extrabold text-slate-800 leading-tight">
                SMK Telkom Sidoarjo
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                2025
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`flex flex-col w-full text-left p-3 rounded-lg group transition-all duration-200
                    ${currentTab === item.id 
                      ? 'bg-red-50 text-red-700 border-l-4 border-red-600 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <span className="text-base font-bold">{item.label}</span>
                  <span className={`text-xs mt-1 ${currentTab === item.id ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                    {item.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Reset Button */}
          <div className="absolute bottom-24 left-0 w-full px-4">
            <button
              onClick={() => {
                if (confirm("Yakin ingin menghapus semua data peserta?")) resetData();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              🗑️ Reset Semua Data
            </button>
          </div>

          {/* Footer Box */}
          <div className="absolute bottom-4 left-0 w-full px-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-red-50 to-white border border-red-100 text-xs text-center shadow-sm">
              <div className="font-bold text-red-600 mb-1">Panitia LDKS</div>
              <div className="text-slate-500">SMK Telkom Sidoarjo</div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

// Demo Component
export default function App() {
  const [currentTab, setCurrentTab] = React.useState(TabView.LEADERBOARD);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        currentTab={currentTab}
        setTab={setCurrentTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        resetData={() => console.log('Reset data')}
      />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-10 bg-red-600 text-white p-3 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* Main Content */}
      <div className="lg:ml-72 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Tab: {currentTab}
          </h1>
          <p className="text-slate-600">
            Konten halaman {currentTab} akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  );
}