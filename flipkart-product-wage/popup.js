const wageInput = document.getElementById('wage');
const saveButton = document.getElementById('save');

// Load saved wage when popup opens
chrome.storage.sync.get('wage', ({ wage }) => {
  if (!wage) return;

  const hourlyWage = wage / 8; // Assuming 8-hour workday
  const hours = price / hourlyWage;
  const days = (hours / 8).toFixed(2);
  const timeFormatted = formatTime(hours);

  const info = document.createElement('div');
  info.textContent = `🧮 Work time: ${timeFormatted} (~${days} days)`;
});

// Save the wage when button is clicked
saveButton.addEventListener('click', () => {
  const wage = parseFloat(wageInput.value);
  if (!isNaN(wage)) {
    chrome.storage.sync.set({ wage }, () => {
      alert('Hourly wage saved!');
    });
  }
});
