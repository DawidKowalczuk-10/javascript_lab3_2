const API_TOKEN = "PkqtMxRpmNYCBUbVRtYxDUjxAOMKtBAX";  


const NOAA_URL = "https://www.ncei.noaa.gov/cdo-web/api/v2/#datatypes";

async function getDataTypes() {
  const message = document.getElementById("message");
  const table = document.getElementById("table");
  const tbody = document.getElementById("tbody");

  if (!API_TOKEN || API_TOKEN === "TU_WKLEJ_SWÓJ_TOKEN_API") {
    message.textContent = "❗ Wprowadź swój klucz API w pliku script.js";
    table.hidden = true;
    return;
  }

  message.textContent = "⏳ Pobieranie danych...";
  table.hidden = true;
  tbody.innerHTML = "";

  try {
    const res = await fetch(NOAA_URL, {
      headers: { token: API_TOKEN }
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    const types = data.results || [];

    if (types.length === 0) {
      message.textContent = "Brak danych do wyświetlenia.";
      return;
    }

    types.forEach(t => {
      const row = `<tr>
        <td>${t.id}</td>
        <td>${t.name || "-"}</td>
        <td>${t.description || "-"}</td>
      </tr>`;
      tbody.innerHTML += row;
    });

    table.hidden = false;
    message.textContent = `✅ Załadowano ${types.length} rekordów.`;
  } catch (err) {
    console.error(err);
    message.textContent = "❌ Błąd: " + err.message;
  }
}
