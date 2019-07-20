// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты.
// Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий,
// во время технического обслуживания и т. д.

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      daysSpan: document.querySelector('span[data-value="days"]'),
      hoursSpan: document.querySelector('span[data-value="hours"]'),
      minutesSpan: document.querySelector('span[data-value="mins"]'),
      secondsSpan: document.querySelector('span[data-value="secs"]'),
    };

    this.startTimer = function() {
      const remainingTime =
        Date.parse(this.targetDate) - Date.parse(new Date());
      const convertedRemainingData = this.convertTimeStandartValues(
        remainingTime,
      );
      this.updateFrontRepresentation(convertedRemainingData);
    };

    this.convertTimeStandartValues = function(remainingTimeInMilliseconds) {
      const secs = Math.floor(
        (remainingTimeInMilliseconds % (1000 * 60)) / 1000,
      );
      const mins = Math.floor(
        (remainingTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
      );
      const hours = Math.floor(
        (remainingTimeInMilliseconds % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60),
      );
      const days = Math.floor(
        remainingTimeInMilliseconds / (1000 * 60 * 60 * 24),
      );
      return {
        remainingTime: remainingTimeInMilliseconds,
        days: days,
        hours: hours,
        minutes: mins,
        seconds: secs,
      };
    };

    this.updateFrontRepresentation = function(convertRemainingTimeData) {
      let tmpRamainingDataObj = convertRemainingTimeData;
      let intervalId = setInterval(() => {
        (this.refs.daysSpan.innerHTML = this.pad(tmpRamainingDataObj.days)),
          (this.refs.hoursSpan.innerHTML = this.pad(tmpRamainingDataObj.hours)),
          (this.refs.minutesSpan.innerHTML = this.pad(
            tmpRamainingDataObj.minutes,
          )),
          (this.refs.secondsSpan.innerHTML = this.pad(
            tmpRamainingDataObj.seconds,
          ));

        tmpRamainingDataObj = this.convertTimeStandartValues(
          tmpRamainingDataObj.remainingTime - 1000,
        );

        if (tmpRamainingDataObj.remainingTime < 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    };

    this.pad = function(value) {
      return String(value).padStart(2, '0');
    };
  }
}

let timer01 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 28, 2019'),
});

timer01.startTimer();
