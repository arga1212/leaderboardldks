import React, { useState } from 'react';
import { Participant } from '../types';

interface AdminPointsProps {
  participants: Participant[];
  updateScore: (id: string, delta: number) => void;
}

export const AdminPoints: React.FC<AdminPointsProps> = ({ participants, updateScore }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParticipants = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Kelola Poin Peserta</h2>
          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Total Peserta: <strong>{participants.length}</strong>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="text" 
            className="block w-full p-4 pl-10 text-sm border rounded-lg bg-slate-50 border-slate-300 placeholder-slate-400 text-slate-900 focus:ring-primary focus:border-primary transition-colors" 
            placeholder="Cari nama peserta atau kelompok..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs uppercase bg-slate-100 text-slate-600 font-bold">
              <tr>
                <th scope="col" className="px-6 py-3">Nama</th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">Kelompok</th>
                <th scope="col" className="px-6 py-3 text-center">Poin</th>
                <th scope="col" className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 whitespace-nowrap">
                    {participant.name}
                    <div className="sm:hidden text-xs text-slate-500 font-normal mt-1">{participant.group}</div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-red-200">
                      {participant.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg font-black text-primary">{participant.score}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                       <button 
                        onClick={() => updateScore(participant.id, -5)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors text-xs font-bold shadow-sm"
                      >
                        -5
                      </button>
                      <button 
                        onClick={() => updateScore(participant.id, 5)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors text-xs font-bold shadow-sm"
                      >
                        +5
                      </button>
                      <button 
                        onClick={() => updateScore(participant.id, 10)}
                        className="px-4 py-1.5 bg-primary hover:bg-red-700 text-white border border-transparent rounded-lg transition-colors text-xs font-bold shadow-md shadow-red-200"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg">Tidak ditemukan data.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};