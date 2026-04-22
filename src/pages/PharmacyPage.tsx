import React from 'react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

// STYLES (MAHDAL METAL CSS) - PŘESNĚ DLE DUMPU
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

const T: any = {
  EN: {
    h1: "AURATRIX PHARMACY",
    approved: "Approved by: Dr. Physics & Head of Gravity | Version: PROPER 1.0",
    col1: "Protocol (The Cure)",
    col2: "Active Ingredient (Tool)",
    col3: "Dosage",
    col4: "Side Effects (Benefits)",
    r1: ["THE COAL SHIFT", "Steel Shovel (Old School)", "3000 kg / 4 hours", "Absolute mental silence."],
    r2: ["SNOW HELL", "Aluminum Scoop", "50m Driveway + Entry", "Hatred evaporates. Deep sleep."],
    r3: ["LUMBERJACK ZEN", "Splitting Axe (Fiskars)", "2 cubic meters (Oak)", "Feeling of power. Calluses (Truth)."],
    r4: ["ASSEMBLY LINE", "Drill & Hammer", "Cabinet (2x3m)", "Respect. Tangible result."],
    warning: "⚠ WARNING FOR MATRIX USERS:",
    warnDesc: "This cure is addictive. Once you feel the calm of manual labor, your Venti Latte will taste like plastic. If you feel dizzy (sweating), do not stop. That is just the weakness leaving your body.",
    contra: "CONTRAINDICATIONS: Laziness, soft hands, dust allergy, TikTok addiction.",
    btn: "I WANT TO SWEAT (START)"
  },
  FR: {
    h1: "PHARMACIE AURATRIX",
    approved: "Approuvé par : Dr. Physique & Chef de Gravité | Version : PROPRE 1.0",
    col1: "Protocole (Le Remède)",
    col2: "Ingrédient Actif (Outil)",
    col3: "Dosage",
    col4: "Effets Secondaires (Bénéfices)",
    r1: ["POSTE AU CHARBON", "Pelle en Acier (Vieille École)", "3000 kg / 4 heures", "Silence mental absolu."],
    r2: ["ENFER DE NEIGE", "Pelle à Neige en Alu", "Allée de 50m + Entrée", "La haine s'évapore. Sommeil profond."],
    r3: ["ZEN DE BÛCHERON", "Hache à fendre (Fiskars)", "2 mètres cubes (Chêne)", "Sentiment de puissance. Callosités (Vérité)."],
    r4: ["CHAÎNE D'ASSEMBLAGE", "Perceuse & Marteau", "Armoire (2x3m)", "Respect. Résultat tangible."],
    warning: "⚠ AVERTISSEMENT POUR LES UTILISATEURS DE LA MATRICE :",
    warnDesc: "Ce remède crée une dépendance. Une fois que vous ressentez le calme du travail manuel, votre Venti Latte aura un goût de plastique. Si vous avez des vertiges (sueur), ne vous arrêtez pas. C'est juste la faiblesse qui quitte votre corps.",
    contra: "CONTRE-INDICATIONS : Paresse, mains douces, allergie à la poussière, addiction à TikTok.",
    btn: "JE VEUX TRANSPIRER (DÉMARRER)"
  },
  DE: {
    h1: "AURATRIX APOTHEKE",
    approved: "Genehmigt von: Dr. Physik & Schwerkraftchef | Version: PROPER 1.0",
    col1: "Protokoll (Die Heilung)",
    col2: "Wirkstoff (Werkzeug)",
    col3: "Dosierung",
    col4: "Nebenwirkungen (Vorteile)",
    r1: ["KOHLESCHICHT", "Stahlschaufel (Old School)", "3000 kg / 4 Stunden", "Absolute mentale Stille."],
    r2: ["SCHNEEHÖLLE", "Aluschaufel", "50m Einfahrt + Eingang", "Hass verdampft. Tiefschlaf."],
    r3: ["HOLZFÄLLER-ZEN", "Spaltaxt (Fiskars)", "2 Festmeter (Eiche)", "Gefühl der Kraft. Schwielen (Wahrheit)."],
    r4: ["MONTAGEBAND", "Bohrer & Hammer", "Schrank (2x3m)", "Respekt. Greifbares Ergebnis."],
    warning: "⚠ WARNUNG FÜR MATRIX-NUTZER:",
    warnDesc: "Diese Heilung macht süchtig. Sobald du die Ruhe der Handarbeit spürst, schmeckt dein Venti Latte wie Plastik. Wenn dir schwindelig wird (Schwitzen), hör nicht auf. Das ist die Schwäche, die deinen Körper verlässt.",
    contra: "GEGENANZEIGEN: Faulheit, weiche Hände, Stauballergie, TikTok-Sucht.",
    btn: "ICH WILL SCHWITZEN (START)"
  },
  CZ: {
    h1: "LÉKÁRNA AURATRIX",
    approved: "Schváleno: Dr. Fyzika & Vedoucí Gravitace | Verze: POCTIVÁ 1.0",
    col1: "Protokol (Léčba)",
    col2: "Účinná látka (Nástroj)",
    col3: "Dávkování",
    col4: "Vedlejší účinky (Benefity)",
    r1: ["UHELNÁ SMĚNA", "Ocelová lopata (Stará škola)", "3000 kg / 4 hodiny", "Absolutní mentální ticho."],
    r2: ["SNĚHOVÉ PEKLO", "Hliníkové hrablo", "50m příjezdovka + vchod", "Nenávist se odpaří. Hluboký spánek."],
    r3: ["DŘEVORUBEC ZEN", "Štípací sekera (Fiskars)", "2 kubíky (Dub)", "Pocit síly. Mozoly (Pravda)."],
    r4: ["MONTÁŽNÍ LINKA", "Vrtačka a kladivo", "Skříň (2x3m)", "Respekt. Hmatatelný výsledek."],
    warning: "⚠ VAROVÁNÍ PRO UŽIVATELE MATRIXU:",
    warnDesc: "Tato léčba je návyková. Jakmile ucítíte klid manuální práce, vaše Venti Latte bude chutnat jako plast. Pokud se vám točí hlava (pocení), nepřestávejte. To jen slabost opouští vaše tělo.",
    contra: "KONTRAINDIKACE: Lenost, měkké ruce, alergie na prach, závislost na TikToku.",
    btn: "CHCI SE ZPOTIT (START)"
  }
};

const PharmacyPage = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <div style={styles.container}>
      <LanguageToggle />
      <header style={styles.header}>
        <h1 style={styles.h1}>{txt.h1}</h1>
        <small>{txt.approved}</small>
      </header>

      <div style={{overflowX: 'auto'}}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{txt.col1}</th>
              <th style={styles.th}>{txt.col2}</th>
              <th style={styles.th}>{txt.col3}</th>
              <th style={styles.th}>{txt.col4}</th>
            </tr>
          </thead>
          <tbody>
            {[txt.r1, txt.r2, txt.r3, txt.r4].map((row, i) => (
              <tr key={i}>
                <td style={styles.td}><strong>{row[0]}</strong></td>
                <td style={styles.td}>{row[1]}</td>
                <td style={styles.td}>{row[2]}</td>
                <td style={styles.td}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.warningBox}>
        <strong style={{color: '#ff3333', display: 'block'}}>{txt.warning}</strong>
        {txt.warnDesc}
        <br/><br/>
        <em>{txt.contra}</em>
      </div>

      <div style={{textAlign: 'center'}}>
        <a href="https://www.google.com/maps/search/coal+warehouse/" target="_blank" rel="noreferrer" style={styles.btn}>
          {txt.btn}
        </a>
      </div>
    </div>
  );
};

export default PharmacyPage;