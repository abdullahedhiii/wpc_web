/*
 * ukg-hr.com — send new sign-ups to the MadyHR.ai page.
 *
 *   Homepage "Get Started" / "Sign up"  ->  /transition.html
 *   Login page "Sign up" link           ->  /transition.html
 *
 * Existing customers must still be able to sign in and use the old
 * platform, so this script:
 *   - only runs on the homepage and the login page (never inside /hrms/…),
 *   - never touches sign-in, submit buttons or anything inside a form,
 *   - ignores links to other sites (YouTube, etc.).
 *
 * The transfer request form (/activate.html) is linked from the login page
 * and from /transition.html instead of hijacking Sign in.
 *
 * Opens in a new tab. Set NEW_TAB to false to replace the current page.
 */
(function () {
  'use strict';

  var SIGNUP_PAGE = '/transition.html';
  var NEW_TAB = true;

  // Checked on every click, not at load: the site is a single-page app, so
  // the path changes without this script reloading.
  var ACTIVE_ON = /^\/(index\.html|login\/?)?$/i;

  var SIGNUP_TEXT = /\b(get started|sign\s*up|signup|register|create (an )?account|start free|free trial)\b/i;
  var SIGNUP_HREF = /^\/(register|signup|sign-up)\b/i;

  function target(el) {
    // Sign In / Login buttons are submit buttons inside the login form: never touch.
    if (el.closest('form')) return null;
    if (el.matches('input[type="submit"], button[type="submit"]')) return null;

    var href = el.getAttribute('href') || '';
    if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return null;   // other sites, mailto:, tel:

    var label = (el.textContent || '') + ' ' + (el.getAttribute('aria-label') || '');
    if (SIGNUP_TEXT.test(label) || SIGNUP_HREF.test(href)) return SIGNUP_PAGE;
    return null;
  }

  document.addEventListener('click', function (e) {
    if (!ACTIVE_ON.test(window.location.pathname)) return;

    var el = e.target.closest('a, button, [role="button"]');
    if (!el) return;

    var page = target(el);
    if (!page) return;

    e.preventDefault();
    e.stopPropagation();

    if (!NEW_TAB) { window.location.href = page; return; }

    // No 'noopener' flag here: with it, window.open always returns null, which
    // made the old version also navigate the current tab away.
    var win = window.open(page, '_blank');
    if (win) win.opener = null;
    else window.location.href = page;        // pop-up blocked — go there in place
  }, true);
})();
