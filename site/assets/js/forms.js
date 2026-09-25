/*
 * Form handling for the static English site.
 *
 * The forms keep the Contact Form 7 markup of data-wave.ru. Instead of the
 * WordPress plugin script, this file validates them in English and posts them
 * to the Contact Form 7 REST API of the Russian site, which accepts
 * cross-origin requests, so leads arrive in the same inbox.
 *
 * To send them somewhere else, set window.DW_FORMS_API before this script
 * loads. Set it to "" to open the visitor's email app instead.
 */
(function () {
  'use strict';

  var API_ROOT = typeof window.DW_FORMS_API === 'string' ? window.DW_FORMS_API : 'https://data-wave.ru/wp-json/';
  var FALLBACK_EMAIL = 'info@datawave.ru';
  var MESSAGES = {
    required: 'Please fill out this field.',
    email: 'Please enter a valid email address.',
    invalid: 'Please check this field.',
    validation: 'One or more fields have an error. Please check and try again.',
    sent: 'Thank you for your message. It has been sent.',
    failed: 'There was an error trying to send your message. Please try again later or write to ' + FALLBACK_EMAIL + '.',
    mailto: 'Your email app should open with the message. If it does not, write to ' + FALLBACK_EMAIL + '.'
  };

  function controls(form) {
    return Array.prototype.filter.call(form.querySelectorAll('input, select, textarea'), function (el) {
      return el.type !== 'hidden' && el.type !== 'submit' && el.name;
    });
  }

  function clearErrors(form) {
    Array.prototype.forEach.call(form.querySelectorAll('.wpcf7-not-valid-tip'), function (tip) { tip.remove(); });
    Array.prototype.forEach.call(form.querySelectorAll('.wpcf7-not-valid'), function (el) {
      el.classList.remove('wpcf7-not-valid');
      el.removeAttribute('aria-invalid');
    });
  }

  function markInvalid(el, message) {
    el.classList.add('wpcf7-not-valid');
    el.setAttribute('aria-invalid', 'true');
    var wrap = el.closest('.wpcf7-form-control-wrap') || el.parentNode;
    if (wrap.querySelector('.wpcf7-not-valid-tip')) return;
    var tip = document.createElement('span');
    tip.className = 'wpcf7-not-valid-tip';
    tip.setAttribute('aria-hidden', 'true');
    tip.textContent = message;
    wrap.appendChild(tip);
  }

  function isRequired(el) {
    return el.required || el.getAttribute('aria-required') === 'true' ||
      el.classList.contains('wpcf7-validates-as-required') ||
      (el.type === 'checkbox' && !!el.closest('.wpcf7-validates-as-required'));
  }

  function validate(form) {
    var ok = true;
    controls(form).forEach(function (el) {
      var value = el.type === 'checkbox' ? (el.checked ? 'on' : '') : String(el.value || '').trim();
      if (isRequired(el) && !value) { markInvalid(el, MESSAGES.required); ok = false; return; }
      if (value && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { markInvalid(el, MESSAGES.email); ok = false; }
    });
    return ok;
  }

  function setState(form, state, message) {
    form.classList.remove('init', 'submitting', 'sent', 'invalid', 'failed');
    form.classList.add(state);
    form.setAttribute('data-status', state);
    var output = form.querySelector('.wpcf7-response-output');
    if (output) {
      output.textContent = message || '';
      output.setAttribute('aria-hidden', message ? 'false' : 'true');
    }
  }

  function viaEmail(form) {
    var lines = controls(form).map(function (el) {
      var label = el.getAttribute('placeholder') || el.name;
      var value = el.type === 'checkbox' ? (el.checked ? 'yes' : 'no') : el.value;
      if (el.tagName === 'SELECT' && el.selectedIndex >= 0) value = el.options[el.selectedIndex].text;
      return label + ': ' + value;
    });
    var subject = 'Request from the English website';
    window.location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    setState(form, 'sent', MESSAGES.mailto);
  }

  function submit(form) {
    var wrapper = form.closest('.wpcf7');
    var id = wrapper && wrapper.getAttribute('data-wpcf7-id');
    if (!API_ROOT || !id) { viaEmail(form); return; }
    setState(form, 'submitting', '');
    fetch(API_ROOT + 'contact-form-7/v1/contact-forms/' + id + '/feedback', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.status === 'mail_sent') {
          form.reset();
          setState(form, 'sent', MESSAGES.sent);
          form.dispatchEvent(new CustomEvent('wpcf7mailsent', { bubbles: true, detail: data }));
        } else if (data.status === 'validation_failed') {
          (data.invalid_fields || []).forEach(function (field) {
            var el = form.querySelector('[name="' + field.field + '"], [name="' + field.field + '[]"]');
            if (el) markInvalid(el, MESSAGES.invalid);
          });
          setState(form, 'invalid', MESSAGES.validation);
        } else {
          setState(form, 'failed', MESSAGES.failed);
        }
      })
      .catch(function () { setState(form, 'failed', MESSAGES.failed); });
  }

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form.classList || !form.classList.contains('wpcf7-form')) return;
    event.preventDefault();
    clearErrors(form);
    if (!validate(form)) { setState(form, 'invalid', MESSAGES.validation); return; }
    submit(form);
  });
})();
