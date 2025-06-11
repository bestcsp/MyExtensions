console.log("✅ content.js is running");
function formatTime(hoursFloat) {
  const fullHours = Math.floor(hoursFloat);
  const minutes = Math.round((hoursFloat - fullHours) * 60);

  if (fullHours === 0 && minutes > 0) {
    return `${minutes} min`;
  } else if (fullHours > 0 && minutes > 0) {
    return `${fullHours} hrs ${minutes} min`;
  } else {
    return `${fullHours} hrs`;
  }
}

function extractPrice() {
  const priceElement = document.querySelector('.Nx9bqj.CxhGGd') || document.querySelector('._30jeq3');
  if (priceElement) {
    const priceText = priceElement.textContent.replace(/[^\d]/g, '');
    return parseFloat(priceText);
  }
  return null;
}

function insertWorkInfo(price, wage) {
    const hourlyWage = wage / 8;
    const hours = price / hourlyWage;
    const days = (hours / 8).toFixed(2);
    const timeFormatted = formatTime(hours);
console.log(`Price: ${price}, Wage: ${wage}, Hours: ${hours}, Days: ${days}`);
  const info = document.createElement('div');
//   info.textContent = `🧮 Work time: ${hours} hrs (~${days} days)`;
info.textContent = `🧮 Work time: ${timeFormatted} (~${days} days)`;

  info.style.background = '#fff3cd';
  info.style.border = '1px solid #ffeeba';
  info.style.padding = '10px';
  info.style.marginTop = '10px';
  info.style.fontWeight = 'bold';

  const titleParent = document.querySelector('h1._6EBuvT')?.parentElement;
  if (titleParent && !document.getElementById('work-info-box')) {
    info.id = 'work-info-box';
    titleParent.appendChild(info);
  }
}

function waitForPriceAndInsert() {
  const interval = setInterval(() => {
    const price = extractPrice();
    if (price) {
      clearInterval(interval);
      chrome.storage.sync.get('wage', ({ wage }) => {
        if (wage) {
          insertWorkInfo(price, wage);
        }
      });
    }
  }, 1000);
}

waitForPriceAndInsert();
