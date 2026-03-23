let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    function checkGuess() {
      const guess = Number(document.getElementById("guessInput").value);
      const message = document.getElementById("message");
      const attemptsText = document.getElementById("attempts");

      if (!guess) {
        message.textContent = "⚠️ Please enter a number!";
        return;
      }

      attempts++;

      if (guess === randomNumber) {
        message.textContent = `🎉 Correct! You guessed it in ${attempts} tries.`;
      } else if (guess > randomNumber) {
        message.textContent = "📉 Too high! Try again.";
      } else {
        message.textContent = "📈 Too low! Try again.";
      }

      attemptsText.textContent = `Attempts: ${attempts}`;
    }

    function resetGame() {
      randomNumber = Math.floor(Math.random() * 100) + 1;
      attempts = 0;
      document.getElementById("message").textContent = "";
      document.getElementById("attempts").textContent = "";
      document.getElementById("guessInput").value = "";
    }













//  let secret = Math.floor(Math.random() * 100) + 1;
//     let attempts = 0;
//     let lo = 1, hi = 100;
//     let won = false;
 
//     const input       = document.getElementById('guessInput');
//     const resultText  = document.getElementById('resultText');
//     const attemptsText= document.getElementById('attemptsText');
//     const rangeBar    = document.getElementById('rangeBar');
//     const decorNum    = document.getElementById('decorNum');
//     const dot         = document.getElementById('dot');
 
//     function updateBar() {
//         const pct = ((hi - lo) / 99) * 100;
//         rangeBar.style.transform = `scaleX(${pct / 100})`;
//     }
 
//     function updateAttempts() {
//         attemptsText.textContent = attempts === 1 ? '1 attempt' : `${attempts} attempts`;
//     }
 
//     document.getElementById('guessBtn').addEventListener('click', guess);
//     input.addEventListener('keydown', e => { if (e.key === 'Enter') guess(); });
 
//     document.getElementById('restartBtn').addEventListener('click', () => {
//         secret = Math.floor(Math.random() * 100) + 1;
//         attempts = 0; lo = 1; hi = 100; won = false;
//         input.value = '';
//         input.disabled = false;
//         resultText.className = 'result-text';
//         resultText.textContent = 'Pick a number and take your shot!';
//         dot.className = 'dot';
//         updateAttempts();
//         updateBar();
//         decorNum.textContent = '?';
//         input.focus();
//     });
 
//     function guess() {
//         if (won) return;
//         const val = parseInt(input.value);
//         if (isNaN(val) || val < 1 || val > 100) {
//             resultText.className = 'result-text';
//             resultText.textContent = '⚠ Enter a valid number between 1 and 100.';
//             return;
//         }
//         attempts++;
//         updateAttempts();
//         decorNum.textContent = val;
 
//         if (val === secret) {
//             resultText.className = 'result-text win';
//             resultText.textContent = `🎉 Nailed it! The number was ${secret}.`;
//             dot.className = 'dot win';
//             rangeBar.style.transform = 'scaleX(0.02)';
//             won = true;
//             input.disabled = true;
//         } else if (val < secret) {
//             lo = Math.max(lo, val + 1);
//             resultText.className = 'result-text hint-low';
//             resultText.textContent = `📈 Too low — aim higher than ${val}.`;
//             updateBar();
//         } else {
//             hi = Math.min(hi, val - 1);
//             resultText.className = 'result-text hint-high';
//             resultText.textContent = `📉 Too high — try lower than ${val}.`;
//             updateBar();
//         }
//         input.value = '';
//         input.focus();
//     }
 
//     updateBar();


