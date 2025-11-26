import React from 'react';

interface Participant {
  id: string;
  name: string;
  group: string;
  score: number;
}

interface LeaderboardViewProps {
  participants: Participant[];
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ participants }) => {
  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border-2 border-yellow-300 text-white shadow-2xl shadow-yellow-300/50";
      case 1: return "bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 text-slate-800 shadow-xl shadow-slate-300/50";
      case 2: return "bg-gradient-to-br from-orange-200 via-orange-300 to-amber-400 border-2 border-orange-300 text-orange-900 shadow-xl shadow-orange-300/50";
      default: return "bg-white border border-slate-200 text-slate-700 shadow-md hover:shadow-lg hover:border-red-300";
    }
  };

  const getMedal = (index: number) => {
    switch(index) {
      case 0: return <span className="text-3xl drop-shadow-lg animate-bounce">🥇</span>;
      case 1: return <span className="text-3xl drop-shadow-lg">🥈</span>;
      case 2: return <span className="text-3xl drop-shadow-lg">🥉</span>;
      default: return <span className="text-lg font-bold text-slate-500">#{index + 1}</span>;
    }
  };

  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400 p-8 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
        <div className="text-6xl mb-4 grayscale opacity-50">🇮🇩</div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Belum Ada Peserta</h2>
        <p>Import data peserta terlebih dahulu di menu "Import Data".</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scale-102:hover {
          transform: scale(1.02);
        }

        .card-enter {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="text-center mb-12 pt-8">
        <div className="inline-block animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 mb-3 tracking-tight animate-pulse">
            Klasemen LDKS
          </h1>
        </div>
        <p className="text-slate-600 font-medium text-lg animate-fade-in">hai</p>
      </div>

      <div className="grid gap-5 max-w-4xl mx-auto px-4">
        {sortedParticipants.map((participant, index) => (
          <div 
            key={participant.id}
            className={`
              card-enter relative flex items-center p-5 rounded-2xl border transition-all duration-500 
              scale-102 cursor-pointer group
              ${getRankStyle(index)}
              ${index < 3 ? 'mb-3 transform' : ''}
              ${index === 0 ? 'scale-105' : ''}
            `}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Sparkle effect for top 3 */}
            {index < 3 && (
              <div className="absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer pointer-events-none"></div>
            )}

            {/* Rank Badge */}
            <div className={`
              flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl mr-5 
              transition-transform duration-300 group-hover:scale-110
              ${index === 0 ? 'bg-white/30 backdrop-blur-sm' : 'bg-white shadow-inner'}
            `}>
              {getMedal(index)}
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0">
              <h3 className={`text-xl md:text-2xl font-bold truncate pr-2 transition-all duration-300 ${index === 0 ? 'text-white drop-shadow-lg' : 'text-slate-900 group-hover:text-red-600'}`}>
                {participant.name}
              </h3>
              <p className={`text-sm font-semibold mt-1 ${index === 0 ? 'text-yellow-100' : index === 1 ? 'text-slate-600' : index === 2 ? 'text-orange-800' : 'text-slate-500'}`}>
                Kelompok: {participant.group}
              </p>
            </div>

            {/* Score */}
            <div className="flex-shrink-0 text-right pl-6">
              <div className={`text-3xl md:text-4xl font-black transition-all duration-300 group-hover:scale-110 ${index === 0 ? 'text-white drop-shadow-lg' : 'text-red-600'}`}>
                {participant.score}
              </div>
              <div className={`text-xs uppercase font-bold tracking-widest mt-1 ${index === 0 ? 'text-yellow-200' : 'text-slate-500'}`}>
                Total Poin
              </div>
            </div>

            {/* Rank indicator for top 3 */}
            {index < 3 && (
              <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg
                ${index === 0 ? 'bg-white text-yellow-600' : index === 1 ? 'bg-slate-600 text-white' : 'bg-orange-600 text-white'}
              `}>
                #{index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Demo component
const demoParticipants: Participant[] = [
  { id: '1', name: 'Ahmad Fauzi', group: 'A', score: 950 },
  { id: '2', name: 'Siti Nurhaliza', group: 'B', score: 920 },
  { id: '3', name: 'Budi Santoso', group: 'C', score: 890 },
  { id: '4', name: 'Rina Permata', group: 'A', score: 850 },
  { id: '5', name: 'Andi Wijaya', group: 'D', score: 820 },
  { id: '6', name: 'Dewi Lestari', group: 'B', score: 800 },
  { id: '7', name: 'Reza Pratama', group: 'C', score: 780 },
  { id: '8', name: 'Maya Sari', group: 'D', score: 750 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-8">
      <LeaderboardView participants={demoParticipants} />
    </div>
  );
}