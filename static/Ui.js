class Ui {
  constructor() {
    this.afterLogin = document.getElementById("afterLogin");
    this.loginPanel = document.getElementById("loginPanel");
    this.loginBtn = document.getElementById("loginbtn");
    this.loginInput = document.getElementById("login");
    this.status = document.getElementById("status");
    this.resetBtn = document.getElementById("reset");
    this.timerSection = document.getElementById("timeTo");
    console.log(this.status);
    this.user = "";

    this.net = null;
    this.game = null;
    this.intervalTimer = null;

    this.loginBtn.addEventListener("click", () => {
      console.log(this.loginInput.value);
      this.net.login(this.loginInput.value);
    });

    this.resetBtn.addEventListener("click", () => {
      this.net.reset();
    });
  }

  cantGo = () => {
    this.status.innerHTML = "NIE MOŻNA DOŁĄCZYĆ";
  };

  addPlayer = ({ login, number, oponent }) => {
    console.log(this.status);
    this.status.innerHTML = `Witaj ${login}, grasz ${
      number == 1 ? "białymi" : "czarnymi"
    }, Twój przeciwnik to ${number == 1 ? "" : oponent} `;
    this.user = login;
    this.loginPanel.style.display = "none";
    //this.afterLogin.style.display = "none";
    this.game.addPlayerToGame(number);
  };
  getNet = (netObj) => {
    this.net = netObj;
  };
  updatePlayer = (data) => {
    this.status.innerHTML = `Witaj ${data.login}, grasz ${
      data.number == 1 ? "białymi" : "czarnymi"
    },Twój przeciwnik to ${data.oponent}`;
  };

  getGame = (gameObj) => {
    this.game = gameObj;
  };
  isLogged = (value) => {
    if (!value) {
      this.afterLogin.innerHTML =
        "OCZEKIWANIE <br/> <div class='spinner'></div>";
    } else {
      this.afterLogin.style.display = "none";
    }
  };

  TimerStart = () => {
    let seconds = 30;
    this.afterLogin.style.display = "flex";
    this.afterLogin.innerText = `OCZEKIWANIE \n ${seconds}`;
    this.intervalTimer = setInterval(() => {
      seconds -= 1;
      this.afterLogin.innerText = `OCZEKIWANIE \n ${seconds}`;
      if (seconds == 0) {
        this.afterLogin.innerHTML = "Brak ruchu przeciwnika - zwycięstwo";
        this.net.setLose();
        this.WinScreen();
        clearInterval(this.intervalTimer);
      }
    }, 1000);
  };

  TimerStop = () => {
    clearInterval(this.intervalTimer);
    this.afterLogin.style.display = "none";
  };

  StartTimer = () => {
    let seconds = 30;

    this.timerSection.innerHTML = "";
    this.intervalTimerMotion = setInterval(() => {
      seconds -= 1;
      this.timerSection.innerHTML = "";
      if (seconds == 0) {
        this.timerSection.innerHTML = "";
        clearInterval(this.intervalTimer);
      }
    }, 1000);
  };

  StopTimer = () => {
    clearInterval(this.intervalTimerMotion);
    this.timerSection.innerHTML = "";
  };

  WinScreen = () => {
    this.afterLogin.style.display = "flex";
    this.afterLogin.innerHTML = `GRATULACJE ${this.user} - ZWYCIĘSTWO`;
  };

  LoseScreen = () => {
    this.afterLogin.style.display = "flex";
    this.afterLogin.innerHTML = `NIESTETY ${this.user} - PRZEGRANA`;
  };
}

export default Ui;
