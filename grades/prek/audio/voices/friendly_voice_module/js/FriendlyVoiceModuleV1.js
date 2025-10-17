<script>
/* ==============================================
 🌼 Friendly Voice & Ambient Sound Module
 Compatible with any vanilla JS or Wix game.
 ============================================== */

// 🌈 Voice snippet categories
const voicePacks = {
  welcome: [
    "Hi there, friend! I’m so happy to see you today!",
    "Hello, little explorer! Are you ready for some fun?",
    "Yay, you’re here! Let’s play and learn together!",
    "Welcome back, sunshine! Let’s see what adventures await."
  ],
  encouragement: [
    "Great job! You did it!",
    "Wow… that was wonderful work!",
    "You’re learning so much—bravo!",
    "You tried your best—and that’s what matters most!"
  ],
  guidance: [
    "Now, can you drag the star to the sky?",
    "Let’s tap the picture that makes you smile!",
    "Try coloring the shape with your favorite color.",
    "Take your time, we can do it together!"
  ],
  correction: [
    "That was a good try! Let’s see if we can find another answer.",
    "Almost! You’re so close!",
    "Hmm… let’s look again, I know you can do it.",
    "Don’t worry, learning takes practice!"
  ],
  goodbye: [
    "That was so much fun! I loved playing with you.",
    "Good job today, little star!",
    "See you soon, my friend!",
    "Bye for now—don’t forget to smile!"
  ]
};

// 🎵 Ambient background sound
let bgSound;
let soundOn = false;

/* ----------------------------------------------
 🍃 Initialize ambient sound system (call once)
---------------------------------------------- */
function initAmbientSound(src = "https://cdn.pixabay.com/download/audio/2021/09/15/audio_99321b7b6f.mp3?filename=soft-wind-chime-ambient-12273.mp3") {
  bgSound = new Audio(src);
  bgSound.loop = true;
  bgSound.volume = 0.25;
}

/* ----------------------------------------------
 🔊 Toggle ambient sound (on/off)
---------------------------------------------- */
function toggleAmbientSound() {
  if (!bgSound) initAmbientSound();
  soundOn = !soundOn;
  if (soundOn) {
    bgSound.play();
  } else {
    bgSound.pause();
  }
}

/* ----------------------------------------------
 🌷 Speak a friendly phrase by category
---------------------------------------------- */
function speakFriendly(category = "encouragement") {
  // Stop anything currently speaking
  speechSynthesis.cancel();

  const pack = voicePacks[category] || voicePacks.encouragement;
  const phrase = pack[Math.floor(Math.random() * pack.length)];
  const utter = new SpeechSynthesisUtterance(phrase);

  // Preschool-friendly voice tone
  utter.pitch = 1.3;     // gentle, cheerful
  utter.rate = 0.9;      // clear and slow
  utter.volume = 1.0;
  utter.lang = "en-US";

  // Choose soft voice
  const voices = speechSynthesis.getVoices();
  const friendlyVoice = voices.find(v => /child|female|soft|kind/i.test(v.name));
  if (friendlyVoice) utter.voice = friendlyVoice;

  // Optional gentle background fade
  utter.onstart = () => {
    document.body.style.transition = "background 1s ease";
    document.body.style.background = "#fff9f5";
  };
  utter.onend = () => {
    document.body.style.background = "";
  };

  speechSynthesis.speak(utter);
}

/* ----------------------------------------------
 💫 Example helper buttons (optional)
---------------------------------------------- */
function createVoiceButtons() {
  const categories = Object.keys(voicePacks);
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.justifyContent = "center";
  container.style.gap = "10px";
  container.style.zIndex = 9999;

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.style.padding = "8px 14px";
    btn.style.border = "none";
    btn.style.borderRadius = "12px";
    btn.style.background = "#a2d2ff";
    btn.style.color = "#fff";
    btn.style.fontFamily = "Poppins, sans-serif";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => speakFriendly(cat));
    container.appendChild(btn);
  });

  const soundBtn = document.createElement("button");
  soundBtn.textContent = "🔈 Nature Sound: Off";
  soundBtn.style.background = "#cdb4db";
  soundBtn.addEventListener("click", () => {
    toggleAmbientSound();
    soundBtn.textContent = soundOn ? "🔊 Nature Sound: On" : "🔈 Nature Sound: Off";
  });
  container.appendChild(soundBtn);

  document.body.appendChild(container);
}

/* ----------------------------------------------
 🧩 Initialize (optional UI)
---------------------------------------------- */
// Uncomment to add test buttons automatically:
// createVoiceButtons();

</script>
