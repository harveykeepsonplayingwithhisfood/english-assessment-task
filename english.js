const introTitle = document.getElementById("title");
const textDiv = document.getElementById("text");
const choicesDiv = document.getElementById("choices");
const nextBtn = document.getElementById("next-button");
const restartBtn = document.getElementById("restart-button");

const scenes = [
  { type: 'narration', text: "Sebastian the squirrel decided to go berry picking." },
  { type: 'narration', text: "He loved berries very much. They were his favourite food." },
  { type: 'narration', text: "He left home and went to the forest." },
  { type: 'narration', text: "He arrived and he started picking berries." },
  { type: 'narration', text: "He picked berries for hours and hours. He wanted to take every berry there." },
  { type: 'narration', text: "He went deeper and deeper into the forest." },
  { type: 'narration', text: "It was starting to get dark so Sebastian decided to head home happy with the big bag of berries he had collected." },
  { type: 'narration', text: "But Sebastian went too deep into the forest that he didn’t know where he was." },
  { type: 'narration', text: "He tried to retrace his steps but he still couldn't find the way home." },
  { type: 'narration', text: "He kept going and going hoping to find something. But he was lost." },
  { type: 'narration', text: "He saw a sickly old man and went up to him to ask for directions." },
  { type: 'speech', text: "Sebastian: Excuse me sir, would you happen to know directions back to town?" },
  { type: 'speech', text: "Old Man: I do have the directions you need. I can give them to you if you give me some of your berries. I am very hungry and don’t have the energy to go berry picking anymore." },
  {
    choices: [
      { text: "Share berries for directions", next: "share" },
      { text: "Refuse", next: "refuse" }
    ]
  }
];

const branches = {
  share: [
    { type: 'speech', text: "Sebastian: Of course I will share my berries for directions." },
    { type: 'narration', text: "The squirrel shares a portion of his berries with the old man." },
    { type: 'speech', text: "Old Man: Thank you young squirrel. I have two pathways you can take to get home: a long path and a short path." },
    {
      choices: [
        { text: "Long Path", next: "long" },
        { text: "Short Path", next: "short" }
      ]
    }
  ],
  refuse: [
    { type: 'speech', text: "Sebastian: No, I want all the berries to myself. I will find my own way." },
    { type: 'speech', text: "Old Man: Good luck." },
    { type: 'narration', text: "The squirrel begins to walk home. He is unsure of what direction to go and it starts to get dark." },
    { type: 'narration', text: "It's quiet — too quiet. He can't help but feel anxious." },
    { type: 'narration', text: "He realizes it was a mistake to not get directions from the old man." },
    { type: 'narration', text: "He decides to go back and apologize to the old man, hoping he will forgive him." },
    { type: 'speech', text: "Sebastian: I will give you half my berries if you can give me directions home." },
    { type: 'narration', text: "The old man forgives him and gives him two options." },
    {
      choices: [
        { text: "Short Path", next: "short" },
        { text: "Long Path", next: "long" }
      ]
    }
  ],
  long: [
    { type: 'speech', text: "Sebastian: I will go the long but safe path. I've had enough trouble for today." },
    { type: 'narration', text: "The old man gives directions and wishes him luck." },
    { type: 'narration', text: "It was a long walk but Sebastian makes it home safely with lots of berries to eat." },
    { type: 'narration', text: "ENDING ONE: He learned his lesson to not pick berries until that late again.", end: true }
  ],
  short: [
    { type: 'narration', text: "Sebastian decides to take the short yet dangerous way because it was going to get dark soon." },
    { type: 'narration', text: "The old man wishes him luck and they say their goodbyes." },
    { type: 'narration', text: "He feels uneasy and keeps hearing rattling and other noises. It had become dark and Sebastian couldn’t see much." },
    { type: 'narration', text: "(LOUD SOUND) A robber comes and snatches the squirrel’s berries!" },
    { type: 'speech', text: "Sebastian: COME BACK THOSE ARE MY BERRIES!" },
    { type: 'narration', text: "He tries to chase after the robber but it is so dark he had lost him." },
    { type: 'narration', text: "The squirrel decides to cut his losses and head home. It was too dark." },
    { type: 'narration', text: "He gets home safely but without any berries." },
    { type: 'narration', text: "ENDING TWO: He had wasted the day with nothing to show for it. He will try again tomorrow and visit his new friend the old man.", end: true }
  ]
};

let current = scenes;
let index = 0;

function showScene() {
  const scene = current[index];
  textDiv.innerHTML = "";
  choicesDiv.innerHTML = "";

  if (scene.type === 'narration') {
    textDiv.innerHTML = `<div class='narration'>${scene.text}</div>`;
    nextBtn.style.display = 'block';
    restartBtn.style.display = 'none';
  } else if (scene.type === 'speech') {
    textDiv.innerHTML = `<div class='speech'>${scene.text}</div>`;
    nextBtn.style.display = 'block';
    restartBtn.style.display = 'none';
  } else if (scene.choices) {
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.className = 'choice-button';
      btn.onclick = () => {
        current = branches[choice.next];
        index = 0;
        introTitle.style.display = 'none';
        showScene();
      };
      choicesDiv.appendChild(btn);
    });
  }

  if (scene.end) {
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
  }
}

nextBtn.onclick = () => {
  index++;
  if (index < current.length) {
    showScene();
  }
};

restartBtn.onclick = () => {
  current = scenes;
  index = 0;
  introTitle.style.display = 'block';
  showScene();
};

showScene();
