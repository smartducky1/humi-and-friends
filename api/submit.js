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

    let body = req.body;

    /*
      Vercel may give us the request body
      as either a string or an object.
    */
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: "Invalid submission data."
        });
      }
    }

    if (!body || typeof body !== "object") {
      return res.status(400).json({
        success: false,
        error: "Invalid submission data."
      });
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        quoteLink: String(body.quoteLink || "").trim(),
        tagLink: String(body.tagLink || "").trim(),
        wallet: String(body.wallet || "").trim()
      })
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Invalid response from Google Apps Script."
      });
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("Submission API error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Server error."
    });
  }
}
