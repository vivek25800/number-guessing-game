
  let secret, attempts, maxNum, lo, hi, wins, best, gameOver;

  maxNum = 100;
  wins = 0;
  best = null;

  function startNewGame() {
    secret    = Math.floor(Math.random() * maxNum) + 1;
    attempts  = 0;
    lo        = 1;
    hi        = maxNum;
    gameOver  = false;

    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('guessInput').max = maxNum;
    document.getElementById('guessInput').min = 1;
    document.getElementById('history').innerHTML = '';
    document.getElementById('winOverlay').classList.remove('show');
    document.getElementById('rangeLow').textContent = 1;
    document.getElementById('rangeHigh').textContent = maxNum;
    document.getElementById('rangeFill').style.left = '0%';
    document.getElementById('rangeFill').style.right = '0%';
    document.getElementById('rangePointer').style.display = 'none';

    updateStats();
    setFeedback('🎯', 'Make your first guess!', 'Type a number between 1 and ' + maxNum + '.', '');
    document.getElementById('guessInput').focus();
  }

  function setDifficulty(btn, range) {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    maxNum = range;
    startNewGame();
  }

  function updateStats() {
    document.getElementById('attemptsVal').textContent = attempts;
    document.getElementById('winsVal').textContent = wins;
    document.getElementById('bestVal').textContent = best !== null ? best : '—';
  }

  function setFeedback(icon, strong, text, cls) {
    const fb = document.getElementById('feedback');
    fb.className = 'feedback ' + cls;
    fb.innerHTML = `
      <span class="feedback-icon">${icon}</span>
      <div class="feedback-text">
        <strong>${strong}</strong>
        ${text}
      </div>
    `;
  }

  function updateRange() {
    const fill  = document.getElementById('rangeFill');
    const ptr   = document.getElementById('rangePointer');
    const total = maxNum;
    const leftPct  = ((lo - 1) / total) * 100;
    const rightPct = ((maxNum - hi) / total) * 100;
    fill.style.left  = leftPct + '%';
    fill.style.right = rightPct + '%';

    document.getElementById('rangeLow').textContent  = lo;
    document.getElementById('rangeHigh').textContent = hi;
  }

  function addChip(num, cls) {
    const chip = document.createElement('span');
    chip.className = 'guess-chip ' + cls;
    chip.textContent = num;
    document.getElementById('history').appendChild(chip);
  }

  function makeGuess() {
    if (gameOver) return;
    const input = document.getElementById('guessInput');
    const val   = parseInt(input.value);

    if (isNaN(val) || val < 1 || val > maxNum) {
      const area = document.querySelector('.input-area');
      area.classList.remove('shake');
      void area.offsetWidth;
      area.classList.add('shake');
      setFeedback('⚠️', 'Invalid guess!', `Enter a number between 1 and ${maxNum}.`, '');
      return;
    }

    attempts++;
    updateStats();

    if (val === secret) {
      addChip(val, 'chip-correct');
      gameOver = true;
      wins++;
      if (best === null || attempts < best) best = attempts;
      updateStats();

      input.disabled = true;
      document.getElementById('guessBtn').disabled = true;

      setTimeout(() => {
        document.getElementById('winNumber').textContent = secret;
        document.getElementById('winSub').textContent =
          `Solved in ${attempts} guess${attempts !== 1 ? 'es' : ''}`;
        document.getElementById('winOverlay').classList.add('show');
      }, 400);

    } else if (val > secret) {
      hi = Math.min(hi, val - 1);
      updateRange();
      addChip(val, 'chip-high');
      setFeedback(
        '🔽',
        'Too High!',
        `${val} is too high. Try lower. Range: ${lo}–${hi}`,
        'high'
      );
    } else {
      lo = Math.max(lo, val + 1);
      updateRange();
      addChip(val, 'chip-low');
      setFeedback(
        '🔼',
        'Too Low!',
        `${val} is too low. Try higher. Range: ${lo}–${hi}`,
        'low'
      );
    }

    input.value = '';
    input.focus();
  }

  function giveUp() {
    if (gameOver) return;
    gameOver = true;
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessBtn').disabled = true;
    setFeedback('💀', `The number was ${secret}`, `Better luck next time! You used ${attempts} guess${attempts !== 1 ? 'es' : ''}.`, 'high');
  }

  // Enter key support
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guessInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') makeGuess();
    });
    startNewGame();
  });
