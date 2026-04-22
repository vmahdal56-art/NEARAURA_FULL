import React from 'react';

// STYLY (MAHDAL METAL CSS) - Můžeš to dát do externího souboru, ale pro přehled to držím u těla.
const styles = {
  container: {
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    fontFamily: "'Courier New', Courier, monospace",
    minHeight: '100vh',
    padding: '20px',
    border: '4px solid #7a7a7a',
  },
  header: {
    borderBottom: '2px dashed #7a7a7a',
    paddingBottom: '20px',
    marginBottom: '30px',
    textAlign: 'center' as const,
  },
  h1: {
    color: '#cd5c09', // RUST
    textTransform: 'uppercase' as const,
    fontSize: '2.5rem',
    fontWeight: 900,
    letterSpacing: '-2px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    border: '2px solid #e0e0e0',
    marginBottom: '30px',
  },
  th: {
    backgroundColor: '#000',
    color: '#cd5c09',
    padding: '15px',
    border: '1px solid #7a7a7a',
    textAlign: 'left' as const,
    textTransform: 'uppercase' as const,
  },
  td: {
    padding: '15px',
    border: '1px solid #7a7a7a',
  },
  warningBox: {
    border: '2px solid #ff3333',
    backgroundColor: '#300000',
    padding: '20px',
    marginTop: '20px',
  },
  btn: {
    backgroundColor: '#cd5c09',
    color: '#000',
    padding: '15px 40px',
    fontWeight: 900,
    textDecoration: 'none',
    border: '2px solid #000',
    boxShadow: '5px 5px 0px #000',
    display: 'inline-block',
    marginTop: '20px',
    cursor: 'pointer',
  }
};

const Pharmacy = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>AURATRIX PHARMACY</h1>
        <small>Schváleno: Dr. Fyzika & Primář Gravitace | Verze: PROPER 1.0</small>
      </header>

      <div style={{overflowX: 'auto'}}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Protokol (Lék)</th>
              <th style={styles.th}>Nástroj</th>
              <th style={styles.th}>Dávkování</th>
              <th style={styles.th}>Benefity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><strong>UHELNÁ ŠICHTA</strong></td>
              <td style={styles.td}>Lopata Ocelová</td>
              <td style={styles.td}>30 metráků / 4h</td>
              <td style={styles.td}>Ticho v hlavě.</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>SNĚHOVÉ PEKLO</strong></td>
              <td style={styles.td}>Hrablo Hliník</td>
              <td style={styles.td}>50m chodníku</td>
              <td style={styles.td}>Nenávist mizí.</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>DŘEVORUBECKÝ ZEN</strong></td>
              <td style={styles.td}>Sekera Kalač</td>
              <td style={styles.td}>2 kubíky dubu</td>
              <td style={styles.td}>Pocit moci.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.warningBox}>
        <strong style={{color: '#ff3333', display: 'block'}}>⚠ VAROVÁNÍ PRO UŽIVATELE MATRIXU:</strong>
        Tato léčba je návyková. Jakmile jednou ucítíte klid po fyzické práci, už vám Venti Latte nebude chutnat.
      </div>

      <div style={{textAlign: 'center'}}>
        <a href="https://mapy.cz/s/uhelnesklady" target="_blank" rel="noreferrer" style={styles.btn}>
          CHCI SE POTIT (START)
        </a>
      </div>
    </div>
  );
};

export default Pharmacy;