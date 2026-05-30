/* AFP visit beacon — notifie Sami (Telegram) quand un humain visite le site.
 * Léger, sans dépendance. État visiteur (nouveau/récurrent) stocké côté navigateur.
 * 1 envoi par visite (session), seulement après un signal d'engagement (filtre bots/prefetch).
 * Collecteur : https://aifusionpartner.com/api/track  (voir functions/api/track.ts) */
(function () {
  try {
    // Ne tourne qu'en production (pas localhost / *.pages.dev)
    if (!/(^|\.)aifusionpartner\.com$/.test(location.hostname)) return;
    // Écarte les navigateurs automatisés déclarés
    if (navigator.webdriver) return;

    var SESSION_KEY = "afp_beacon_sent";
    if (sessionStorage.getItem(SESSION_KEY)) return; // 1 seul ping par onglet/session

    var LS = window.localStorage;
    var now = Date.now();
    var count = (parseInt(LS.getItem("afp_visit_count") || "0", 10) || 0) + 1;
    var first = parseInt(LS.getItem("afp_first_seen") || "0", 10) || now;
    var prevLast = parseInt(LS.getItem("afp_last_seen") || "0", 10) || 0;

    LS.setItem("afp_visit_count", String(count));
    if (!LS.getItem("afp_first_seen")) LS.setItem("afp_first_seen", String(first));
    LS.setItem("afp_last_seen", String(now));
    sessionStorage.setItem(SESSION_KEY, "1");

    var site = location.hostname.split(".")[0] === "id" ? "id" : "fr";

    function fire() {
      var payload = {
        site: site,
        path: location.pathname + location.search,
        referrer: document.referrer || "",
        visitCount: count,
        firstSeen: first,
        lastSeen: prevLast || null,
        tz: (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return ""; } })(),
        lang: navigator.language || "",
        screen: (window.screen ? window.screen.width + "x" + window.screen.height : ""),
        webdriver: !!navigator.webdriver,
        ua: navigator.userAgent,
      };
      var url = "https://aifusionpartner.com/api/track";
      var body = JSON.stringify(payload);
      try {
        // text/plain = requête "simple" → pas de préflight CORS depuis id.aifusionpartner.com
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob([body], { type: "text/plain;charset=UTF-8" }));
        } else {
          fetch(url, { method: "POST", headers: { "Content-Type": "text/plain" }, body: body, keepalive: true, mode: "cors" });
        }
      } catch (e) { /* silencieux */ }
    }

    // N'envoie que si la page est réellement vue, après un court délai (≈ vrai humain)
    function arm() {
      if (document.visibilityState === "visible") {
        setTimeout(fire, 1800);
      } else {
        document.addEventListener("visibilitychange", function vc() {
          if (document.visibilityState === "visible") {
            document.removeEventListener("visibilitychange", vc);
            setTimeout(fire, 1800);
          }
        });
      }
    }

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", arm);
    } else {
      arm();
    }
  } catch (e) { /* ne jamais casser la page */ }
})();
