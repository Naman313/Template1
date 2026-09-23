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
    image: "temp_tle_hero/IMG_6310-1.jpg",
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
    image: "temp_tle_hero/IMG_5266.jpg",
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
    image: "temp_tle_hero/IMG_5418.jpg",
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
    img: "temp_tle_hero/IMG_5381.jpg"
  },
  {
    time: "Morning",
    step: "Step 2 of 4",
    title: "Breakfast & Snacks",
    desc: "Breakfast and snacks are provided daily to keep little ones fueled through the morning and afternoon.",
    img: "temp_tle_hero/IMG_5274.jpg"
  },
  {
    time: "Midday",
    step: "Step 3 of 4",
    title: "Lunch Time",
    desc: "Lunch is not provided — please send a packed lunch from home. Our teachers help with opening containers and encourage healthy eating habits.",
    img: "temp_tle_hero/IMG_5421-e1522421536543.jpg"
  },
  {
    time: "Afternoon",
    step: "Step 4 of 4",
    title: "Activities & Pickup",
    desc: "The rest of the day includes a balance of active and quiet play, outdoor activities, and games. Pickup is available until 5:00 PM at Pembroke and 5:30 PM at Randolph.",
    img: "temp_tle_hero/IMG_5385.jpg"
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

// ================= TOUR / CONTACT MODAL =================
// defaultCampus/defaultProgram are accepted (many buttons across the site pass them) but no
// longer used to pre-fill anything, since the form only asks for Name/Email/Mobile/Message.
function openTourModal(defaultCampus, defaultProgram) {
  const modal = document.getElementById('tourModal');
  if (!modal) return;

  const conf = document.getElementById('wizardConfirmation');
  const form = document.getElementById('tourContactForm');
  const errorBox = document.getElementById('tourFormError');

  if (conf) conf.classList.add('hidden');
  if (form) {
    form.classList.remove('hidden');
    form.reset();
  }
  if (errorBox) errorBox.classList.add('hidden');

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

// Sends Name/Email/Mobile/Message to FormSubmit, which emails it to dubeynaman31@gmail.com.
// No account/dashboard needed for either us or the client — the FIRST-EVER submission to a new
// email address triggers a one-time confirmation email from FormSubmit to that inbox; once that
// link is clicked, every submission after that is delivered automatically.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/dubeynaman31@gmail.com';

async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('tourSubmitBtn');
  const errorBox = document.getElementById('tourFormError');

  if (errorBox) errorBox.classList.add('hidden');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  try {
    const payload = Object.fromEntries(new FormData(form));

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data || data.success !== 'true') {
      throw new Error('FormSubmit returned an error response');
    }

    const nameValue = form.querySelector('[name="name"]')?.value;
    const confirmedName = document.getElementById('confirmedName');
    if (confirmedName) confirmedName.textContent = nameValue || 'there';

    const conf = document.getElementById('wizardConfirmation');
    form.classList.add('hidden');
    if (conf) conf.classList.remove('hidden');

    triggerConfetti();
  } catch (err) {
    if (errorBox) {
      errorBox.textContent = "Something went wrong sending your message — please try again, or call us directly.";
      errorBox.classList.remove('hidden');
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '🎉 Send Message';
    }
  }
}
