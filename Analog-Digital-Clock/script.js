const timeElement = document.querySelector('.digital-clock .time');
const dateElement = document.querySelector('.digital-clock .date');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function updateClock() {
  const now = new Date();

  // Digital clock
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  timeElement.textContent = formattedTime;
  dateElement.textContent = formattedDate;

  // Analog clock
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourRotation = (360 / 12) * (hours % 12) + (30 / 60) * minutes;
  const minuteRotation = (360 / 60) * minutes + (6 / 60) * seconds;
  const secondRotation = (360 / 60) * seconds;

  hourHand.style.transform = `rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call
