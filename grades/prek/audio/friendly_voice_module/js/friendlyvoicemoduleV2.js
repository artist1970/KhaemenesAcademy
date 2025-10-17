<script>
/* ==========================================================
 🌈 Friendly Voice Module v2 — Multi-Voice Personality System
========================================================== */

const voiceProfiles = {
  softGentle: {
    pitch: 1.3,
    rate: 0.9,
    volume: 1.0,
    description: "Warm, caring tone — perfect for calm moments or SEL activities."
  },
  playfulBright: {
    pitch: 1.6,
    rate: 1.05,
    volume: 1.0,
    description: "Energetic and cheerful — great for games and celebrations."
  },
  calmGuide: {
    pitch: 1.0,
    rate: 0.85,
    volume: 0.95,
    description: "Slow, confident tone — ideal for instructions or story reading."
  }
};

// 🌸 Voice snippet categories
const voicePacks = {
  welcome: [
    "Hi there, friend! I’m so happy to see you today!",
    "Hello, little explorer! Are you ready for some fun?",
    "Yay, you’re here! Let’s play and learn together!",
    "Welcome back, sunshine! Let’s see what adventures await!"
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

// 🍃 Ambient Sound Support
let bgSound;
let soundOn = false;
function initAmbientSound(
  src = "https://cdn.jsdelivr.net/gh/YourUserName/prek-assets/friendly_voice_module/audio/soft-chime.mp3"
) {
  bgSound = new Audio(src);
  bgSound.loop = true;
  bgSound.volume = 0.25;
}
function toggleAmbientSound() {
  if (!bgSound) initAmbientSound();
  soundOn = !soundOn;
  soundOn ? bgSound.play() : bgSound.pause();
}

/* ==========================================================
 🔊 Speak a Friendly Phrase
    category: 'welcome', 'guidance', 'encouragement', 'correction', 'goodbye'
    voiceStyle: 'softGentle', 'playfulBright', or 'calmGuide'
========================================================== */
function speakFriendly(category = "encouragement", voiceStyle = "softGentle") {
  speechSynthesis.cancel();

  const pack = voicePacks[category] || voicePacks.encouragement;
  const phrase = pack[Math.floor(Math.random() * pack.length)];
  const profile = voiceProfiles[voiceStyle] || voiceProfiles.softGentle;

  const utter = new SpeechSynthesisUtterance(phrase);
  utter.pitch = profile.pitch;
  utter.rate = profile.rate;
  utter.volume = profile.volume;
  utter.lang = "en-US";

  const voices = speechSynthesis.getVoices();
  const friendlyVoice = voices.find(v => /child|female|soft|kind/i.test(v.name));
  if (friendlyVoice) utter.voice = friendlyVoice;

  utter.onstart = () => {
    document.body.style.transition = "background 1s ease";
    document.body.style.background = "#fff9f5";
  };
  utter.onend = () => {
    document.body.style.background = "";
  };

  speechSynthesis.speak(utter);
}

/* ==========================================================
 🧩 Optional Demo Buttons (for testing)
========================================================== */
function createVoiceButtonsV2() {
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

  ["welcome", "encouragement", "guidance", "correction", "goodbye"].forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.style.padding = "8px 14px";
    btn.style.border = "none";
    btn.style.borderRadius = "12px";
    btn.style.background = "#a2d2ff";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      const styles = Object.keys(voiceProfiles);
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      speakFriendly(cat, randomStyle);
    });
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

// Uncomment to activate quick demo buttons:
// createVoiceButtonsV2();

</script>
