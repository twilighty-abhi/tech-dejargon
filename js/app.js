/**
 * IDLIStack Tech De-jargoniser
 * Core Application Engine - Annual Summit 2026 Edition
 */

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
  let currentQuizIndex = 0;
  let quizScore = 0;

  // --- Initialize Widely Used Phrases Chips ---
  function renderChips() {
    phrasesChipsContainer.innerHTML = '';
    JARGON_DATABASE.forEach(item => {
      const chip = document.createElement('button');
      chip.className = `phrase-chip ${item.id === currentActiveId ? 'active' : ''}`;
      chip.textContent = item.term;
      chip.dataset.id = item.id;
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
  function runTranslation() {
    const text = sourceInput.value.trim();
    if (!text) {
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
    const lower = text.toLowerCase();
    
    // Find matching item in database
    let matchedItem = JARGON_DATABASE.find(item => {
      const termMatch = lower.includes(item.term.toLowerCase());
      const idMatch = lower.includes(item.id.replace(/-/g, ' '));
      const phraseMatch = item.techPhrase.toLowerCase().includes(lower);
      return termMatch || idMatch || phraseMatch;
    });

    // Substring fallback check
    if (!matchedItem) {
      matchedItem = JARGON_DATABASE.find(item => {
        const words = item.term.toLowerCase().split(/\s+/);
        return words.some(w => w.length > 2 && lower.includes(w));
      });
    }

    if (matchedItem) {
      if (currentTargetMode === 'eli5') {
        renderTranslation({
          leadAnalogy: `👶 In simple words: ${matchedItem.simpleAnalogy}`,
          secondaryDesc: `Think of it like this: ${matchedItem.plainExplanation.split('. ')[0]}. That way you don't have to worry about complicated computer things!`,
          impact: `Saves time and avoids mistakes for your team.`
        });
      } else if (currentTargetMode === 'funder') {
        renderTranslation({
          leadAnalogy: `📊 Executive & Funder Summary: ${matchedItem.term} (${matchedItem.category}) is core digital infrastructure that mitigates operational risk and scales program impact.`,
          secondaryDesc: `Strategic Value: Eliminates manual administrative overhead, guarantees institutional reliability, and ensures compliance with donor data governance standards.`,
          impact: matchedItem.impactContext
        });
      } else if (currentTargetMode === 'tech-spec') {
        renderTranslation({
          leadAnalogy: `🛠️ Developer Specification: ${matchedItem.reverseTechSpec}`,
          secondaryDesc: `Pattern: ${matchedItem.term} in ${matchedItem.category}. On IDLIStack, deploy via standardized containerized stack with automated monitoring.`,
          impact: `Self-hosted on IDLIStack without recurring SaaS subscription costs.`
        });
      } else {
        renderTranslation({
          leadAnalogy: matchedItem.plainExplanation.split('. ').slice(0, 3).join('. ') + '.',
          secondaryDesc: matchedItem.plainExplanation.split('. ').slice(3).join('. ') || `In simpler terms: ${matchedItem.simpleAnalogy}`,
          impact: matchedItem.impactContext,
          analogySummary: matchedItem.simpleAnalogy
        });
      }
    } else {
      // Generic intelligent deconstruction for custom input
      renderCustomTranslation(text);
    }
  }

  function translatePlainToTech(text) {
    const lower = text.toLowerCase();
    let matchedItem = JARGON_DATABASE.find(item => {
      return lower.includes(item.term.toLowerCase()) || 
             (item.reversePhrase && lower.includes(item.reversePhrase.toLowerCase())) ||
             (item.impactContext && lower.includes(item.category.toLowerCase()));
    });

    if (matchedItem) {
      renderTranslation({
        leadAnalogy: `Tech Specification: ${matchedItem.reverseTechSpec}`,
        secondaryDesc: `Corresponding Infrastructure Term: ${matchedItem.term} (${matchedItem.category}). When speaking to engineers or vendors, ask them: "${matchedItem.techPhrase}"`,
        impact: `This allows your engineering partners to implement: ${matchedItem.simpleAnalogy}`,
        analogySummary: `Recommended standard: ${matchedItem.term}`
      });
    } else {
      renderTranslation({
        leadAnalogy: `Standard Engineering Requirement: Define modular service interface with secure RESTful endpoints and automated logging.`,
        secondaryDesc: `For non-profit implementations on IDLIStack, map this to an open-source tool like Ghost, Listmonk, or Whatomate rather than custom code.`,
        impact: `Reduces ongoing server maintenance and leverages community-tested open-source workflows.`,
        analogySummary: `Modular Open Source Architecture`
      });
    }
  }

  function renderTranslation({ leadAnalogy, secondaryDesc, impact }) {
    translationText.innerHTML = `
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

  function renderCustomTranslation(text) {
    translationText.innerHTML = `
      <p class="lead-analogy">Think of this like an automated helper coordinating behind the scenes so your team doesn't have to perform manual data entry or manage complex servers.</p>
      <p class="secondary-desc">In the social sector, complex technical jargon usually refers to either: (1) connecting two apps together, (2) keeping donor data secure, or (3) automating repetitive daily chores.</p>
    `;
    impactCard.classList.remove('hidden');
    impactText.textContent = `At IDLIStack, we package these technical building blocks into ready-to-run open-source tools with zero server headaches.`;
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
    const quote = sourceInput.value.trim() || "“Just use the API to pull the donor list.”";
    const leadP = translationText.querySelector('.lead-analogy');
    const analogy = leadP ? leadP.innerText : translationText.innerText.slice(0, 160) + '...';

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

  // --- Summit Mini Quiz ---
  btnQuiz.addEventListener('click', () => {
    currentQuizIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
    quizModal.classList.remove('hidden');
  });

  quizClose.addEventListener('click', () => {
    quizModal.classList.add('hidden');
  });

  function renderQuizQuestion() {
    const q = SUMMIT_QUIZ_QUESTIONS[currentQuizIndex];
    document.getElementById('quiz-title').textContent = "De-jargon Quiz Challenge";
    document.getElementById('quiz-progress').textContent = `Question ${currentQuizIndex + 1} of ${SUMMIT_QUIZ_QUESTIONS.length} • Score: ${quizScore}`;
    document.getElementById('quiz-question-text').textContent = q.question;

    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';
    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.classList.add('hidden');
    const btnNext = document.getElementById('btn-next-quiz');
    btnNext.disabled = true;

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
    }

    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.innerHTML = `<strong>${selectedIdx === correctIdx ? '🎉 Correct!' : '💡 Good Try!'}</strong> ${explanation}`;
    feedbackBox.classList.remove('hidden');

    const btnNext = document.getElementById('btn-next-quiz');
    btnNext.disabled = false;
  }

  document.getElementById('btn-next-quiz').addEventListener('click', () => {
    currentQuizIndex++;
    if (currentQuizIndex < SUMMIT_QUIZ_QUESTIONS.length) {
      renderQuizQuestion();
    } else {
      // Quiz complete screen
      document.getElementById('quiz-question-text').innerHTML = `
        <div style="text-align: center; padding: 12px 0;">
          <h4 style="font-size: 1.5rem; margin-bottom: 8px;">🏆 Challenge Complete!</h4>
          <p style="font-size: 1.1rem; color: #10B981; font-weight: 700;">You scored ${quizScore} out of ${SUMMIT_QUIZ_QUESTIONS.length}!</p>
          <p style="margin-top: 8px; color: #4B5563; font-size: 0.95rem;">Show this screen to the IDLIStack booth team to claim your summit stickers!</p>
        </div>
      `;
      document.getElementById('quiz-options').innerHTML = '';
      document.getElementById('quiz-feedback').classList.add('hidden');
      const btnNext = document.getElementById('btn-next-quiz');
      btnNext.textContent = 'Close & Return';
      btnNext.onclick = () => quizModal.classList.add('hidden');
    }
  });

  // --- Mobile QR Code Modal ---
  btnQr.addEventListener('click', () => {
    renderQrCode();
    qrModal.classList.remove('hidden');
  });

  qrClose.addEventListener('click', () => {
    qrModal.classList.add('hidden');
  });

  function renderQrCode() {
    // Generate clean SVG QR-style graphic
    const container = document.getElementById('qr-code-container');
    container.innerHTML = `
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="180" height="180" fill="white"/>
        <!-- Corners -->
        <rect x="15" y="15" width="45" height="45" rx="6" stroke="#111827" stroke-width="8"/>
        <rect x="27" y="27" width="21" height="21" rx="3" fill="#ED4690"/>
        
        <rect x="120" y="15" width="45" height="45" rx="6" stroke="#111827" stroke-width="8"/>
        <rect x="132" y="27" width="21" height="21" rx="3" fill="#ED4690"/>
        
        <rect x="15" y="120" width="45" height="45" rx="6" stroke="#111827" stroke-width="8"/>
        <rect x="27" y="132" width="21" height="21" rx="3" fill="#ED4690"/>
        
        <!-- Pattern Dots -->
        <rect x="75" y="25" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="95" y="25" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="75" y="45" width="12" height="12" rx="2" fill="#ED4690"/>
        <rect x="95" y="55" width="12" height="12" rx="2" fill="#111827"/>
        
        <rect x="25" y="75" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="45" y="85" width="12" height="12" rx="2" fill="#111827"/>
        <rect x="75" y="75" width="30" height="30" rx="4" fill="#ED4690"/>
        <rect x="120" y="75" width="15" height="15" rx="2" fill="#111827"/>
        <rect x="145" y="85" width="15" height="15" rx="2" fill="#111827"/>
        
        <rect x="75" y="120" width="15" height="15" rx="2" fill="#111827"/>
        <rect x="100" y="120" width="15" height="15" rx="2" fill="#ED4690"/>
        <rect x="125" y="125" width="20" height="20" rx="3" fill="#111827"/>
        <rect x="75" y="145" width="20" height="20" rx="3" fill="#111827"/>
        <rect x="110" y="145" width="35" height="20" rx="3" fill="#ED4690"/>
      </svg>
    `;
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

  // --- Initial Launch ---
  renderChips();
  updateInputState();
  runTranslation();
});
