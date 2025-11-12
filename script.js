const API_TOKEN = "PkqtMxRpmNYCBUbVRtYxDUjxAOMKtBAXI";  

async function getData() {
  const dataset = document.getElementById("dataset").value.trim();
  const location = document.getElementById("location").value.trim();
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
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

  const baseUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/data";
  const params = new URLSearchParams({
    datasetid: dataset,
    locationid: location,
    startdate: start,
    enddate: end,
    limit: 25
  });

  try {
    const res = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: { token: API_TOKEN }
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    const results = data.results || [];

    if (results.length === 0) {
      message.textContent = "Brak danych dla wybranych parametrów.";
      return;
    }

    results.forEach(item => {
      const row = `<tr>
        <td>${item.date}</td>
        <td>${item.station}</td>
        <td>${item.datatype}</td>
        <td>${item.value}</td>
      </tr>`;
      tbody.innerHTML += row;
    });

    table.hidden = false;
    message.textContent = `✅ Załadowano ${results.length} rekordów.`;
  } catch (err) {
    console.error(err);
    message.textContent = "❌ Błąd: " + err.message;
  }
}
