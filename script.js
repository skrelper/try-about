const verbs = [
  "squawking",
  "whispering",
  "shouting",
  "humming",
  "murmuring",
  "yelling"
];

const topics = [
  "birds",
  "politics",
  "the ocean",
  "your neighbor",
  "ghosts",
  "thunder"
];

const verbSlot = document.getElementById("verb-slot");
const topicSlot = document.getElementById("topic-slot");
const button = document.getElementById("spinButton");

function populateSlot(slot, words) {
  slot.innerHTML = "";
  words.forEach(word => {
    const div = document.createElement("div");
    div.textContent = word;
    slot.appendChild(div);
  });
}

populateSlot(verbSlot, verbs);
populateSlot(topicSlot, topics);

let spinning = false;

function spin(slot, words) {
  return new Promise(resolve => {
    let position = 0;
    let speed = 20;
    let totalDuration = 2000 + Math.random() * 1000;
    let start = Date.now();

    function animate() {
      position += speed;
      slot.style.transform = `translateY(-${position}px)`;

      if (Date.now() - start < totalDuration) {
        requestAnimationFrame(animate);
      } else {
        const index = Math.floor(Math.random() * words.length);
        const finalPos = index * 80;
        slot.style.transform = `translateY(-${finalPos}px)`;

        Array.from(slot.children).forEach(child => {
          child.classList.remove("active");
        });

        slot.children[index].classList.add("active");

        resolve();
      }
    }

    animate();
  });
}

button.addEventListener("click", async () => {
  if (spinning) return;
  spinning = true;

  await Promise.all([
    spin(verbSlot, verbs),
    spin(topicSlot, topics)
  ]);

  spinning = false;
});