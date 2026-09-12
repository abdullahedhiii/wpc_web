/*
 * ukg-hr.com — route Sign up and Sign in to the MadyHR.ai pages.
 *
 *   Sign up  ->  /transition.html   (what MadyHR.ai is, features, pricing)
 *   Sign in  ->  /activate.html     (transfer request form)
 *
 * Both open in a new tab. If you'd rather they replace the current page,
 * set NEW_TAB to false below.
 */
(function () {
  'use strict';

  var SIGNUP_PAGE = '/transition.html';
  var SIGNIN_PAGE = '/activate.html';
  var NEW_TAB = true;

  // Don't intercept these — your own admin route, password resets, API calls.
  var SKIP = /(forgot|reset|admin|\/api\/)/i;

  var SIGNIN_TEXT = /\b(sign\s*in|signin|log\s*in|login|member (area|login)|customer login|my account)\b/i;
  var SIGNIN_HREF = /(signin|sign-in|login|log-in|\/auth|dashboard|portal)/i;

  var SIGNUP_TEXT = /\b(sign\s*up|signup|register|create (an )?account|get started|start free|free trial|subscribe|request a demo|book a demo)\b/i;
  var SIGNUP_HREF = /(signup|sign-up|register|registration|create-account|trial|demo)/i;

  function target(el) {
    var label = (el.textContent || '') + ' ' + (el.getAttribute('aria-label') || '') + ' ' + (el.value || '');
    var href = el.getAttribute('href') || '';

    if (SKIP.test(label) || SKIP.test(href)) return null;

    // Sign up is checked first: "Sign up" and "Sign in" are one character apart,
    // and a button labelled "Sign up free" should never land on the form.
    if (SIGNUP_TEXT.test(label) || SIGNUP_HREF.test(href)) return SIGNUP_PAGE;
    if (SIGNIN_TEXT.test(label) || SIGNIN_HREF.test(href)) return SIGNIN_PAGE;
    return null;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button, input[type="submit"], [role="button"]');
    if (!el) return;

    var page = target(el);
    if (!page) return;

    e.preventDefault();
    e.stopPropagation();

    if (!NEW_TAB) { window.location.href = page; return; }

    var win = window.open(page, '_blank', 'noopener');
    if (!win) window.location.href = page;   // pop-up blocked — go there in place
  }, true);
})();
