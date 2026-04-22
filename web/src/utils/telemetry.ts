export const AuraLogger = {
  log: (event: string, level: string, detail: string) => {
    const logEntry = `[${new Date().toISOString()}] ${event} | ${level} | ${detail}`;
    console.log("🛡️ AURA TELEMETRY:", logEntry);
    
    // Ring buffer - držíme jen posledních 50 záznamů v lokálu
    try {
      const existing = JSON.parse(localStorage.getItem('AURA_RING_BUFFER') || '[]');
      existing.push(logEntry);
      if (existing.length > 50) existing.shift();
      localStorage.setItem('AURA_RING_BUFFER', JSON.stringify(existing));
    } catch (e) {}
  }
};