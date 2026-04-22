// fire.js
const URL = 'https://auraserviceingress-2lsbrc5j3q-uc.a.run.app';

async function fireTruth() {
    console.log("🚀 INJECTING TRUTH WITH MASTER KEY...");
    
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    secretKey: "PROPERGEEZERINNIT", // Musí sedět s klíčem ve funkci
                    provider: "FEDEX_LIFT_TERMINAL",
                    payload: {
                        event: "DELIVERY_CONFIRMED",
                        item: "AutoCAD Aluminum Rails",
                        dna_integrity: "100%"
                    }
                }
            })
        });

        const result = await response.json();
        console.log("🏛️ LEDGER RESPONSE:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ SIGNAL LOST:", error);
    }
}

fireTruth();