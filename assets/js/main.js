(function () {
  const clock = document.getElementById("clock");
  const today = document.getElementById("today");
  const tip = document.getElementById("tip");
  const presentationToggle = document.getElementById("presentation-toggle");
  const PRESENTATION_KEY = "lock-screen-presentation-mode";

  const tips = [
    "An unlocked session can expose email, cloud consoles, and password vaults in under a minute.",
    "Most office incidents are convenience attacks: no malware, just an unattended keyboard.",
    "Locking when you stand up is the fastest way to prevent impersonation and data leaks.",
    "Physical access usually bypasses many software defenses, but not a locked screen.",
    "Shortcut memory beats policy memory: train the key combo until it is automatic."
  ];

  function updateTime() {
    const now = new Date();

    clock.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(now);

    today.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(now);
  }

  function rotateTip() {
    if (!tip) {
      return;
    }

    const current = tip.textContent;
    const available = tips.filter(function (entry) {
      return entry !== current;
    });

    tip.textContent = available[Math.floor(Math.random() * available.length)];
  }

  function applyPresentationMode(enabled) {
    document.body.classList.toggle("presentation-mode", enabled);

    if (presentationToggle) {
      presentationToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      presentationToggle.textContent = enabled ? "Presentation Mode: On" : "Presentation Mode";
    }

    window.localStorage.setItem(PRESENTATION_KEY, enabled ? "1" : "0");
  }

  function togglePresentationMode() {
    const isEnabled = document.body.classList.contains("presentation-mode");
    applyPresentationMode(!isEnabled);
  }

  updateTime();
  rotateTip();

  const savedPreference = window.localStorage.getItem(PRESENTATION_KEY);
  const presentationEnabled = savedPreference === null ? true : savedPreference === "1";
  applyPresentationMode(presentationEnabled);

  if (presentationToggle) {
    presentationToggle.addEventListener("click", togglePresentationMode);
  }

  window.addEventListener("keydown", function (event) {
    if (event.repeat) {
      return;
    }

    if (event.key === "p" || event.key === "P") {
      togglePresentationMode();
    }
  });

  window.setInterval(updateTime, 1000);
  window.setInterval(rotateTip, 8000);
})();
