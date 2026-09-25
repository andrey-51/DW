(function () {
  "use strict";

  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  var subToggles = document.querySelectorAll(".sub-toggle");

  function closeSubmenus(except) {
    subToggles.forEach(function (toggle) {
      if (toggle !== except) toggle.setAttribute("aria-expanded", "false");
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });

    // Close the mobile menu after following an in-page link (e.g. solutions/#retail).
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && nav.classList.contains("is-open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  subToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      closeSubmenus(toggle);
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".has-sub")) closeSubmenus(null);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeSubmenus(null);
    if (menuToggle && nav && nav.classList.contains("is-open")) {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      menuToggle.focus();
    }
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Demo request forms. If data-endpoint is set, the form is POSTed there as
  // FormData; otherwise the visitor's email client opens a prefilled message.
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");

    function setStatus(message, kind) {
      if (!status) return;
      status.textContent = message;
      status.className = "form-status" + (kind ? " is-" + kind : "");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var endpoint = form.getAttribute("data-endpoint");

      if (endpoint) {
        setStatus("Sending...", "");
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (response) {
            if (!response.ok) throw new Error(response.statusText);
            form.reset();
            setStatus("Thank you! Our team will contact you shortly.", "success");
          })
          .catch(function () {
            setStatus("Something went wrong. Please email us at info@datawave.ru.", "error");
          });
        return;
      }

      var lines = [
        "Name: " + (data.get("name") || ""),
        "Company: " + (data.get("company") || ""),
        "Email: " + (data.get("email") || ""),
        "Phone: " + (data.get("phone") || ""),
        "",
        String(data.get("message") || "")
      ];
      var subject = "Demo request: " + (data.get("company") || data.get("name") || "Data Wave");
      window.location.href =
        "mailto:info@datawave.ru?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      setStatus("Your email app should open with the request. If it does not, write to info@datawave.ru.", "success");
    });
  });
})();
