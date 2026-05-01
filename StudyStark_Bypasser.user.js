// ==UserScript==
// @name         StudyStark & VidyaRays Super Bypasser
// @version      7.2
// @description  Automated bypass for StudyStark tasks
// @author       Stark
// @match        *://studystark.com/verify-task*
// @match        *://stark.vidyarays.com/*
// @match        *://www.google.com/search*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function init() {
        if (document.getElementById('bp-status')) return;
        if (!document.body) return;

        const statusDiv = document.createElement('div');
        statusDiv.id = 'bp-status-container';
        statusDiv.style = "position: fixed; top: 15px; right: 15px; z-index: 10000; background: #000; color: #00ffcc; padding: 15px; border-radius: 12px; font-family: sans-serif; border: 2px solid #00ffcc; box-shadow: 0 0 20px rgba(0,255,204,0.4); pointer-events: none;";
        statusDiv.innerHTML = "<b>BYPASSER V7.2</b><br><span id='bp-status'>Initializing...</span>";
        document.body.appendChild(statusDiv);
    }

    function updateStatus(msg) {
        const el = document.getElementById('bp-status');
        if (el) el.innerText = msg;
    }

    setInterval(() => {
        const url = window.location.href;

        // --- SCOPE CHECK ---
        const isStudyStark = url.includes('studystark.com/verify-task');
        const isVidyarays = url.includes('stark.vidyarays.com');

        // Only run on Google if the search query is exactly "Stark Vidyarays"
        const isGoogleSearch = url.includes('google.com/search');
        const isStarkSearch = url.toLowerCase().includes('q=stark+vidyarays') || url.toLowerCase().includes('q=stark%20vidyarays');
        const isTargetGoogle = isGoogleSearch && isStarkSearch;

        // If not on a target page, do nothing and hide UI
        if (!isStudyStark && !isVidyarays && !isTargetGoogle) {
            const ui = document.getElementById('bp-status-container');
            if (ui) ui.remove();
            return;
        }

        // Ensure UI is injected on target pages
        if (document.body && !document.getElementById('bp-status-container')) {
            init();
        }

        // --- GOOGLE SEARCH AUTOMATION ---
        if (isTargetGoogle) {
            const results = document.querySelectorAll('a');
            for (let res of results) {
                if (res.href.includes('stark.vidyarays.com')) {
                    updateStatus("Found result on Google! Clicking...");
                    res.click();
                    break;
                }
            }
        }

        // --- StudyStark Pages ---
        if (isStudyStark) {
            const genBtn = document.querySelector('#genBtn');
            const goHomeBtn = document.querySelector('.btn-generate-big');

            if (genBtn && genBtn.offsetParent !== null) {
                updateStatus("Clicking Generate Access Key...");
                genBtn.click();
            } else if (goHomeBtn && goHomeBtn.innerText.includes("Go Home")) {
                updateStatus("Key Generated! Returning Home...");
                setTimeout(() => goHomeBtn.click(), 1000);
            }
        }

        // --- VidyaRays Verification ---
        if (isVidyarays) {
            const verifyBtn = document.querySelector('#verifyBtn');
            const proceedBtn = document.querySelector('#pleaseWait');
            const getLinkBtn = document.querySelector('#final-get-link');

            const allElements = document.querySelectorAll('span, button, a');
            let continueBtn = null;
            for (let el of allElements) {
                if (el.innerText.trim().toUpperCase() === "CONTINUE" && el.offsetParent !== null) {
                    continueBtn = el;
                    break;
                }
            }

            if (verifyBtn && verifyBtn.offsetParent !== null && !continueBtn && !proceedBtn && !getLinkBtn) {
                updateStatus("Timer Done! Clicking Verify...");
                verifyBtn.click();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }

            if (continueBtn) {
                updateStatus("Found CONTINUE. Clicking...");
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                setTimeout(() => continueBtn.click(), 500);
            }
            else if (proceedBtn && proceedBtn.innerText.trim().toUpperCase() === "PROCEED" && proceedBtn.offsetParent !== null) {
                updateStatus("Step Ready! Clicking PROCEED...");
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                setTimeout(() => proceedBtn.click(), 500);
            }
            else if (getLinkBtn || (Array.from(allElements).find(el => el.innerText.trim().toUpperCase() === "GET LINK" && el.offsetParent !== null))) {
                const target = getLinkBtn || Array.from(allElements).find(el => el.innerText.trim().toUpperCase() === "GET LINK");
                updateStatus("FINISHING! Clicking GET LINK...");
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                setTimeout(() => target.click(), 500);
            }
            else if (proceedBtn && proceedBtn.innerText.trim().toUpperCase() === "VERIFYING...") {
                updateStatus("Verifying... Please wait 8 seconds.");
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
            else {
                const timer = document.querySelector('#show_btn_time');
                if (timer) updateStatus("Waiting for Timer: " + timer.innerText);
            }
        }
    }, 1000);

})();
