(function () {
  const clock = document.getElementById("clock");
  const today = document.getElementById("today");
  const tip = document.getElementById("tip");

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

  updateTime();
  rotateTip();

  window.setInterval(updateTime, 1000);
  window.setInterval(rotateTip, 8000);
})();
