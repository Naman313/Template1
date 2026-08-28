// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

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
  recalculateTuition();
});

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
        dot.className = 'w-3 h-3 rounded-full bg-sprout-600 transition scale-125';
      } else {
        dot.className = 'w-3 h-3 rounded-full bg-stone-300 transition';
      }
    }
  }
}

// ================= CELEBRATION CONFETTI =================
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ================= HERO BUBBLE EXPLORER =================
function selectHeroBubble(type, title, desc) {
  const titleElem = document.getElementById('activeBubbleTitle');
  const descElem = document.getElementById('heroBubbleDesc');
  
  if (titleElem) titleElem.textContent = title;
  if (descElem) descElem.textContent = `"${desc}"`;
  
  triggerConfetti();
}

// ================= AGE EXPLORER SLIDER =================
const ageExplorerData = [
  {
    maxMonths: 14,
    ageLabel: "Infant Nursery (1 – 14 Months)",
    title: "Infant Sanctuary & Gentle Nurturing",
    tag: "Infant Care Suite",
    ratio: "1:4 Low Ratio • 1-on-1 Gentle Nurturing",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
    desc: "A calm, peaceful sanctuary where every baby follows their own individual sleeping and feeding schedule. Caregivers provide gentle holding, tummy time, and sensory motor stimulation.",
    milestones: [
      "Tummy time & head control milestones",
      "Gentle vocalization & visual tracking",
      "Individualized nap & feeding schedules",
      "Daily parent digital photo reports"
    ],
    programParam: "Infant Care (1 - 15 Months)"
  },
  {
    maxMonths: 24,
    ageLabel: "Toddler 1 (15 – 24 Months)",
    title: "Toddler Discovery & First Words Room",
    tag: "Toddler Discovery Suite",
    ratio: "1:4 Ratio • Hands-on Sensory Play",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&auto=format&fit=crop&q=80",
    desc: "Active little explorers build early vocabulary, learn sharing routines, and explore safe sensory stations with blocks, soft toys, and finger painting.",
    milestones: [
      "First 50+ words & two-word phrases",
      "Early potty-training partnership",
      "Fine motor stacking & block building",
      "Daily music, rhythm sticks & dance"
    ],
    programParam: "Toddler Discovery (15 - 33 Months)"
  },
  {
    maxMonths: 35,
    ageLabel: "Twos (2 – 3 Years)",
    title: "Curiosity & Social Exploration Studio",
    tag: "Older Toddler Suite",
    ratio: "1:5 Ratio • Creative Imagination",
    image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&auto=format&fit=crop&q=80",
    desc: "Channeling toddler curiosity into social collaboration, independent handwashing, dynamic circle time, and outdoor sandbox exploration.",
    milestones: [
      "Sentence building & conversational skills",
      "Potty mastery & independent routines",
      "Color recognition & shape sorting",
      "Collaborative play & sharing games"
    ],
    programParam: "Toddler Discovery (15 - 33 Months)"
  },
  {
    maxMonths: 47,
    ageLabel: "Preschool (3 – 4 Years)",
    title: "Preschool STEAM & Literacy Studio",
    tag: "Preschool Academy Room",
    ratio: "1:10 Ratio • Structured Learning Centers",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    desc: "A vibrant room featuring guided phonics, early math stations, science experiment tables, and structured music and drama corners.",
    milestones: [
      "Letter recognition & phonics sounds",
      "Number counting 1 to 30",
      "Scissor safety & pencil grip practice",
      "Group problem solving & storytelling"
    ],
    programParam: "Preschool (2.9 - 4 Years)"
  },
  {
    maxMonths: 60,
    ageLabel: "Pre-K (4 – 5 Years)",
    title: "Kindergarten Readiness & Leadership Suite",
    tag: "Pre-K Academy Suite",
    ratio: "1:10 Ratio • Kindergarten Ready",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    desc: "Comprehensive kindergarten preparation focusing on early reading, writing, STEM experiments, teamwork, and emotional confidence.",
    milestones: [
      "Sight words, phonics & writing full name",
      "Math addition concepts & counting to 100",
      "STEM science inquiry & experiments",
      "Confidence transitioning to Kindergarten"
    ],
    programParam: "Pre-Kindergarten (4 - 5 Years)"
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
  const m3 = document.getElementById('milestone3');
  const m4 = document.getElementById('milestone4');

  if (m1) m1.textContent = matched.milestones[0];
  if (m2) m2.textContent = matched.milestones[1];
  if (m3) m3.textContent = matched.milestones[2];
  if (m4) m4.textContent = matched.milestones[3];

  const bookBtn = document.getElementById('bookSpecificRoomBtn');
  if (bookBtn) {
    bookBtn.onclick = () => openTourModal('Any', matched.programParam);
  }
}

// ================= DAILY RHYTHM TIMELINE =================
const timelineData = [
  {
    time: "7:30 AM – 8:30 AM",
    step: "Step 1 of 6",
    title: "Warm Welcomes & Wholesome Breakfast",
    desc: "Children are greeted by name with warm smiles. Free choice morning play allows children to gently ease into their day while enjoying freshly prepared breakfast and milk.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    note: "📱 Parents receive their morning check-in confirmation on the parent app."
  },
  {
    time: "9:00 AM – 10:15 AM",
    step: "Step 2 of 6",
    title: "Morning Circle, Music & Sing-Alongs",
    desc: "Children gather on the cozy rug for interactive calendar time, weather songs, letter phonics, and cheerful movement games that build social bonds.",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    note: "🎵 Daily vocabulary word and song lyrics are shared with parents."
  },
  {
    time: "10:15 AM – 11:30 AM",
    step: "Step 3 of 6",
    title: "Sensory Stations, STEAM & Creative Art",
    desc: "Hands-on learning stations: finger painting, safe science experiments, building blocks, playdough sculpting, and early math counting games.",
    img: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&auto=format&fit=crop&q=80",
    note: "🎨 Real-time photos of art creations uploaded directly to parents."
  },
  {
    time: "11:30 AM – 12:30 PM",
    step: "Step 4 of 6",
    title: "Family-Style Healthy Lunch & Stories",
    desc: "Children practice handwashing, self-feeding, and table manners in a joyful family setting. Teachers assist with warming and opening packed lunches.",
    img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&auto=format&fit=crop&q=80",
    note: "🍎 App update records meal portions eaten and hydration."
  },
  {
    time: "12:30 PM – 2:30 PM",
    step: "Step 5 of 6",
    title: "Cozy Nap Sanctuary & Peaceful Rest",
    desc: "Soft lullabies, dimmed lighting, and sanitized individual cots ensure every child recharges peacefully. Infant rooms follow individual sleep cycles.",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
    note: "😴 Rest duration logged for complete parent transparency."
  },
  {
    time: "3:00 PM – 5:30 PM",
    step: "Step 6 of 6",
    title: "Outdoor Play Yards, Afternoon Snack & Pick-Up",
    desc: "Fresh air, climbing equipment, tricycle riding, sandbox games, followed by a wholesome afternoon snack and loving parent pick-up.",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    note: "👋 Daily summary card sent to your phone as you arrive."
  }
];

function selectTimeline(index) {
  const data = timelineData[index];
  if (!data) return;

  const buttons = document.querySelectorAll('.timeline-btn');
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.className = 'timeline-btn active shrink-0 px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-sprout-600 text-white shadow transition flex items-center gap-1.5';
    } else {
      btn.className = 'timeline-btn shrink-0 px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-white text-slate-700 border border-stone-200 hover:bg-stone-50 transition flex items-center gap-1.5';
    }
  });

  const img = document.getElementById('timelineImg');
  const badge = document.getElementById('timelineBadge');
  const stepName = document.getElementById('timelineStepName');
  const heading = document.getElementById('timelineHeading');
  const desc = document.getElementById('timelineDescription');
  const note = document.getElementById('timelineParentNote');

  if (img) img.src = data.img;
  if (badge) badge.textContent = data.time;
  if (stepName) stepName.textContent = data.step;
  if (heading) heading.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (note) note.textContent = data.note;
}

// ================= TUITION ESTIMATOR =================
let calcSelectedCampus = 'Pembroke';
let calcSelectedDays = 5;

const tuitionRates = {
  infant: { 2: 240, 3: 310, 5: 395 },
  toddler: { 2: 220, 3: 285, 5: 365 },
  preschool: { 2: 195, 3: 260, 5: 335 }
};

function calcSetCampus(campus) {
  calcSelectedCampus = campus;
  const btnPem = document.getElementById('calcBtnPem');
  const btnRan = document.getElementById('calcBtnRan');

  if (campus === 'Pembroke') {
    if (btnPem) btnPem.className = 'p-3 rounded-2xl font-heading font-bold text-xs border-2 border-sprout-500 bg-sprout-50 text-sprout-800 transition';
    if (btnRan) btnRan.className = 'p-3 rounded-2xl font-heading font-bold text-xs border-2 border-stone-200 bg-white text-slate-700 hover:border-sprout-300 transition';
  } else {
    if (btnRan) btnRan.className = 'p-3 rounded-2xl font-heading font-bold text-xs border-2 border-sprout-500 bg-sprout-50 text-sprout-800 transition';
    if (btnPem) btnPem.className = 'p-3 rounded-2xl font-heading font-bold text-xs border-2 border-stone-200 bg-white text-slate-700 hover:border-sprout-300 transition';
  }
  recalculateTuition();
}

function calcSetDays(days) {
  calcSelectedDays = days;
  const d2 = document.getElementById('calcDays2');
  const d3 = document.getElementById('calcDays3');
  const d5 = document.getElementById('calcDays5');

  if (d2) d2.className = 'p-2.5 rounded-xl border-2 border-stone-200 bg-white text-slate-700 transition';
  if (d3) d3.className = 'p-2.5 rounded-xl border-2 border-stone-200 bg-white text-slate-700 transition';
  if (d5) d5.className = 'p-2.5 rounded-xl border-2 border-stone-200 bg-white text-slate-700 transition';

  if (days === 2 && d2) d2.className = 'p-2.5 rounded-xl border-2 border-sprout-500 bg-sprout-50 text-sprout-800 transition';
  if (days === 3 && d3) d3.className = 'p-2.5 rounded-xl border-2 border-sprout-500 bg-sprout-50 text-sprout-800 transition';
  if (days === 5 && d5) d5.className = 'p-2.5 rounded-xl border-2 border-sprout-500 bg-sprout-50 text-sprout-800 transition';

  recalculateTuition();
}

function recalculateTuition() {
  const progSelect = document.getElementById('calcProgramSelect');
  const prog = progSelect ? progSelect.value : 'toddler';
  const rate = tuitionRates[prog] ? tuitionRates[prog][calcSelectedDays] : 365;

  const elem = document.getElementById('calcTuitionAmount');
  if (elem) {
    elem.innerHTML = `$${rate} <span class="text-sm font-normal text-slate-500">/ week</span>`;
  }
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

  if (l1) l1.className = 'text-sprout-200 flex items-center gap-1';
  if (l2) l2.className = 'text-sprout-200 flex items-center gap-1';
  if (l3) l3.className = 'text-sprout-200 flex items-center gap-1';

  if (step === 1) {
    if (s1) s1.classList.remove('hidden');
    if (l1) l1.className = 'text-sunny-300 font-extrabold flex items-center gap-1';
  } else if (step === 2) {
    if (s2) s2.classList.remove('hidden');
    if (l2) l2.className = 'text-sunny-300 font-extrabold flex items-center gap-1';
  } else if (step === 3) {
    if (s3) s3.classList.remove('hidden');
    if (l3) l3.className = 'text-sunny-300 font-extrabold flex items-center gap-1';
  }

  if (window.lucide) lucide.createIcons();
}

function handleWizardSubmit(e) {
  e.preventDefault();

  const campus = document.querySelector('input[name="modalCampus"]:checked')?.value || 'Pembroke';
  const program = document.getElementById('modalProgram')?.value || 'Toddler Discovery';
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
