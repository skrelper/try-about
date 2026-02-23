/* ===========================
   PUT YOUR WORD LISTS HERE
=========================== */

const verbs = [
  "squawking",
  "whispering",
  "murmuring",
  "humming",
  "yelling",
  "talking loudly"
];

const topics = [
  "the ocean",
  "government secrets",
  "ancient machinery",
  "invisible architecture",
  "your childhood memories",
  "a collapsing universe"
];

/* ===========================
   CORE LOGIC BELOW
=========================== */

const verbSlot = document.getElementById("verb-slot");
const topicSlot = document.getElementById("topic-slot");

function populateSlot(slot, words) {
  slot.innerHTML = "";

  // duplicate list 5 times for infinite scroll illusion
  for (let i = 0; i < 5; i++) {
    words.forEach(word => {
      const div = document.createElement("div");
      div.textContent = word;
      slot.appendChild(div);
    });
  }
}

populateSlot(verbSlot, verbs);
populateSlot(topicSlot, topics);

let spinning = false;

function spin(slot, words) {
  return new Promise(resolve => {

    let position = 0;
    let speed = 40;
    let duration = 2500 + Math.random() * 1000;
    let start = Date.now();

    function animate() {
      position += speed;
      slot.style.transform = `translateY(-${position}px)`;

      if (Date.now() - start < duration) {
        speed *= 0.98; // smooth slowdown
        requestAnimationFrame(animate);
      } else {

        const index = Math.floor(Math.random() * words.length);
        const finalPosition = index * 70;

        slot.style.transform = `translateY(-${finalPosition}px)`;

        Array.from(slot.children).forEach(child =>
          child.classList.remove("active")
        );

        slot.children[index].classList.add("active");

        resolve();
      }
    }

    animate();
  });
}

function triggerSpin() {
  if (spinning) return;
  spinning = true;

  Promise.all([
    spin(verbSlot, verbs),
    spin(topicSlot, topics)
  ]).then(() => {
    spinning = false;
  });
}

/* trigger on spacebar */
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    triggerSpin();
  }
});

/* trigger on click anywhere */
document.addEventListener("click", triggerSpin);
