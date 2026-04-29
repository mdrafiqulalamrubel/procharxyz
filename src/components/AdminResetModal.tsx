import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function AdminResetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    setMessage(null);
    if (!currentPassword || !newPassword) return setMessage('Please fill all fields');
    if (newPassword !== confirmPassword) return setMessage('Passwords do not match');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const j = await res.json();
      if (!res.ok) setMessage(j?.error || 'Failed to update password');
      else {
        setMessage('Password updated');
        setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40" />

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <button onClick={onClose} className="absolute right-3 top-3 p-1 text-slate-500 hover:text-slate-700"><X /></button>
            <h3 className="text-lg font-semibold mb-3">Change Admin Password</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-700 mb-1">Current Password</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>

              {message && <div className="text-sm text-center text-slate-700">{message}</div>}

              <div className="flex justify-end gap-2 mt-2">
                <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
                <button onClick={submit} disabled={loading} className="px-4 py-2 bg-slate-800 text-white rounded">{loading ? 'Updating...' : 'Update Password'}</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
