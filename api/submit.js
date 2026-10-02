export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed."
    });
  }

  try {
    const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!APPS_SCRIPT_URL) {
      return res.status(500).json({
        success: false,
        error: "Google Apps Script URL is not configured."
      });
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return res.status(500).json({
        success: false,
        error: "Invalid response from Google Apps Script."
      });
    }

    return res.status(response.ok ? 200 : 500).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
