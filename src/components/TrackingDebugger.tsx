"use client";
import { useUserTracking } from "@/hooks/useUserTracking";
import { useEffect, useState } from "react";

export const TrackingDebugger = () => {
  const { trackingData } = useUserTracking();
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // Atalho para mostrar/ocultar (Alt + Shift + D)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'D') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* Botão flutuante para abrir o debug */}
      {!isVisible && showButton && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 right-4 z-[9998] bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
          title="Abrir Tracking Debug (Alt+Shift+D)"
        >
          🎯
        </button>
      )}

      {/* Painel de debug */}
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-[9999] max-w-md bg-white rounded-lg shadow-2xl p-4 border-2 border-primary">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-black">🎯 Tracking Debug</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
      
      <div className="text-xs space-y-2 max-h-96 overflow-y-auto">
        <div>
          <strong className="text-primary">UTM Source:</strong>{" "}
          <span className="text-black">{trackingData.utm_source}</span>
        </div>
        <div>
          <strong className="text-primary">UTM Medium:</strong>{" "}
          <span className="text-black">{trackingData.utm_medium}</span>
        </div>
        <div>
          <strong className="text-primary">UTM Campaign:</strong>{" "}
          <span className="text-black">{trackingData.utm_campaign}</span>
        </div>
        <div>
          <strong className="text-primary">UTM Content:</strong>{" "}
          <span className="text-black">{trackingData.utm_content}</span>
        </div>
        
        <div className="border-t pt-2 mt-2">
          <strong className="text-primary">Seções Visitadas:</strong>
          <ul className="ml-4 mt-1">
            {trackingData.visited_sections.map((section, idx) => (
              <li key={idx} className="text-black">• {section}</li>
            ))}
          </ul>
        </div>
        
        <div className="border-t pt-2 mt-2">
          <strong className="text-primary">Interações:</strong>
          <ul className="ml-4 mt-1">
            {trackingData.form_interactions.map((interaction, idx) => (
              <li key={idx} className="text-black">• {interaction}</li>
            ))}
          </ul>
        </div>
        
        {trackingData.first_interaction && (
          <div className="border-t pt-2 mt-2">
            <strong className="text-primary">Primeira Interação:</strong>{" "}
            <span className="text-black text-[10px]">
              {new Date(trackingData.first_interaction).toLocaleString()}
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-3 text-[10px] text-gray-500 border-t pt-2">
        Pressione Alt + Shift + D para mostrar/ocultar
      </div>
    </div>
      )}
    </>
  );
};
