const API_TOKEN = "PkqtMxRpmNYCBUbVRtYxDUjxAOMKtBAXI";  

async function getStations() {
  const message = document.getElementById("message");
  const table = document.getElementById("table");
  const tbody = document.getElementById("tbody");

  if (!API_TOKEN || API_TOKEN === "TU_WKLEJ_SWÓJ_TOKEN_API") {
    message.textContent = "❗ Wprowadź swój klucz API w pliku script.js";
    table.hidden = true;
    return;
  }

  message.textContent = "Pobieranie danych...";
  table.hidden = true;
  tbody.innerHTML = "";

  try {
    const apiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/stations?limit=25";
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
    
    const res = await fetch(proxyUrl, {
      headers: { 'token': API_TOKEN }
    });

    if (!res.ok) throw new Error("Błąd HTTP: " + res.status);

    const data = await res.json();
    const stations = data.results || [];

    if (stations.length === 0) {
      message.textContent = "Brak danych o stacjach.";
      return;
    }

    stations.forEach(st => {
      const row = `<tr>
        <td>${st.id}</td>
        <td>${st.name || "-"}</td>
        <td>${st.latitude || "-"}</td>
        <td>${st.longitude || "-"}</td>
      </tr>`;
      tbody.innerHTML += row;
    });

    table.hidden = false;
    message.textContent = `Załadowano ${stations.length} stacji.`;
  } catch (err) {
    console.error(err);
    message.textContent = "Wystąpił błąd podczas pobierania danych.";
  }
}
