exports.handler = async (event) => {
  // Replace this with your desired PIN
  const AUTH_PIN = "6750"; 
  
  // Check for existing authentication cookie
  const cookies = parseCookies(event.headers.cookie || '');
  if (cookies.bridgetunesAuth === AUTH_PIN) {
    // Already authenticated
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: getRedirectHtml(),
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
          "Set-Cookie": `bridgetunesAuth=${AUTH_PIN}; Path=/; Secure; SameSite=Strict; Max-Age=3600`,
          "Content-Type": "text/html",
        },
        body: getRedirectHtml(),
      };
    }
  }

  // Show login form
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: getLoginHtml(event.queryStringParameters?.error === "true"),
  };
};

function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  return cookies;
}

function getLoginHtml(showError) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>MyNumba Don Win - Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .login-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 90%;
            max-width: 400px;
            text-align: center;
          }
          h1 {
            color: #333;
            margin-bottom: 1.5rem;
          }
          input {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
          }
          button {
            background-color: #ffcc00;
            color: #333;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
          }
          .error {
            color: #e53935;
            margin-bottom: 1rem;
            font-size: 0.875rem;
          }
          .logo {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            font-weight: bold;
          }
          .highlight {
            color: #ffcc00;
          }
        </style>
      </head>
      <body>
        <div class="login-container">
          <div class="logo">Bridge<span class="highlight">tunes</span></div>
          <h1>MyNumba Don Win</h1>
          ${showError ? '<p class="error">Incorrect PIN. Please try again.</p>' : ''}
          <form method="POST">
            <input type="password" name="pin" placeholder="Enter PIN" required autofocus>
            <button type="submit">Access Site</button>
          </form>
        </div>
      </body>
    </html>
  `;
}

function getRedirectHtml() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=/">
        <title>Redirecting...</title>
      </head>
      <body>
        Redirecting to the site...
      </body>
    </html>
  `;
}
