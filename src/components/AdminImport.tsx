import React, { useState } from 'react';
import { Participant } from '../types';

interface AdminImportProps {
  onImport: (newParticipants: Participant[]) => void;
}

export const AdminImport: React.FC<AdminImportProps> = ({ onImport }) => {
  const [csvText, setCsvText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    setError(null);
    if (!csvText.trim()) {
      setError("Silakan tempel data CSV terlebih dahulu.");
      return;
    }

    try {
      const lines = csvText.trim().split('\n');
      const newParticipants: Participant[] = [];
      
      let startIndex = 0;
      
      if (lines[0].toLowerCase().includes('nama') || lines[0].toLowerCase().includes('name')) {
        startIndex = 1;
      }

      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.includes('\t') ? line.split('\t') : line.split(',');
        
        if (parts.length < 2) continue; 

        const name = parts[0].trim();
        const group = parts[1].trim();
        const score = parts[2] ? parseInt(parts[2].trim()) : 0; 

        if (name) {
          newParticipants.push({
            id: crypto.randomUUID(),
            name,
            group,
            score: isNaN(score) ? 0 : score,
            lastUpdated: Date.now()
          });
        }
      }

      if (newParticipants.length > 0) {
        onImport(newParticipants);
        setCsvText('');
        alert(`Berhasil mengimport ${newParticipants.length} peserta!`);
      } else {
        setError("Format data tidak dikenali. Pastikan format: Nama, Kelompok");
      }

    } catch (e) {
      setError("Terjadi kesalahan saat memproses data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-red-100 rounded-lg text-primary mr-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
             </svg>
          </div>
          <div>
             <h2 className="text-2xl font-bold text-slate-800">Import Data Peserta</h2>
             <p className="text-slate-500 text-sm">Masukkan data peserta dari Excel atau Spreadsheet.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-sm text-slate-600">
          <p className="font-bold mb-2">Cara Import:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Buka file Excel / Google Sheets data peserta.</li>
            <li>Pastikan kolom urutannya: <strong>Nama</strong> | <strong>Kelompok</strong>.</li>
            <li>Copy semua baris data (Ctrl+C).</li>
            <li>Paste (Ctrl+V) ke dalam kotak di bawah ini.</li>
          </ol>
        </div>

        <textarea
          className="w-full h-48 p-4 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all mb-4"
          placeholder={`Budi Santoso, Kelompok Garuda
Siti Aminah, Kelompok Harimau
Rizky Febian, Kelompok Elang`}
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
        />

        {error && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleProcess}
            className="px-8 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-200 transition-all transform hover:-translate-y-0.5"
          >
            Proses Import Data
          </button>
        </div>
      </div>
    </div>
  );
};