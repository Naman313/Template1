// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // Preloader auto-dismiss after 2.2 seconds
  setTimeout(() => {
    dismissPreloader();
  }, 2200);

  // Initialize Scroll Reveal Animations
  initScrollAnimations();

  // Set default tour date to tomorrow
  const dateInput = document.getElementById('tourDateInput');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Initialize Age Explorer with default value 18
  updateAgeExplorer(18);
  calcSetCampus('Pembroke');
});

// ================= SCROLL ANIMATIONS ENGINE =================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-slide-left, .reveal-slide-right, .reveal-zoom');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Scroll Progress Bar & Floating Back-To-Top listener
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / (height || 1)) * 100;
    
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
      progressBar.style.width = Math.min(scrolled, 100) + '%';
    }

    const backBtn = document.getElementById('backToTopBtn');
    if (backBtn) {
      if (winScroll > 320) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    }
  }, { passive: true });
}

// ================= PRELOADER DISMISS =================
function dismissPreloader() {
  const preloader = document.getElementById('bookPreloader');
  if (preloader && !preloader.classList.contains('preloader-hidden')) {
    preloader.classList.add('preloader-hidden');
  }
}

// ================= 3D STORYBOOK FLIP CONTROLLER =================
let currentBookPage = 0;
const totalBookPages = 4;

function flipPage(pageIndex) {
  const page = document.getElementById(`bookPage${pageIndex}`);
  if (page) {
    page.classList.add('flipped');
  }
  currentBookPage = pageIndex + 1;
  updateBookDots();
  if (window.lucide) lucide.createIcons();
}

function unflipPage(pageIndex) {
  const page = document.getElementById(`bookPage${pageIndex}`);
  if (page) {
    page.classList.remove('flipped');
  }
  currentBookPage = pageIndex;
  updateBookDots();
  if (window.lucide) lucide.createIcons();
}

function goToBookPage(targetIndex) {
  for (let i = 0; i < totalBookPages; i++) {
    const page = document.getElementById(`bookPage${i}`);
    if (page) {
      if (i < targetIndex) {
        page.classList.add('flipped');
      } else {
        page.classList.remove('flipped');
      }
    }
  }
  currentBookPage = targetIndex;
  updateBookDots();
  if (window.lucide) lucide.createIcons();
}

function updateBookDots() {
  for (let i = 0; i < totalBookPages; i++) {
    const dot = document.getElementById(`dot${i}`);
    if (dot) {
      if (i === currentBookPage) {
        dot.className = 'w-3.5 h-3.5 rounded-full bg-tle-purple transition scale-125';
      } else {
        dot.className = 'w-3.5 h-3.5 rounded-full bg-stone-300 transition';
      }
    }
  }
}

// ================= CELEBRATION CONFETTI =================
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 }
    });
  }
}

// ================= AGE EXPLORER SLIDER =================
// Age ranges and descriptions match the 3 real programs listed on herewegrowdaycare.com/programs/
const ageExplorerData = [
  {
    maxMonths: 15,
    ageLabel: "Infant (1 – 15 Months)",
    title: "Infant Program",
    tag: "Infant Program",
    ratio: "Small Ratios",
    image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800&auto=format&fit=crop&q=80",
    desc: "Designed to meet your infant's developmental needs with individual schedules and consistent care in a safe, healthy, and stimulating environment.",
    milestones: [
      "Individual sleep & feeding schedules",
      "Consistent, caring attention"
    ],
    programParam: "Infant Program (1 - 15 Months)"
  },
  {
    maxMonths: 33,
    ageLabel: "Toddler (15 – 33 Months)",
    title: "Toddler Program",
    tag: "Toddler Program",
    ratio: "Small Ratios",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
    desc: "Focused on social, emotional, physical, and cognitive development in a safe and caring environment.",
    milestones: [
      "Social & emotional growth",
      "Physical & cognitive development"
    ],
    programParam: "Toddler Program (15 - 33 Months)"
  },
  {
    maxMonths: 60,
    ageLabel: "Preschool (2.9 – 5 Years)",
    title: "Preschool Program",
    tag: "Preschool Program",
    ratio: "Kindergarten Ready",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80",
    desc: "An age-appropriate curriculum designed to prepare children for kindergarten, with an emphasis on writing, letter, and number recognition.",
    milestones: [
      "Writing, letter & number recognition",
      "Age-appropriate kindergarten prep"
    ],
    programParam: "Preschool Program (2.9 - 5 Years)"
  }
];

function updateAgeExplorer(val) {
  const months = parseInt(val, 10);
  let matched = ageExplorerData[ageExplorerData.length - 1];

  for (let i = 0; i < ageExplorerData.length; i++) {
    if (months <= ageExplorerData[i].maxMonths) {
      matched = ageExplorerData[i];
      break;
    }
  }

  const ageDisplay = document.getElementById('sliderAgeDisplay');
  const title = document.getElementById('classroomTitle');
  const tag = document.getElementById('classroomBadgeTag');
  const ratio = document.getElementById('classroomRatio');
  const desc = document.getElementById('classroomDescription');
  const img = document.getElementById('classroomImage');

  if (ageDisplay) ageDisplay.textContent = `${months} Months (${matched.ageLabel.split('(')[0].trim()})`;
  if (title) title.textContent = matched.title;
  if (tag) tag.textContent = matched.tag;
  if (ratio) ratio.textContent = matched.ratio;
  if (desc) desc.textContent = matched.desc;
  if (img) img.src = matched.image;

  const m1 = document.getElementById('milestone1');
  const m2 = document.getElementById('milestone2');

  if (m1) m1.textContent = matched.milestones[0];
  if (m2) m2.textContent = matched.milestones[1];

  const bookBtn = document.getElementById('bookSpecificRoomBtn');
  if (bookBtn) {
    bookBtn.onclick = () => openTourModal('Any', matched.programParam);
  }
}

// ================= DAILY RHYTHM TIMELINE =================
// Content limited to what herewegrowdaycare.com actually publishes: open 7:30 AM Mon-Fri,
// breakfast/snacks provided, lunch NOT provided, plus general active/quiet/outdoor play.
const timelineData = [
  {
    time: "7:30 AM",
    step: "Step 1 of 4",
    title: "Morning Arrival",
    desc: "Doors open Monday through Friday at 7:30 AM. Children are greeted warmly and settle in with quiet play as they arrive.",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80"
  },
  {
    time: "Morning",
    step: "Step 2 of 4",
    title: "Breakfast & Snacks",
    desc: "Breakfast and snacks are provided daily to keep little ones fueled through the morning and afternoon.",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80"
  },
  {
    time: "Midday",
    step: "Step 3 of 4",
    title: "Lunch Time",
    desc: "Lunch is not provided — please send a packed lunch from home. Our teachers help with opening containers and encourage healthy eating habits.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80"
  },
  {
    time: "Afternoon",
    step: "Step 4 of 4",
    title: "Activities & Pickup",
    desc: "The rest of the day includes a balance of active and quiet play, outdoor activities, and games. Pickup is available until 5:00 PM at Pembroke and 5:30 PM at Randolph.",
    img: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800&auto=format&fit=crop&q=80"
  }
];

function selectTimeline(index) {
  const data = timelineData[index];
  if (!data) return;

  const buttons = document.querySelectorAll('.timeline-btn');
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.className = 'timeline-btn active shrink-0 px-5 py-3 rounded-full text-xs font-black bg-tle-cyan text-white shadow transition flex items-center gap-1.5';
    } else {
      btn.className = 'timeline-btn shrink-0 px-5 py-3 rounded-full text-xs font-black bg-white text-slate-700 border border-stone-200 hover:bg-stone-50 transition flex items-center gap-1.5';
    }
  });

  const img = document.getElementById('timelineImg');
  const badge = document.getElementById('timelineBadge');
  const stepName = document.getElementById('timelineStepName');
  const heading = document.getElementById('timelineHeading');
  const desc = document.getElementById('timelineDescription');

  if (img) img.src = data.img;
  if (badge) badge.textContent = data.time;
  if (stepName) stepName.textContent = data.step;
  if (heading) heading.textContent = data.title;
  if (desc) desc.textContent = data.desc;
}

// ================= TUITION & SCHEDULE =================
// The real site publishes no pricing, so this no longer calculates a dollar amount —
// it just keeps the campus-specific phone number in sync with the selected campus.
let calcSelectedCampus = 'Pembroke';

const campusContact = {
  Pembroke: { name: 'Pembroke', tel: '7812936800', display: '(781) 293-6800' },
  Randolph: { name: 'Randolph', tel: '7819864145', display: '(781) 986-4145' }
};

function calcSetCampus(campus) {
  calcSelectedCampus = campus;
  const btnPem = document.getElementById('calcBtnPem');
  const btnRan = document.getElementById('calcBtnRan');

  if (campus === 'Pembroke') {
    if (btnPem) btnPem.className = 'p-3.5 rounded-2xl font-heading font-black text-xs border-2 border-tle-cyan bg-white text-tle-cyan shadow-sm transition';
    if (btnRan) btnRan.className = 'p-3.5 rounded-2xl font-heading font-black text-xs border-2 border-transparent bg-white/70 text-slate-700 hover:bg-white transition';
  } else {
    if (btnRan) btnRan.className = 'p-3.5 rounded-2xl font-heading font-black text-xs border-2 border-tle-cyan bg-white text-tle-cyan shadow-sm transition';
    if (btnPem) btnPem.className = 'p-3.5 rounded-2xl font-heading font-black text-xs border-2 border-transparent bg-white/70 text-slate-700 hover:bg-white transition';
  }

  const contact = campusContact[campus];
  const callLink = document.getElementById('calcCallLink');
  const callLabel = document.getElementById('calcCallLabel');
  if (contact && callLink) callLink.href = `tel:${contact.tel}`;
  if (contact && callLabel) callLabel.textContent = `Call ${contact.name}: ${contact.display}`;
}

// ================= TOUR MODAL WIZARD =================
function openTourModal(defaultCampus, defaultProgram) {
  const modal = document.getElementById('tourModal');
  if (!modal) return;

  goToStep(1);
  const conf = document.getElementById('wizardConfirmation');
  const form = document.getElementById('tourWizardForm');
  if (conf) conf.classList.add('hidden');
  if (form) form.classList.remove('hidden');

  if (defaultCampus && defaultCampus !== 'Any') {
    const campusRadio = document.querySelector(`input[name="modalCampus"][value="${defaultCampus}"]`);
    if (campusRadio) campusRadio.checked = true;
  }

  if (defaultProgram) {
    const progSelect = document.getElementById('modalProgram');
    if (progSelect) {
      for (let i = 0; i < progSelect.options.length; i++) {
        if (progSelect.options[i].text.includes(defaultProgram)) {
          progSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  modal.classList.remove('modal-hidden');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeTourModal() {
  const modal = document.getElementById('tourModal');
  if (modal) {
    modal.classList.add('modal-hidden');
    document.body.style.overflow = 'auto';
  }
}

function goToStep(step) {
  const s1 = document.getElementById('wizardStep1');
  const s2 = document.getElementById('wizardStep2');
  const s3 = document.getElementById('wizardStep3');

  const l1 = document.getElementById('stepLabel1');
  const l2 = document.getElementById('stepLabel2');
  const l3 = document.getElementById('stepLabel3');

  if (s1) s1.classList.add('hidden');
  if (s2) s2.classList.add('hidden');
  if (s3) s3.classList.add('hidden');

  if (l1) l1.className = 'text-purple-200 flex items-center gap-1';
  if (l2) l2.className = 'text-purple-200 flex items-center gap-1';
  if (l3) l3.className = 'text-purple-200 flex items-center gap-1';

  if (step === 1) {
    if (s1) s1.classList.remove('hidden');
    if (l1) l1.className = 'text-tle-yellow font-black flex items-center gap-1';
  } else if (step === 2) {
    if (s2) s2.classList.remove('hidden');
    if (l2) l2.className = 'text-tle-yellow font-black flex items-center gap-1';
  } else if (step === 3) {
    if (s3) s3.classList.remove('hidden');
    if (l3) l3.className = 'text-tle-yellow font-black flex items-center gap-1';
  }

  if (window.lucide) lucide.createIcons();
}

function handleWizardSubmit(e) {
  e.preventDefault();

  const campus = document.querySelector('input[name="modalCampus"]:checked')?.value || 'Pembroke';
  const program = document.getElementById('modalProgram')?.value || 'Toddler Program';
  const time = document.querySelector('input[name="modalTime"]:checked')?.value || '10:00 AM';
  const date = document.getElementById('tourDateInput')?.value || 'Tomorrow';

  const cCampus = document.getElementById('confirmedCampus');
  const cProgram = document.getElementById('confirmedProgram');
  const cTime = document.getElementById('confirmedTime');

  if (cCampus) cCampus.textContent = `${campus} Campus`;
  if (cProgram) cProgram.textContent = program;
  if (cTime) cTime.textContent = `${date} at ${time}`;

  const form = document.getElementById('tourWizardForm');
  const conf = document.getElementById('wizardConfirmation');

  if (form) form.classList.add('hidden');
  if (conf) conf.classList.remove('hidden');

  triggerConfetti();
  if (window.lucide) lucide.createIcons();
}
