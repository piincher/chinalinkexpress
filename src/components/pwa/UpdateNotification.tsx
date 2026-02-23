/**
 * Update Notification Component
 * 
 * Notifies users when a new version of the app is available
 * and provides a button to update.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import { usePWA } from './PWAProvider';

export function UpdateNotification() {
  const { isUpdateAvailable, updateApp } = usePWA();

  const handleUpdate = () => {
    updateApp();
  };

  const handleDismiss = () => {
    // User can dismiss, but the update will apply on next reload
    // We don't persist this dismissal as updates are important
  };

  return (
    <AnimatePresence>
      {isUpdateAvailable && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">
                  Update Available
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  A new version of ChinaLink Express is ready. Update now for the latest features.
                </p>
                
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 py-2 px-4 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="py-2 px-3 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
