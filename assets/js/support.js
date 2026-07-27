// ============================================================
// support.js — Support Form
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("support-form");
  const formCard = document.getElementById("support-form-card");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const customerName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const printerModel = document.getElementById("model").value.trim();
    const issue = document.getElementById("message").value.trim();

    const payload = {
      customerName,
      email,
      phone,
      printerModel,
      issue,
      website: window.location.hostname,
      status: "New",

      os: navigator.platform,
      browser: getBrowser(),
      device: getDevice()
    };

    try {
      const response = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request.");
      }

      const firstName = customerName.split(" ")[0];

      formCard.innerHTML = `
        <div class="form-success">
          <div class="success-icon">
            <i data-lucide="check-circle-2" width="52" height="52"></i>
          </div>

          <h2>Support Request Submitted!</h2>

          <p>
            Thank you <strong>${escapeHtml(firstName)}</strong>.
            Your support request has been received successfully.
          </p>

          <p>
            One of our printer experts will contact you shortly at
            <strong>${escapeHtml(email)}</strong>.
          </p>

          <a href="tel:+18008885599" class="btn btn-primary">
            <i data-lucide="phone" width="16" height="16"></i>
            Call for Immediate Assistance
          </a>
        </div>
      `;

      if (window.lucide) {
        lucide.createIcons();
      }

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  });

  function getDevice() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
      ? "Mobile"
      : "Desktop";
  }

  function getBrowser() {
    const ua = navigator.userAgent;

    if (ua.includes("Edg")) return "Microsoft Edge";
    if (ua.includes("Chrome")) return "Google Chrome";
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";

    return "Unknown";
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
});