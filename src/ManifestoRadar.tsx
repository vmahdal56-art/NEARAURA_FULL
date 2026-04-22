import React, { useState, useEffect } from 'react';

// TOTO JE JEN BRÁNA. POUŠTÍ DO HLAVNÍ APLIKACE (1500 lines).
interface ManifestoProps {
  onEnter: () => void; // Klíč k odemčení zbytku
}

const ManifestoRadar: React.FC<ManifestoProps> = ({ onEnter }) => {
  const [auraLevel, setAuraLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAuraLevel(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 102; 
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a', color: '#fff', textAlign: 'center', fontFamily: 'Courier New, monospace'}}>
      <header style={{marginBottom: '40px'}}>
        <div style={{fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px'}}>🦁 NEARAURA <span style={{fontSize: '10px', border: '1px solid #555', padding: '2px', marginLeft: '10px'}}>LTD. LONDON</span></div>
        <div style={{marginTop: '10px', fontSize: '12px', color: '#888'}}>DNA INTEGRITY: <span style={{color: '#00ff00', textShadow: '0 0 10px #00ff00'}}>{auraLevel}%</span></div>
      </header>

      <main>
        <div style={{fontSize: '80px', marginBottom: '20px'}}>🍎</div>
        
        <h1 style={{fontSize: '32px', margin: '20px 0', textTransform: 'uppercase', letterSpacing: '5px'}}>THE TRUTH WINS</h1>
        <p style={{opacity: 0.8, lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
          We do not fix you. We remove what destroys you.<br />
          The serpents are hiding in the noise. We are the silence.<br />
          <strong>Secured by Blood.</strong>
        </p>

        {/* TLAČÍTKO, KTERÉ ODEMKNE VAŠICH 1500 ŘÁDKŮ */}
        <button 
          onClick={onEnter}
          style={{background: '#ffcc00', color: '#000', padding: '15px 40px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px', fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase'}}
        >
          ENTER THE ORCHARD
        </button>
      </main>
      
      <footer style={{position: 'absolute', bottom: '20px', fontSize: '10px', color: '#444'}}>
        HOF MEMBER #001: VIKTOR MAHDAL
      </footer>
    </div>
  );
};

export default ManifestoRadar;