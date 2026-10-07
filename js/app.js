/**
 * IDLIStack Tech De-jargoniser
 * Core Application Engine - Annual Summit 2026 Edition
 */

// ========================================================================
// 📊 BACKEND CONFIGURATION: GOOGLE SHEET LEADERBOARD
// ========================================================================
// Paste your Google Apps Script Web App URL here to silently collect scores:
// e.g. "https://script.google.com/macros/s/AKfycb.../exec"
const GOOGLE_SHEET_BACKEND_URL = "https://script.google.com/a/macros/tech4goodcommunity.com/s/AKfycbzxTY2YPEkdBkp4xmZRDfXzGQIlUKwrMLCim_IZuj919C9E1DURR3BGM8fuXh9ziz7M/exec";

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const sourceInput = document.getElementById('source-input');
  const btnClearInput = document.getElementById('btn-clear-input');
  const charCounter = document.getElementById('char-counter');
  const translationText = document.getElementById('translation-text');
  const impactCard = document.getElementById('impact-card');
  const impactText = document.getElementById('impact-text');
  const phrasesChipsContainer = document.getElementById('phrases-chips');

  // Controls & Action Buttons
  const btnSwap = document.getElementById('btn-swap-direction');
  const sourceLangText = document.getElementById('source-lang-text');
  const targetLangText = document.getElementById('target-lang-text');
  const sourceLangPill = document.getElementById('source-lang-pill');
  const targetLangPill = document.getElementById('target-lang-pill');
  const sourceLangDropdown = document.getElementById('source-lang-dropdown');
  const targetLangDropdown = document.getElementById('target-lang-dropdown');

  const btnMic = document.getElementById('btn-mic');
  const btnSamples = document.getElementById('btn-samples');
  const btnSurprise = document.getElementById('btn-surprise');
  const btnSpeak = document.getElementById('btn-speak');
  const btnCopy = document.getElementById('btn-copy');
  const btnCheckCaption = document.getElementById('btn-check-caption');
  
  // Modals & Topbar
  const btnQuiz = document.getElementById('btn-quiz');
  const btnQr = document.getElementById('btn-qr');
  const btnKiosk = document.getElementById('btn-kiosk');
  const captionModal = document.getElementById('caption-modal');
  const modalClose = document.getElementById('modal-close');
  const quizModal = document.getElementById('quiz-modal');
  const quizClose = document.getElementById('quiz-close');
  const qrModal = document.getElementById('qr-modal');
  const qrClose = document.getElementById('qr-close');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // State
  let isReverseMode = false; // false: Tech -> Plain, true: Plain -> Tech
  let currentTargetMode = "non-tech"; // "non-tech", "eli5", "funder", "tech-spec"
  let currentSourceMode = "tech"; // "tech", "dev-slack", "consultant"
  let currentActiveId = "api";
  let isRecording = false;
  let recognition = null;
  let isCurrentTermRecognized = true;
  let activeQuizQuestions = [];
  let currentQuizIndex = 0;
  let quizScore = 0;
  const QUIZ_ROUND_SIZE = 5; // Always exactly 5 questions per quiz session
  let currentCategoryFilter = "all";
  let currentSearchQuery = "";

  // --- Initialize Widely Used Phrases Chips with Filtering & Search ---
  function renderChips() {
    phrasesChipsContainer.innerHTML = '';

    // Update count badges
    const totalCount = JARGON_DATABASE.length;
    const appsCount = JARGON_DATABASE.filter(x => x.category === "Open Source Apps").length;
    const countAllEl = document.getElementById('cat-count-all');
    const countAppsEl = document.getElementById('cat-count-apps');
    if (countAllEl) countAllEl.textContent = totalCount;
    if (countAppsEl) countAppsEl.textContent = appsCount;

    const filtered = JARGON_DATABASE.filter(item => {
      let matchCat = (currentCategoryFilter === 'all');
      if (!matchCat) {
        if (currentCategoryFilter === 'Infrastructure & Hosting') {
          matchCat = item.category === 'Infrastructure & Hosting' || item.category === 'Automation & Workflows';
        } else if (currentCategoryFilter === 'Software Philosophy') {
          matchCat = item.category === 'Software Philosophy' || item.category === 'Websites & Tools';
        } else if (currentCategoryFilter === 'Connectivity & Data') {
          matchCat = item.category === 'Connectivity & Data';
        } else {
          matchCat = item.category === currentCategoryFilter;
        }
      }

      const q = currentSearchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.term.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        item.plainExplanation.toLowerCase().includes(q) ||
        item.techPhrase.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      phrasesChipsContainer.innerHTML = `<span style="font-size:0.85rem; color:#94A3B8; padding:8px 0;">No matching terms found. Try another search or filter!</span>`;
      return;
    }

    filtered.forEach(item => {
      const chip = document.createElement('button');
      const isApp = item.category === "Open Source Apps";
      chip.className = `phrase-chip ${item.id === currentActiveId ? 'active' : ''} ${isApp ? 'is-app' : ''}`;
      chip.textContent = item.term;
      chip.dataset.id = item.id;
      chip.title = `${item.term} (${item.category})`;
      chip.addEventListener('click', () => {
        selectJargon(item.id);
      });
      phrasesChipsContainer.appendChild(chip);
    });
  }

  // --- Select & Display a Specific Jargon Term ---
  function selectJargon(id) {
    const item = JARGON_DATABASE.find(x => x.id === id);
    if (!item) return;

    currentActiveId = id;
    
    // Update active chip state
    document.querySelectorAll('.phrase-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.id === id);
    });

    if (isReverseMode) {
      sourceInput.value = item.reversePhrase || `How do we handle ${item.term.toLowerCase()} for our project?`;
    } else {
      sourceInput.value = item.techPhrase;
    }

    updateInputState();
    runTranslation();
  }

  // --- Translation Core Engine ---
  const COMMON_STOP_WORDS = new Set([
    "the", "and", "for", "with", "that", "this", "from", "have", "what", "which",
    "some", "just", "about", "your", "their", "will", "would", "there", "then",
    "more", "when", "into", "also", "very", "much", "such", "than", "other",
    "how", "can", "does", "where", "should", "could"
  ]);

  function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function highlightActiveChip(id) {
    document.querySelectorAll('.phrase-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.id === id);
    });
  }

  // Intelligent matching: exact, substring, tokens, and typo-tolerant fuzzy matching
  function findBestJargonMatch(input) {
    const clean = input.trim().toLowerCase();
    if (!clean) return { type: "empty" };

    // 1. Direct Term or ID match
    let direct = JARGON_DATABASE.find(item => {
      const termLower = item.term.toLowerCase();
      const idClean = item.id.replace(/-/g, " ");
      return clean === termLower || clean === idClean || clean === item.id;
    });
    if (direct) return { type: "exact", item: direct };

    // 2. Substring match (whole word boundaries for short terms like "API", "RAG", "FMS")
    let subMatch = JARGON_DATABASE.find(item => {
      const termLower = item.term.toLowerCase();
      const idClean = item.id.replace(/-/g, " ");
      if (termLower.length <= 4) {
        const regex = new RegExp("\\b" + termLower + "\\b", "i");
        return regex.test(clean) || clean === idClean;
      }
      return clean.includes(termLower) || clean.includes(idClean) || item.techPhrase.toLowerCase().includes(clean);
    });
    if (subMatch) return { type: "exact", item: subMatch };

    // 3. Token word match for multi-word queries like "kobo survey tool"
    const inputWords = clean.split(/[\s/()\-,\.]+/).filter(w => w.length >= 3 && !COMMON_STOP_WORDS.has(w));
    for (const item of JARGON_DATABASE) {
      const termWords = item.term.toLowerCase().split(/[\s/()\-]+/).filter(w => w.length >= 3);
      for (const iw of inputWords) {
        if (termWords.includes(iw)) {
          return { type: "exact", item };
        }
      }
    }

    // 4. Reverse phrase match
    let reverseMatch = JARGON_DATABASE.find(item => {
      if (!item.reversePhrase) return false;
      const words = item.reversePhrase.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !COMMON_STOP_WORDS.has(w));
      const matchCount = words.filter(w => clean.includes(w)).length;
      return matchCount >= 2;
    });
    if (reverseMatch) return { type: "exact", item: reverseMatch };

    // 5. High-confidence Fuzzy Typo Match (e.g., "ghosr" -> "Ghost", "dockr" -> "Docker")
    let bestFuzzy = null;
    let highestSim = 0;
    const candidateWords = inputWords.length > 0 ? inputWords : [clean];

    for (const item of JARGON_DATABASE) {
      const targets = [
        item.id.toLowerCase().replace(/-/g, ""),
        ...item.term.toLowerCase().split(/[\s/()\-]+/).filter(w => w.length >= 3)
      ];

      for (const uWord of candidateWords) {
        if (uWord.length < 3 || COMMON_STOP_WORDS.has(uWord)) continue;

        for (const target of targets) {
          if (Math.abs(uWord.length - target.length) > 2) continue;
          const dist = levenshteinDistance(uWord, target);
          const maxLen = Math.max(uWord.length, target.length);
          const sim = 1 - (dist / maxLen);

          // Require >= 74% similarity and <= 2 edits
          if (dist <= 2 && sim >= 0.74 && sim > highestSim) {
            highestSim = sim;
            bestFuzzy = { item, userWord: uWord, target, dist, sim };
          }
        }
      }
    }

    if (bestFuzzy) {
      return { type: "fuzzy", item: bestFuzzy.item, userWord: bestFuzzy.userWord, target: bestFuzzy.target };
    }

    return { type: "none" };
  }

  function runTranslation() {
    const text = sourceInput.value.trim();
    if (!text) {
      isCurrentTermRecognized = false;
      highlightActiveChip(null);
      renderEmptyState();
      return;
    }

    if (isReverseMode) {
      // Reverse mode: Plain English -> Tech Spec
      translatePlainToTech(text);
    } else {
      // Standard mode: Tech Jargon -> Non-Tech Plain English
      translateTechToPlain(text);
    }
  }

  function translateTechToPlain(text) {
    const matchResult = findBestJargonMatch(text);

    if (matchResult.type === 'empty') {
      isCurrentTermRecognized = false;
      highlightActiveChip(null);
      renderEmptyState();
      return;
    }

    if (matchResult.type === 'none') {
      isCurrentTermRecognized = false;
      highlightActiveChip(null);
      renderNotFoundState(text);
      return;
    }

    isCurrentTermRecognized = true;
    const matchedItem = matchResult.item;
    currentActiveId = matchedItem.id;
    highlightActiveChip(matchedItem.id);

    const isFuzzy = matchResult.type === 'fuzzy';
    const fuzzyNoticeHtml = isFuzzy ? `
      <div class="fuzzy-match-banner">
        <span>💡</span>
        <span>Showing results for <strong>${escapeHtml(matchedItem.term)}</strong> (closest match to <em>"${escapeHtml(matchResult.userWord || text)}"</em>)</span>
      </div>
    ` : '';

    if (currentTargetMode === 'eli5') {
      renderTranslation({
        fuzzyNotice: fuzzyNoticeHtml,
        leadAnalogy: `👶 In simple words: ${matchedItem.simpleAnalogy}`,
        secondaryDesc: `Think of it like this: ${matchedItem.plainExplanation.split('. ')[0]}. That way you don't have to worry about complicated computer things!`,
        impact: `Saves time and avoids mistakes for your team.`
      });
    } else if (currentTargetMode === 'funder') {
      renderTranslation({
        fuzzyNotice: fuzzyNoticeHtml,
        leadAnalogy: `📊 Executive & Funder Summary: ${matchedItem.term} (${matchedItem.category}) is core digital infrastructure that mitigates operational risk and scales program impact.`,
        secondaryDesc: `Strategic Value: Eliminates manual administrative overhead, guarantees institutional reliability, and ensures compliance with donor data governance standards.`,
        impact: matchedItem.impactContext
      });
    } else if (currentTargetMode === 'tech-spec') {
      renderTranslation({
        fuzzyNotice: fuzzyNoticeHtml,
        leadAnalogy: `🛠️ Developer Specification: ${matchedItem.reverseTechSpec}`,
        secondaryDesc: `Pattern: ${matchedItem.term} in ${matchedItem.category}. On IDLIStack, deploy via standardized containerized stack with automated monitoring.`,
        impact: `Self-hosted on IDLIStack without recurring SaaS subscription costs.`
      });
    } else {
      renderTranslation({
        fuzzyNotice: fuzzyNoticeHtml,
        leadAnalogy: matchedItem.plainExplanation.trim(),
        secondaryDesc: matchedItem.simpleAnalogy ? `In simpler terms: ${matchedItem.simpleAnalogy}` : '',
        impact: matchedItem.impactContext,
        analogySummary: matchedItem.simpleAnalogy
      });
    }
  }

  function translatePlainToTech(text) {
    const matchResult = findBestJargonMatch(text);

    if (matchResult.type === 'empty') {
      isCurrentTermRecognized = false;
      highlightActiveChip(null);
      renderEmptyState();
      return;
    }

    if (matchResult.type === 'none') {
      isCurrentTermRecognized = false;
      highlightActiveChip(null);
      renderNotFoundReverseState(text);
      return;
    }

    isCurrentTermRecognized = true;
    const matchedItem = matchResult.item;
    currentActiveId = matchedItem.id;
    highlightActiveChip(matchedItem.id);

    renderTranslation({
      leadAnalogy: `Tech Specification: ${matchedItem.reverseTechSpec}`,
      secondaryDesc: `Corresponding Infrastructure Term: ${matchedItem.term} (${matchedItem.category}). When speaking to engineers or vendors, ask them: "${matchedItem.techPhrase}"`,
      impact: `This allows your engineering partners to implement: ${matchedItem.simpleAnalogy}`,
      analogySummary: `Recommended standard: ${matchedItem.term}`
    });
  }

  function renderTranslation({ fuzzyNotice = '', leadAnalogy, secondaryDesc, impact }) {
    translationText.innerHTML = `
      ${fuzzyNotice}
      <p class="lead-analogy">${escapeHtml(leadAnalogy)}</p>
      ${secondaryDesc ? `<p class="secondary-desc">${escapeHtml(secondaryDesc)}</p>` : ''}
    `;

    if (impact) {
      impactCard.classList.remove('hidden');
      impactText.textContent = impact;
    } else {
      impactCard.classList.add('hidden');
    }
  }

  function renderNotFoundState(rawText) {
    const safeText = escapeHtml(rawText);
    const sampleTerms = ['Ghost', 'API', 'Listmonk', 'Docker', 'KoboToolbox', 'Webhook'];
    const sampleChipsHtml = sampleTerms.map(term => {
      const item = JARGON_DATABASE.find(x => x.term.toLowerCase().startsWith(term.toLowerCase()));
      const id = item ? item.id : 'api';
      return `<button type="button" class="notfound-suggestion-chip" data-id="${id}">${term}</button>`;
    }).join(' ');

    translationText.innerHTML = `
      <div class="notfound-container">
        <div class="notfound-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Jargon Not Recognized</span>
        </div>
        <p class="notfound-title">No match found for "<strong>${safeText}</strong>"</p>
        <p class="secondary-desc">
          We couldn't find a matching tech jargon or open-source tool in our summit database. Try searching for standard tech terms or click one of these popular summit terms to de-jargon it:
        </p>
        <div class="notfound-suggestions">
          ${sampleChipsHtml}
        </div>
      </div>
    `;

    impactCard.classList.remove('hidden');
    impactText.textContent = `💡 Summit Booth Tip: Have a specific buzzword from your vendor proposals or grant applications? Ask an IDLIStack engineer at the booth to de-jargon it for you!`;

    translationText.querySelectorAll('.notfound-suggestion-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        selectJargon(id);
      });
    });
  }

  function renderNotFoundReverseState(rawText) {
    const safeText = escapeHtml(rawText);
    const samplePhrases = [
      { text: "Send bulk WhatsApp broadcasts", id: "whatomate" },
      { text: "Collect surveys in remote offline villages", id: "kobotoolbox" },
      { text: "Send newsletters without subscriber limits", id: "listmonk" },
      { text: "Host secure private team chat", id: "mattermost" }
    ];

    const chipsHtml = samplePhrases.map(p => 
      `<button type="button" class="notfound-suggestion-chip" data-id="${p.id}">${escapeHtml(p.text)}</button>`
    ).join(' ');

    translationText.innerHTML = `
      <div class="notfound-container">
        <div class="notfound-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Need Not Recognized</span>
        </div>
        <p class="notfound-title">Could not map "${safeText}" to a tech spec</p>
        <p class="secondary-desc">
          Try describing a common NGO workflow in everyday language, or tap one of these impact examples:
        </p>
        <div class="notfound-suggestions">
          ${chipsHtml}
        </div>
      </div>
    `;

    impactCard.classList.remove('hidden');
    impactText.textContent = `💡 Summit Booth Tip: Describe your non-profit challenge to an IDLIStack engineer at the booth, and we'll architect the open-source solution together!`;

    translationText.querySelectorAll('.notfound-suggestion-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        selectJargon(id);
      });
    });
  }

  function renderEmptyState() {
    translationText.innerHTML = `
      <p class="secondary-desc" style="color: #9CA3AF; font-style: italic;">
        Type or paste any tech phrase on the left, or click a phrase below to see the translation!
      </p>
    `;
    impactCard.classList.add('hidden');
  }

  // --- Input State & Counter ---
  function updateInputState() {
    const len = sourceInput.value.length;
    charCounter.textContent = `${len} character${len === 1 ? '' : 's'}`;
    btnClearInput.classList.toggle('hidden', len === 0);
  }

  sourceInput.addEventListener('input', () => {
    updateInputState();
    runTranslation();
  });

  btnClearInput.addEventListener('click', () => {
    sourceInput.value = '';
    updateInputState();
    runTranslation();
    sourceInput.focus();
  });

  // --- Swap Direction (Tech ⇆ Non-Tech) ---
  btnSwap.addEventListener('click', () => {
    isReverseMode = !isReverseMode;
    btnSwap.style.transform = isReverseMode ? 'rotate(180deg)' : 'rotate(0deg)';

    if (isReverseMode) {
      sourceLangText.textContent = 'Non-Tech English';
      targetLangText.textContent = 'Tech English';
      sourceInput.placeholder = "Describe what you want to achieve in plain words (e.g. 'How do we email donors automatically?')...";
      sourceInput.value = "How do we automatically email donor receipts every Monday morning?";
    } else {
      sourceLangText.textContent = 'Tech English';
      targetLangText.textContent = 'Non-Tech English';
      sourceInput.placeholder = "Paste or type any tech jargon (e.g., 'Just use the API to pull the donor list.')...";
      sourceInput.value = "“Just use the API to pull the donor list.”";
    }

    updateInputState();
    runTranslation();
    showToast(`Swapped to: ${isReverseMode ? 'Non-Tech ➔ Tech' : 'Tech ➔ Plain English'}`);
  });

  // --- Random / Surprise Me / Bingo ---
  btnSurprise.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * SUMMIT_BINGO_QUOTES.length);
    const quote = SUMMIT_BINGO_QUOTES[randomIndex];
    sourceInput.value = quote;
    updateInputState();
    runTranslation();
    showToast("Loaded random summit buzzword!");
  });

  btnSamples.addEventListener('click', () => {
    btnSurprise.click();
  });

  // --- Speech-to-Text (Microphone) ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isRecording = true;
      btnMic.classList.add('recording');
      showToast("Listening... speak now!");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sourceInput.value = `“${transcript}”`;
      updateInputState();
      runTranslation();
    };

    recognition.onerror = () => {
      isRecording = false;
      btnMic.classList.remove('recording');
      showToast("Microphone error or permission denied.");
    };

    recognition.onend = () => {
      isRecording = false;
      btnMic.classList.remove('recording');
    };

    btnMic.addEventListener('click', () => {
      if (isRecording) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch {
          recognition.stop();
        }
      }
    });
  } else {
    btnMic.addEventListener('click', () => {
      showToast("Voice input is not supported on this browser.");
    });
  }

  // --- Text-to-Speech (Read Aloud) ---
  btnSpeak.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      showToast("Speech synthesis is not supported on this device.");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      btnSpeak.classList.remove('speaking');
      return;
    }

    const textToRead = translationText.innerText.trim();
    if (!textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    btnSpeak.classList.add('speaking');
    utterance.onend = () => btnSpeak.classList.remove('speaking');
    utterance.onerror = () => btnSpeak.classList.remove('speaking');

    window.speechSynthesis.speak(utterance);
    showToast("Reading aloud...");
  });

  // --- Copy to Clipboard ---
  btnCopy.addEventListener('click', () => {
    const textToCopy = translationText.innerText.trim();
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("Translation copied to clipboard!");
    }).catch(() => {
      showToast("Failed to copy text.");
    });
  });

  // --- "Check Caption" Modal & Share Card ---
  btnCheckCaption.addEventListener('click', () => {
    if (!isCurrentTermRecognized) {
      showToast("⚠️ Please enter or select a recognized tech term to generate your card!");
      return;
    }
    const quote = sourceInput.value.trim() || "“Just use the API to pull the donor list.”";
    const leadP = translationText.querySelector('.lead-analogy');
    const analogy = (leadP ? leadP.innerText : translationText.innerText).trim();

    document.getElementById('modal-quote-text').textContent = quote;
    document.getElementById('modal-analogy-text').textContent = analogy;

    captionModal.classList.remove('hidden');
  });

  modalClose.addEventListener('click', () => {
    captionModal.classList.add('hidden');
  });

  document.getElementById('btn-copy-card-text').addEventListener('click', () => {
    const quote = document.getElementById('modal-quote-text').innerText;
    const analogy = document.getElementById('modal-analogy-text').innerText;
    const shareText = `Tech Jargon: ${quote}\nDe-jargonised: ${analogy}\n\nDe-jargonised at IDLIStack Annual Summit • https://idlistack.com`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      showToast("Card text copied for sharing!");
    });
  });

  document.getElementById('btn-download-card').addEventListener('click', () => {
    // Generate downloadable PNG using HTML Canvas
    generateCardImage();
  });

  function generateCardImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(1, '#FFF2F8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative Pink Border
    ctx.strokeStyle = '#ED4690';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 1160, 590);

    // Branding Title
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillText('iDLisTACk by T4GC', 60, 95);

    ctx.fillStyle = '#ED4690';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('ANNUAL SUMMIT 2026 • TECH DE-JARGONISER', 60, 140);

    // Jargon Box
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    roundRect(ctx, 60, 180, 1080, 140, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('TECH JARGON:', 90, 220);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic 28px Inter, sans-serif';
    const quote = document.getElementById('modal-quote-text').innerText;
    wrapText(ctx, quote, 90, 265, 1020, 36);

    // De-jargonised Box
    ctx.fillStyle = '#FFF5F9';
    ctx.strokeStyle = 'rgba(237, 70, 144, 0.3)';
    roundRect(ctx, 60, 345, 1080, 185, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ED4690';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('DE-JARGONISED FOR IMPACT TEAMS:', 90, 385);

    ctx.fillStyle = '#1E293B';
    ctx.font = '500 24px Inter, sans-serif';
    const analogy = document.getElementById('modal-analogy-text').innerText;
    wrapText(ctx, analogy, 90, 425, 1020, 32);

    // Footer
    ctx.fillStyle = '#64748B';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText('Open-source hosting made effortless • www.idlistack.com', 60, 575);

    // Download PNG
    const link = document.createElement('a');
    link.download = `idlistack-dejargon-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast("Downloaded branded card image!");
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  // --- Enhanced Open Source Quiz & Scorecard System ---
  const quizOngoingView = document.getElementById('quiz-ongoing-view');
  const quizScorecardView = document.getElementById('quiz-scorecard-view');
  const quizTag = document.getElementById('quiz-tag');
  const quizProgress = document.getElementById('quiz-progress');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const scorecardNameInput = document.getElementById('scorecard-name-input');
  const scDisplayName = document.getElementById('sc-display-name');
  const scScoreNum = document.getElementById('sc-score-num');
  const scRankTitle = document.getElementById('sc-rank-title');
  const scRankDesc = document.getElementById('sc-rank-desc');
  const scAccuracyVal = document.getElementById('sc-accuracy-val');
  const btnRetakeQuiz = document.getElementById('btn-retake-quiz');
  const btnCopyScoreShare = document.getElementById('btn-copy-score-share');
  const btnDownloadScorecard = document.getElementById('btn-download-scorecard');

  // Fisher-Yates array shuffling algorithm
  function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Automatically serve exactly 5 questions from the 36-question bank,
  // randomized in different orders with shuffled options behind the scenes
  function startNewQuizSession() {
    if (typeof SUMMIT_QUIZ_QUESTIONS === 'undefined' || !SUMMIT_QUIZ_QUESTIONS.length) return;

    // 1. Automatically shuffle full question pool behind the scenes
    const pool = shuffleArray(SUMMIT_QUIZ_QUESTIONS);

    // 2. Automatically pick exactly 5 questions
    const chosenQuestions = pool.slice(0, QUIZ_ROUND_SIZE);

    // 3. For each question, automatically shuffle the 4 options and map correct answer
    activeQuizQuestions = chosenQuestions.map(q => {
      const correctText = q.options[q.answerIndex ?? 0];
      const shuffledOptions = shuffleArray(q.options);
      const newAnswerIndex = shuffledOptions.indexOf(correctText);

      return {
        id: q.id,
        tag: q.tag,
        question: q.question,
        options: shuffledOptions,
        answerIndex: newAnswerIndex,
        explanation: q.explanation
      };
    });

    currentQuizIndex = 0;
    quizScore = 0;

    if (quizOngoingView) quizOngoingView.classList.remove('hidden');
    if (quizScorecardView) quizScorecardView.classList.add('hidden');

    renderQuizQuestion();
  }

  btnQuiz.addEventListener('click', () => {
    startNewQuizSession();
    quizModal.classList.remove('hidden');
  });

  quizClose.addEventListener('click', () => {
    quizModal.classList.add('hidden');
  });

  function renderQuizQuestion() {
    if (!activeQuizQuestions.length || currentQuizIndex >= activeQuizQuestions.length) return;
    const q = activeQuizQuestions[currentQuizIndex];
    if (!q) return;

    if (quizTag) quizTag.textContent = q.tag || "🚀 Open Source Apps";
    if (quizProgress) {
      quizProgress.textContent = `Question ${currentQuizIndex + 1} of ${activeQuizQuestions.length} • Score: ${quizScore}`;
    }
    if (quizProgressFill) {
      const pct = Math.round(((currentQuizIndex + 1) / activeQuizQuestions.length) * 100);
      quizProgressFill.style.width = `${pct}%`;
    }

    document.getElementById('quiz-question-text').textContent = q.question;
    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';
    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.classList.add('hidden');
    const btnNext = document.getElementById('btn-next-quiz');
    btnNext.disabled = true;
    btnNext.textContent = (currentQuizIndex === activeQuizQuestions.length - 1) ? 'View Official Scorecard 🏆' : 'Next Question';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        handleQuizAnswer(idx, q.answerIndex, q.explanation);
      });
      optContainer.appendChild(btn);
    });
  }

  function handleQuizAnswer(selectedIdx, correctIdx, explanation) {
    const buttons = document.querySelectorAll('.quiz-opt-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIdx) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    if (selectedIdx === correctIdx) {
      quizScore++;
      showToast("🎉 Correct! Great open-source mastery!");
    } else {
      showToast("💡 Keep exploring! Open-source empowers.");
    }

    if (quizProgress) {
      quizProgress.textContent = `Question ${currentQuizIndex + 1} of ${activeQuizQuestions.length} • Score: ${quizScore}`;
    }

    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.innerHTML = `<strong>${selectedIdx === correctIdx ? '🎉 Correct!' : '💡 Insight:'}</strong> ${explanation}`;
    feedbackBox.classList.remove('hidden');

    const btnNext = document.getElementById('btn-next-quiz');
    btnNext.disabled = false;
  }

  document.getElementById('btn-next-quiz').addEventListener('click', () => {
    currentQuizIndex++;
    if (currentQuizIndex < activeQuizQuestions.length) {
      renderQuizQuestion();
    } else {
      showQuizScorecard();
    }
  });

  function showQuizScorecard() {
    if (quizOngoingView) quizOngoingView.classList.add('hidden');
    if (quizScorecardView) quizScorecardView.classList.remove('hidden');

    const total = activeQuizQuestions.length || 1;
    const pct = Math.round((quizScore / total) * 100);

    if (scScoreNum) scScoreNum.textContent = `${quizScore} / ${total}`;
    if (scAccuracyVal) scAccuracyVal.textContent = `${pct}%`;

    let rankTitle = "💡 De-jargon Apprentice";
    let rankDesc = "Great start! Visit the IDLIStack booth to explore sovereign open-source hosting.";

    if (quizScore === total) {
      rankTitle = "🏆 Chief Open Source Hero";
      rankDesc = "Flawless! Master of self-hosted tech4good, data sovereignty & open-source infrastructure!";
    } else if (quizScore >= Math.ceil(total * 0.8)) {
      rankTitle = "🌟 Tech4Good Champion";
      rankDesc = "Outstanding! You see through vendor hype, avoid lock-in, and build for true social impact.";
    } else if (quizScore >= Math.ceil(total * 0.5)) {
      rankTitle = "🚀 Open Source Explorer";
      rankDesc = "Well on your way to breaking vendor lock-in and scaling your NGO with open tools!";
    }

    if (scRankTitle) scRankTitle.textContent = rankTitle;
    if (scRankDesc) scRankDesc.textContent = rankDesc;

    let debounceTimer = null;
    const sendScorePayload = () => {
      const attendeeName = (scorecardNameInput && scorecardNameInput.value.trim()) || "Social Impact Leader";
      syncScoreToGoogleSheet({
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        name: attendeeName,
        contact: "-",
        score: `${quizScore}/${total}`,
        total: total,
        accuracy: pct,
        rank: rankTitle,
        level: "Open Source Tech De-jargoniser",
        device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop/Kiosk",
        userAgent: navigator.userAgent || ""
      });
    };

    if (scorecardNameInput) {
      if (scDisplayName) {
        scDisplayName.textContent = scorecardNameInput.value.trim() || "Social Impact Leader";
      }
      scorecardNameInput.oninput = (e) => {
        if (scDisplayName) {
          scDisplayName.textContent = e.target.value.trim() || "Social Impact Leader";
        }
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          sendScorePayload();
        }, 800);
      };
      scorecardNameInput.onchange = sendScorePayload;
    }

    // Auto-sync immediately when scorecard is generated
    sendScorePayload();

    showToast("🎉 Scorecard generated! Download or share your certificate.");
  }

  // --- Backend Google Sheet Leaderboard Sync (Silent Background Engine) ---
  const STORAGE_KEY_SHEET_URL = 'idlistack_google_sheet_url';
  const STORAGE_KEY_OFFLINE_SCORES = 'idlistack_offline_scores';

  function getGoogleSheetUrl() {
    // Check URL query parameter (e.g. ?sheet=https://script.google.com/...)
    try {
      const urlParam = new URLSearchParams(window.location.search).get('sheet');
      if (urlParam) {
        localStorage.setItem(STORAGE_KEY_SHEET_URL, urlParam.trim());
      }
    } catch (_) {}

    return (GOOGLE_SHEET_BACKEND_URL && GOOGLE_SHEET_BACKEND_URL.trim()) ||
           localStorage.getItem(STORAGE_KEY_SHEET_URL) || '';
  }

  // Silently post scorecard data to Google Sheet backend with ZERO frontend notices
  async function syncScoreToGoogleSheet(payload) {
    const url = getGoogleSheetUrl();
    if (!url) return;

    try {
      // Cross-origin request to Google Apps Script without CORS blockage
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      console.log('Leaderboard backend: score successfully synced.', payload);
    } catch (err) {
      console.warn('Leaderboard backend: network failure, saving locally for later sync', err);
      queueScoreOffline(payload);
    }
  }

  function queueScoreOffline(payload) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_OFFLINE_SCORES) || '[]');
      existing.push(payload);
      localStorage.setItem(STORAGE_KEY_OFFLINE_SCORES, JSON.stringify(existing));
    } catch (e) {
      console.error('Failed to queue offline score', e);
    }
  }

  async function flushOfflineScores() {
    const url = getGoogleSheetUrl();
    if (!url || !navigator.onLine) return;
    try {
      const queued = JSON.parse(localStorage.getItem(STORAGE_KEY_OFFLINE_SCORES) || '[]');
      if (!queued.length) return;
      for (const item of queued) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(item)
        });
      }
      localStorage.removeItem(STORAGE_KEY_OFFLINE_SCORES);
      console.log(`Leaderboard backend: flushed ${queued.length} offline scores.`);
    } catch (e) {
      console.warn('Could not flush offline queue', e);
    }
  }

  window.addEventListener('online', flushOfflineScores);

  if (btnRetakeQuiz) {
    btnRetakeQuiz.addEventListener('click', () => {
      startNewQuizSession();
      showToast("🔄 Fresh 5-question round loaded with new questions & options!");
    });
  }

  if (btnCopyScoreShare) {
    btnCopyScoreShare.addEventListener('click', () => {
      const name = scorecardNameInput ? scorecardNameInput.value.trim() : "Social Impact Leader";
      const total = activeQuizQuestions.length || 1;
      const shareText = `🏆 I scored ${quizScore}/${total} on the Open Source De-jargon Challenge at the IDLIStack Annual Summit 2026!\n\n` +
        `Empowering non-profits with self-hosted, sovereign open-source tools. Check it out at https://idlistack.com\n\n` +
        `#TechDejargon #IDLIStack #Tech4Good #OpenSource #AnnualSummit`;
      
      navigator.clipboard.writeText(shareText).then(() => {
        showToast("Scorecard share text copied to clipboard!");
      });
    });
  }

  if (btnDownloadScorecard) {
    btnDownloadScorecard.addEventListener('click', () => {
      generateScorecardCanvasImage();
    });
  }

  function generateScorecardCanvasImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');
    const total = activeQuizQuestions.length || 1;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 675);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.5, '#FFF2F8');
    grad.addColorStop(1, '#FDF2F8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 675);

    // Decorative Pink Outer & Inner Borders
    ctx.strokeStyle = '#ED4690';
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, 1160, 635);

    ctx.strokeStyle = 'rgba(237, 70, 144, 0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 1128, 603);

    // Header: Logo & Summit Tag
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 38px Inter, sans-serif';
    ctx.fillText('iDLisTACk by T4GC', 60, 95);

    ctx.fillStyle = '#ED4690';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText('ANNUAL SUMMIT 2026 • OFFICIAL CERTIFICATION', 60, 135);

    // Certificate Title
    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('OPEN SOURCE TECH DE-JARGONISER SCORECARD', 60, 190);

    // Attendee Name
    const attendeeName = (scorecardNameInput && scorecardNameInput.value.trim()) || "Social Impact Leader";
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillText(attendeeName, 60, 245);

    // Score & Rank Box
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = 'rgba(237, 70, 144, 0.3)';
    ctx.lineWidth = 2;
    roundRect(ctx, 60, 280, 1080, 175, 18);
    ctx.fill();
    ctx.stroke();

    // Score Circle
    ctx.fillStyle = '#ED4690';
    ctx.beginPath();
    ctx.arc(150, 367, 58, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${quizScore}/${total}`, 150, 368);
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText('SCORE', 150, 395);

    // Rank & Details
    ctx.textAlign = 'left';
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 30px Inter, sans-serif';
    let rankText = (quizScore === total)
      ? '🏆 Chief Open Source Hero'
      : (quizScore >= Math.ceil(total * 0.8) ? '🌟 Tech4Good Champion' : (quizScore >= Math.ceil(total * 0.5) ? '🚀 Open Source Explorer' : '💡 De-jargon Apprentice'));
    ctx.fillText(rankText, 240, 345);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 20px Inter, sans-serif';
    ctx.fillText('Championing self-hosted open-source tools, data sovereignty & affordable tech.', 240, 385);
    ctx.fillText('Verified proficiency in open-source tools, digital sovereignty & impact tech.', 240, 420);

    // 3 Metrics badges
    const pct = Math.round((quizScore / total) * 100);
    drawMetricBadge(ctx, 60, 480, 340, 75, `${pct}% ACCURACY`, 'Quiz Performance');
    drawMetricBadge(ctx, 430, 480, 340, 75, 'DATA SOVEREIGNTY', 'Self-Hosted Standard');
    drawMetricBadge(ctx, 800, 480, 340, 75, 'ZERO VENDOR LOCK-IN', 'Community Owned');

    // Footer
    ctx.fillStyle = '#64748B';
    ctx.font = '600 18px Inter, sans-serif';
    ctx.fillText('Verified at IDLIStack Annual Summit • Open-source hosting made effortless • www.idlistack.com', 60, 615);

    // Download PNG
    const link = document.createElement('a');
    const safeName = attendeeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `idlistack-scorecard-${safeName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast("Downloaded official scorecard image!");
  }

  function drawMetricBadge(ctx, x, y, w, h, val, lbl) {
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, w, h, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ED4690';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText(val, x + 20, y + 36);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 14px Inter, sans-serif';
    ctx.fillText(lbl, x + 20, y + 58);
  }

  // --- Mobile QR Code Modal ---
  btnQr.addEventListener('click', () => {
    renderQrCode();
    qrModal.classList.remove('hidden');
  });

  qrClose.addEventListener('click', () => {
    qrModal.classList.add('hidden');
  });

  function renderQrCode() {
    const currentUrl = window.location.href;
    const qrLink = document.getElementById('qr-live-url');
    if (qrLink) {
      qrLink.textContent = currentUrl;
      qrLink.href = currentUrl;
    }

    const container = document.getElementById('qr-code-container');
    container.innerHTML = '';

    if (typeof QRCode !== 'undefined') {
      try {
        new QRCode(container, {
          text: currentUrl,
          width: 200,
          height: 200,
          colorDark: "#111827",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
      } catch (err) {
        console.error("QRCode generation error:", err);
        renderFallbackQr(container);
      }
    } else {
      renderFallbackQr(container);
    }
  }

  function renderFallbackQr(container) {
    container.innerHTML = `
      <svg width="200" height="200" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="180" height="180" fill="white"/>
        <rect x="15" y="15" width="45" height="45" rx="6" stroke="#111827" stroke-width="8"/>
        <rect x="27" y="27" width="21" height="21" rx="3" fill="#ED4690"/>
        <rect x="120" y="15" width="45" height="45" rx="6" stroke="#111827" stroke-width="8"/>
        <rect x="132" y="27" width="21" height="21" rx="3" fill="#ED4690"/>
        <rect x="15" y="120" width="45" height="45" rx="6" stroke="#111827" stroke-width="8"/>
        <rect x="27" y="132" width="21" height="21" rx="3" fill="#ED4690"/>
        <rect x="75" y="25" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="95" y="25" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="75" y="45" width="12" height="12" rx="2" fill="#ED4690"/>
        <rect x="95" y="55" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="75" y="75" width="30" height="30" rx="4" fill="#ED4690"/>
        <rect x="120" y="75" width="15" height="15" rx="2" fill="#111827"/>
        <rect x="75" y="120" width="15" height="15" rx="2" fill="#111827"/>
        <rect x="100" y="120" width="15" height="15" rx="2" fill="#ED4690"/>
      </svg>
    `;
  }

  const btnCopyLiveUrl = document.getElementById('btn-copy-live-url');
  if (btnCopyLiveUrl) {
    btnCopyLiveUrl.addEventListener('click', () => {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        showToast("Hosted URL copied to clipboard!");
      });
    });
  }

  // --- Fullscreen Kiosk Mode ---
  btnKiosk.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        document.body.classList.add('kiosk-mode');
        showToast("Entered Kiosk Display Mode");
      }).catch(() => {
        document.body.classList.toggle('kiosk-mode');
      });
    } else {
      document.exitFullscreen().then(() => {
        document.body.classList.remove('kiosk-mode');
      });
    }
  });

  // --- Robust Dropdown State Management ---
  function closeAllDropdowns() {
    sourceLangDropdown.classList.add('hidden');
    targetLangDropdown.classList.add('hidden');
    sourceLangPill.classList.remove('open');
    targetLangPill.classList.remove('open');
  }

  function toggleDropdown(dropdownToToggle, pillToToggle, otherDropdown, otherPill) {
    const isCurrentlyHidden = dropdownToToggle.classList.contains('hidden');
    closeAllDropdowns();
    if (isCurrentlyHidden) {
      dropdownToToggle.classList.remove('hidden');
      pillToToggle.classList.add('open');
    }
  }

  sourceLangPill.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(sourceLangDropdown, sourceLangPill, targetLangDropdown, targetLangPill);
  });

  targetLangPill.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(targetLangDropdown, targetLangPill, sourceLangDropdown, sourceLangPill);
  });

  // Handle source options
  document.querySelectorAll('#source-lang-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('#source-lang-dropdown .dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentSourceMode = item.dataset.val || 'tech';
      sourceLangText.textContent = item.textContent;
      closeAllDropdowns();

      if (currentSourceMode === 'dev-slack') {
        sourceInput.value = "“PR is blocked, waiting on CI/CD runner to finish the integration build.”";
        updateInputState();
      } else if (currentSourceMode === 'consultant') {
        sourceInput.value = "“We must orchestrate a synergized cloud-native microservices transformation paradigm.”";
        updateInputState();
      }
      runTranslation();
    });
  });

  // Handle target options
  document.querySelectorAll('#target-lang-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('#target-lang-dropdown .dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentTargetMode = item.dataset.val || 'non-tech';
      targetLangText.textContent = item.textContent;
      closeAllDropdowns();
      runTranslation();
    });
  });

  // Close dropdowns on ANY click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-selector-group')) {
      closeAllDropdowns();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // Close modals on background click
  [captionModal, quizModal, qrModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // --- Toast Helper ---
  let toastTimer = null;
  function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Category Tabs & Search Event Listeners ---
  document.querySelectorAll('#category-tabs .cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#category-tabs .cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategoryFilter = tab.dataset.cat;
      renderChips();
    });
  });

  const phrasesSearch = document.getElementById('phrases-search');
  if (phrasesSearch) {
    phrasesSearch.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderChips();
    });
  }

  // --- Initial Launch ---
  renderChips();
  updateInputState();
  runTranslation();
});
