exports.handler = async (event) => {
  const AUTH_PIN = "1234"; // Change this to your desired PIN
  
  // Check for existing authentication cookie
  const cookies = {};
  (event.headers.cookie || '').split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  
  if (cookies.siteAuth === AUTH_PIN) {
    // Already authenticated
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/"></head><body>Redirecting...</body></html>`
    };
  }

  // Check if this is a form submission with the PIN
  if (event.httpMethod === "POST")  {
    const params = new URLSearchParams(event.body);
    const submittedPin = params.get("pin");
    
    if (submittedPin === AUTH_PIN) {
      // Correct PIN, set cookie and redirect
      return {
        statusCode: 200,
        headers: {
          "Set-Cookie": `siteAuth=${AUTH_PIN}; Path=/; Secure; SameSite=Strict; Max-Age=3600`,
          "Content-Type": "text/html"
        },
        body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/"></head><body>Redirecting...</body></html>`
      };
    }
  }

  // Show login form
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login Required</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f7f7f7; }
            .login-container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1) ; width: 90%; max-width: 400px; text-align: center; }
            h1 { color: #333; margin-bottom: 1.5rem; }
            input { width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; box-sizing: border-box; }
            button { background-color: #ffcc00; color: #333; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-size: 1rem; cursor: pointer; width: 100%; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="login-container">
            <h1>MyNumba Don Win</h1>
            <form method="POST">
              <input type="password" name="pin" placeholder="Enter PIN" required autofocus>
              <button type="submit">Access Site</button>
            </form>
          </div>
        </body>
      </html>
    `
  };
};
