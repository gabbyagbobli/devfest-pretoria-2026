// Codelab Application Script - DevFest Pretoria 2026

// State variables
let currentStepIndex = 0;
let stepsData = [];
let checkedItems = {};

// On DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  initCodelab();
  initTheme();
  setupEventListeners();
  handleRouting();
});

// Initialize Codelab from content data
function initCodelab() {
  if (!window.CODELAB_DATA) {
    console.error("Codelab content data not found. Please verify content.js is loaded.");
    return;
  }

  // Set global title and category
  document.title = `${window.CODELAB_DATA.title} | Codelab`;
  const headerTitle = document.getElementById("header-title");
  if (headerTitle) headerTitle.textContent = window.CODELAB_DATA.title;

  const sidebarCategory = document.getElementById("sidebar-category");
  if (sidebarCategory) sidebarCategory.textContent = window.CODELAB_DATA.category;

  stepsData = window.CODELAB_DATA.steps;

  // Load checked items progress from localStorage
  const savedCheckedItems = localStorage.getItem("codelab_checked_items");
  if (savedCheckedItems) {
    try {
      checkedItems = JSON.parse(savedCheckedItems);
    } catch (e) {
      checkedItems = {};
    }
  }

  // Render Sidebar steps list
  renderSidebarSteps();
}

// Initialize Theme (Dark/Light mode)
function initTheme() {
  const savedTheme = localStorage.getItem("codelab_theme") || "dark"; // Default to dark for premium feel
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleIcon(savedTheme);
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle Button
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Footer Navigation Buttons
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => navigateToStep(currentStepIndex - 1));
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (currentStepIndex === stepsData.length - 1) {
        // Complete Codelab
        triggerConfetti();
      } else {
        navigateToStep(currentStepIndex + 1);
      }
    });
  }

  // Mobile Hamburger Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (mobileToggle && sidebar && overlay) {
    const toggleMobileNav = () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("active");
    };

    mobileToggle.addEventListener("click", toggleMobileNav);
    overlay.addEventListener("click", toggleMobileNav);
  }

  // Listen to hash changes in URL
  window.addEventListener("hashchange", handleRouting);

  // Keyboard navigation listener (Left/Right arrow keys)
  document.addEventListener("keydown", (e) => {
    // Only navigate if user is not typing in a text field
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return;
    }
    if (e.key === "ArrowLeft") {
      if (currentStepIndex > 0) navigateToStep(currentStepIndex - 1);
    } else if (e.key === "ArrowRight") {
      if (currentStepIndex < stepsData.length - 1) navigateToStep(currentStepIndex + 1);
    }
  });
}

// Toggle Theme between dark and light
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("codelab_theme", newTheme);
  updateThemeToggleIcon(newTheme);
}

// Update Theme Toggle Button Icon based on Theme
function updateThemeToggleIcon(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  if (theme === "dark") {
    // Moon icon to Sun icon
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z"/>
      </svg>
    `;
  } else {
    // Sun icon to Moon icon
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
      </svg>
    `;
  }
}

// Render steps items in the sidebar
function renderSidebarSteps() {
  const listElement = document.getElementById("sidebar-steps-list");
  if (!listElement) return;

  listElement.innerHTML = "";

  stepsData.forEach((step, idx) => {
    const isCompleted = isStepCheckedFully(step.id);
    const li = document.createElement("li");
    li.className = `step-item ${idx === currentStepIndex ? "active" : ""} ${isCompleted ? "completed" : ""}`;
    li.setAttribute("data-step-index", idx);
    li.innerHTML = `
      <div class="step-status-icon">${idx === currentStepIndex || isCompleted ? "" : idx + 1}</div>
      <div class="step-info">
        <span class="step-title" title="${step.title}">${step.title}</span>
        <span class="step-duration">${step.duration} min</span>
      </div>
    `;

    li.addEventListener("click", () => {
      navigateToStep(idx);
      // On mobile, close sidebar when step is clicked
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("sidebar-overlay");
      if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
      }
    });

    listElement.appendChild(li);
  });
}

// Handle routing from URL hash values
function handleRouting() {
  const hash = window.location.hash;
  let stepIdx = 0;

  if (hash.startsWith("#step-")) {
    const stepNum = parseInt(hash.replace("#step-", ""), 10);
    if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= stepsData.length) {
      stepIdx = stepNum - 1;
    }
  }

  navigateToStep(stepIdx, false);
}

// Navigate to step index
function navigateToStep(idx, updateHash = true) {
  if (idx < 0 || idx >= stepsData.length) return;

  currentStepIndex = idx;

  if (updateHash) {
    window.location.hash = `step-${idx + 1}`;
    return; // handleRouting will be called by hashchange listener
  }

  // Update sidebar active highlights
  const sidebarItems = document.querySelectorAll(".step-item");
  sidebarItems.forEach((item, i) => {
    const isCompleted = isStepCheckedFully(stepsData[i].id);
    item.className = `step-item ${i === currentStepIndex ? "active" : ""} ${isCompleted ? "completed" : ""}`;
    const statusIcon = item.querySelector(".step-status-icon");
    if (statusIcon) {
      statusIcon.textContent = i === currentStepIndex || isCompleted ? "" : i + 1;
    }
  });

  // Render content area
  renderStepContent();

  // Scroll content to top
  const contentPanel = document.getElementById("content-panel");
  if (contentPanel) contentPanel.scrollTop = 0;

  // Update progress tracking metrics
  updateProgressMetrics();

  // Update Footer buttons
  updateFooterControls();
}

// Render dynamic content for current step
function renderStepContent() {
  const step = stepsData[currentStepIndex];
  const contentArea = document.getElementById("step-content-area");
  if (!contentArea || !step) return;

  // Fade transition support
  contentArea.style.opacity = 0;

  setTimeout(() => {
    contentArea.innerHTML = `
      <div class="codelab-step-header">
        <div class="codelab-meta">
          <span class="badge badge-step">Step ${step.id} of ${stepsData.length}</span>
          <span class="badge badge-time">⏳ ${step.duration} mins remaining</span>
        </div>
        <h1 class="codelab-step-title">${step.title}</h1>
      </div>
      <div class="codelab-step-body">
        ${step.contentHtml}
      </div>
    `;

    // Initialize checkboxes within rendered content
    setupCheckboxesInContent();
    contentArea.style.opacity = 1;
  }, 100);
}

// Setup checked values for inputs in the newly rendered HTML
function setupCheckboxesInContent() {
  const checkboxes = document.querySelectorAll(".checklist-checkbox");
  checkboxes.forEach((cb) => {
    const checklistId = cb.getAttribute("data-checklist-id");
    
    // Check local storage setting
    if (checkedItems[checklistId]) {
      cb.checked = true;
      cb.closest(".checklist-item")?.classList.add("checked");
    }

    cb.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      const label = cb.closest(".checklist-item");
      
      if (isChecked) {
        label?.classList.add("checked");
        checkedItems[checklistId] = true;
      } else {
        label?.classList.remove("checked");
        delete checkedItems[checklistId];
      }

      // Save to local storage
      localStorage.setItem("codelab_checked_items", JSON.stringify(checkedItems));

      // Re-evaluate current step completion state & update metrics
      updateStepCompletionStatus(stepsData[currentStepIndex].id);
      updateProgressMetrics();
    });
  });
}

// Determine if a specific step's checklist items are fully completed
function isStepCheckedFully(stepId) {
  const step = stepsData.find(s => s.id === stepId);
  if (!step) return false;

  const stepIdx = stepsData.indexOf(step);
  // If the user has navigated past this step, consider it complete
  if (currentStepIndex > stepIdx) {
    return true;
  }

  // Extract checklist item IDs defined in content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = step.contentHtml;
  const checkboxes = tempDiv.querySelectorAll(".checklist-checkbox");
  
  if (checkboxes.length === 0) {
    // If no checkboxes exist, it is complete if they are on the final step
    return currentStepIndex === stepIdx && stepIdx === stepsData.length - 1;
  }

  // If there are checkboxes, all must be checked in localStorage
  return Array.from(checkboxes).every(cb => {
    const id = cb.getAttribute("data-checklist-id");
    return !!checkedItems[id];
  });
}

// Re-evaluates completions for the sidebar
function updateStepCompletionStatus(stepId) {
  const stepIdx = stepsData.findIndex(s => s.id === stepId);
  if (stepIdx === -1) return;

  const isCompleted = isStepCheckedFully(stepId);
  const sidebarItems = document.querySelectorAll(".step-item");
  const sidebarItem = sidebarItems[stepIdx];

  if (sidebarItem) {
    if (isCompleted) {
      sidebarItem.classList.add("completed");
      const icon = sidebarItem.querySelector(".step-status-icon");
      if (icon) icon.textContent = "";
    } else {
      sidebarItem.classList.remove("completed");
      const icon = sidebarItem.querySelector(".step-status-icon");
      if (icon) icon.textContent = stepIdx === currentStepIndex ? "" : stepIdx + 1;
    }
  }
}

// Calculate progress percentage and total estimated remaining time
function updateProgressMetrics() {
  // Progress Bar percentage is based on the user's reading position in the steps list
  const progressPercent = stepsData.length > 1 
    ? Math.round((currentStepIndex / (stepsData.length - 1)) * 100) 
    : 100;

  const fillElement = document.getElementById("progress-bar-fill");
  const textElement = document.getElementById("progress-info-text");

  if (fillElement) fillElement.style.width = `${progressPercent}%`;
  if (textElement) textElement.textContent = `${progressPercent}% Complete`;

  // Update dynamic duration left badge on content
  let timeRemaining = 0;
  for (let i = currentStepIndex; i < stepsData.length; i++) {
    timeRemaining += stepsData[i].duration;
  }
  const badgeTime = document.querySelector(".badge-time");
  if (badgeTime) {
    badgeTime.textContent = `⏳ ${timeRemaining} mins left`;
  }
}

// Sync Next/Prev buttons
function updateFooterControls() {
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (btnPrev) {
    btnPrev.disabled = currentStepIndex === 0;
  }

  if (btnNext) {
    if (currentStepIndex === stepsData.length - 1) {
      btnNext.innerHTML = `Finish Codelab 🏆`;
      btnNext.style.background = "var(--gradient-accent)";
    } else {
      btnNext.innerHTML = `Next Step ➔`;
      btnNext.style.background = "var(--gradient-primary)";
    }
  }
}

// Copy Code Block functionality
window.copyCode = function(btnElement) {
  const preElement = btnElement.closest("pre");
  if (!preElement) return;

  const codeElement = preElement.querySelector("code");
  if (!codeElement) return;

  // Extract raw text
  const textToCopy = codeElement.textContent;

  navigator.clipboard.writeText(textToCopy).then(() => {
    btnElement.textContent = "Copied!";
    btnElement.classList.add("copied");

    setTimeout(() => {
      btnElement.textContent = "Copy";
      btnElement.classList.remove("copied");
    }, 2000);
  }).catch(err => {
    console.error("Could not copy code snippet: ", err);
  });
};

// Celebration Confetti Logic
let confettiActive = false;
function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = [
    "#2563eb", "#7c3aed", "#3b82f6", "#8b5cf6", 
    "#ec4899", "#10b981", "#f59e0b", "#ef4444"
  ];
  
  const particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0
    });
  }

  confettiActive = true;

  function drawConfetti() {
    if (!confettiActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(p.tiltAngle);
      p.tilt = Math.sin(p.tiltAngle - (particles.indexOf(p) / 3)) * 15;

      if (p.y <= canvas.height) {
        activeParticles++;
      }

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();

      // Recirculate particle if it falls off bottom
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(drawConfetti);
    }
  }

  drawConfetti();

  // Stop confetti animation after 6 seconds
  setTimeout(() => {
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 6000);
}

// Window resize handler to sync canvas width/height
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// Social Share Callback Function
window.shareCodelabCompletion = function() {
  const title = encodeURIComponent(window.CODELAB_DATA.title);
  const text = encodeURIComponent(`I completed the "${window.CODELAB_DATA.title}" workshop at DevFest Pretoria 2026! 🚀🔥`);
  const url = encodeURIComponent(window.location.origin + window.location.pathname);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
};
