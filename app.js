const card = document.querySelector('#card');
const progress = document.querySelector('#progress');

const foods = [
  { emoji: '🍕', name: '披萨' },
  { emoji: '🍣', name: '寿司' },
  { emoji: '🍲', name: '火锅' },
  { emoji: '🍖', name: '烤肉' },
  { emoji: '🥟', name: '早茶' },
  { emoji: '🍜', name: '拉面' },
  { emoji: '🌶️', name: '麻辣烫' },
  { emoji: '🦞', name: '小龙虾' },
  { emoji: '🍢', name: '烧烤' },
  { emoji: '🍌', name: '其他' },
];

const state = {
  step: 0,
  date: getTomorrow(),
  time: '17:00',
  food: '火锅',
  noCount: 0,
};

const noLabels = ['不要 🤔', '再想想嘛 🥺', '点不到我 😌', '真的不要？😭'];

function getTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function setStep(step) {
  state.step = step;
  render();
}

function render() {
  card.className = 'invitation-card';

  if (state.step === 0) renderInvite();
  if (state.step === 1) renderSurprise();
  if (state.step === 2) renderSchedule();
  if (state.step === 3) renderFood();
  if (state.step === 4) renderFinal();

  renderProgress();
  card.classList.remove('is-entering');
  requestAnimationFrame(() => card.classList.add('is-entering'));
}

function renderInvite() {
  card.innerHTML = `
    <img class="avatar" src="assets/dog-avatar.png" alt="开心的法国斗牛犬" />
    <h1 class="title">🌸 可以和我一起<br />约会嘛？！ 🌸</h1>
    <p class="subtitle">系统检测到：对方已经紧张到开始写网页了。</p>
    <div class="actions">
      <button class="comic-button primary" id="yesButton" type="button">愿意 ❤</button>
      <button class="comic-button no-button" id="noButton" type="button">不要 🤔</button>
    </div>
  `;

  card.querySelector('#yesButton').addEventListener('click', () => setStep(1));
  const noButton = card.querySelector('#noButton');
  noButton.addEventListener('pointerenter', dodgeNoButton);
  noButton.addEventListener('click', dodgeNoButton);
}

function dodgeNoButton(event) {
  event.preventDefault();
  const button = event.currentTarget;
  state.noCount += 1;
  const direction = state.noCount % 2 === 0 ? -1 : 1;
  const horizontal = direction * Math.min(72, 20 + state.noCount * 12);
  const vertical = state.noCount % 3 === 0 ? -18 : 10;
  button.style.translate = `${horizontal}px ${vertical}px`;
  button.textContent = noLabels[state.noCount % noLabels.length];
}

function renderSurprise() {
  card.innerHTML = `
    <div class="square-icon red" aria-hidden="true">🥜</div>
    <h1 class="title compact">等下，你真的点了愿意？？ 😭</h1>
    <p class="subtitle">我都已经准备好被你点“不要”了。</p>
    <button class="comic-button primary wide single-action" id="continueButton" type="button">好啦好啦 →</button>
  `;

  card.querySelector('#continueButton').addEventListener('click', () => setStep(2));
}

function renderSchedule() {
  card.innerHTML = `
    <div class="square-icon" aria-hidden="true">📅</div>
    <h1 class="title compact">所以...你什么时候有空？ 😉</h1>
    <form class="form-stack" id="scheduleForm">
      <div class="field">
        <label for="dateInput">选一天 🌹</label>
        <input id="dateInput" name="date" type="date" min="${todayValue()}" value="${state.date}" required />
      </div>
      <div class="field">
        <label for="timeInput">几点呢？ 💗</label>
        <input id="timeInput" name="time" type="time" value="${state.time}" required />
      </div>
      <button class="comic-button primary wide" type="submit">确定时间 ❤</button>
    </form>
  `;

  card.querySelector('#scheduleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.date = formData.get('date');
    state.time = formData.get('time');
    setStep(3);
  });
}

function todayValue() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderFood() {
  card.classList.add('food-card');
  card.innerHTML = `
    <h1 class="title compact">我们吃点什么？ 🍽️✨</h1>
    <p class="subtitle">挑一个今天的约会氛围。</p>
    <div class="food-grid" role="group" aria-label="选择约会餐食">
      ${foods
        .map(
          (food) => `
            <button class="food-option${food.name === state.food ? ' selected' : ''}" data-food="${food.name}" type="button" aria-pressed="${food.name === state.food}">
              <span class="food-emoji" aria-hidden="true">${food.emoji}</span>
              <span class="food-name">${food.name}</span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;

  card.querySelectorAll('.food-option').forEach((button) => {
    button.addEventListener('click', () => {
      state.food = button.dataset.food;
      card.querySelectorAll('.food-option').forEach((option) => {
        const selected = option === button;
        option.classList.toggle('selected', selected);
        option.setAttribute('aria-pressed', String(selected));
      });
      window.setTimeout(() => setStep(4), 360);
    });
  });
}

function renderFinal() {
  card.classList.add('final-card');
  const formattedDate = formatDate(state.date);
  card.innerHTML = `
    <img class="avatar" src="assets/dog-avatar.png" alt="开心的法国斗牛犬" />
    <h1 class="title compact">真开心你没有拒绝～<br />我会准时来接你！</h1>
    <p class="subtitle">${formattedDate} ${state.time}，我们去吃${state.food}。带好胃口，我带好路线。</p>
    <div class="summary-grid" aria-label="约会安排">
      <div class="summary-item">
        <span class="summary-label">DATE</span>
        <strong class="summary-value">${formattedDate}</strong>
      </div>
      <div class="summary-item">
        <span class="summary-label">TIME</span>
        <strong class="summary-value">${state.time}</strong>
      </div>
      <div class="summary-item">
        <span class="summary-label">MENU</span>
        <strong class="summary-value">${state.food}</strong>
      </div>
    </div>
  `;
}

function formatDate(dateValue) {
  const [, month, day] = dateValue.split('-').map(Number);
  return `${month}月${day}日`;
}

function renderProgress() {
  progress.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const className = index <= state.step ? 'done' : '';
    return `<span class="${className}" aria-hidden="true">♥</span>`;
  }).join('');
  progress.setAttribute('aria-label', `约会邀请进度：第 ${state.step + 1} 步，共 5 步`);
}

render();
