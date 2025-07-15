export default {
  async fetch(request) {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get("api_key");
    const action = url.searchParams.get("action");
    const country = url.searchParams.get("country");
    const service = url.searchParams.get("service");
    const operator = url.searchParams.get("operator"); // ✅ tambahkan ini

    const proxyUrl = new URL("https://virtusim.com/api/v2/json.php");
    proxyUrl.searchParams.set("api_key", apiKey);
    proxyUrl.searchParams.set("action", action);
    if (country) proxyUrl.searchParams.set("country", country);
    if (service) proxyUrl.searchParams.set("service", service);
    if (operator) proxyUrl.searchParams.set("operator", operator); // ✅ dan ini

    const response = await fetch(proxyUrl.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://virtusim.com",
        "Origin": "https://virtusim.com"
      }
    });

    const result = await response.text();

    return new Response(result, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}