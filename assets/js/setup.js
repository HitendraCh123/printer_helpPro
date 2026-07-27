// ============================================================
// setup.js — Setup.jsx appointment form behavior (setup.html only)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("appointment-form");
  var formCard = document.getElementById("appointment-form-card");
  if (!form) return;
  // Only letters in name
  const nameInput = document.getElementById("name");

  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  // Only numbers in phone
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
  });

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Browser validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const userAgent = navigator.userAgent;

    let os = "Unknown";

    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
    else if (userAgent.includes("Linux")) os = "Linux";

    let browser = "Unknown";

    if (userAgent.includes("Edg")) browser = "Microsoft Edge";
    else if (userAgent.includes("Chrome")) browser = "Google Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";

    const device = /Mobi|Android|iPhone|iPad/i.test(userAgent)
      ? "Mobile"
      : "Desktop";

    const params = {
      customerName: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      printerModel: document.getElementById("model").value.trim(),
      issue: document.getElementById("issue").value.trim(),

      status: "New",
      website: window.location.hostname,

      os,
      browser,
      device
    };


    if (!window.emailjs) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      alert("Failed to send your request. Please try calling us directly.");
      return;
    }


    try {

      const response = await fetch("http://localhost:5000/api/tickets", {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(params)

      });

      if (!response.ok) {

        throw new Error("Ticket not created");

      }

    } catch (err) {

      console.log(err);

      alert("Unable to create support ticket.");

      submitBtn.disabled = false;

      submitBtn.innerHTML = originalBtnHtml;

      return;

    }

    emailjs
      .send("service_b50e08n", "template_hyuxh1l", params, "WHTEW8Ps9-2U_9fEV")
      .then(function () {
        var successHtml =
          '<div class="form-success">' +
          '<div class="success-icon">' +
          '<i data-lucide="check-circle-2" class="icon" width="48" height="48"></i>' +
          '</div>' +

          '<h2>Call for Immediate Assistance</h2>' +

          '<p>Your support request has been submitted successfully. For faster assistance, contact one of our printer support specialists now.</p>' +

          '<a href="tel:+18008885599" class="btn btn-primary">' +
          '<i data-lucide="phone" class="icon" width="15" height="15"></i> Call Now' +
          '</a>' +

          '</div>';
        formCard.innerHTML = successHtml;
        if (window.lucide) lucide.createIcons();

        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch(function (error) {
        console.error("Email Error:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        alert("Failed to send your request. Please try calling us directly.");
      });
  });
});
