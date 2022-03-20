export default class View {
  constructor() {
    this.btnStart = document.getElementById('start');
    this.btnStop = document.getElementById('stop');

    async function onBtnClick() {}
    this.onBtnClick = onBtnClick;
  }

  onLoad() {
    this.changeCommandBtnVisibility();
    this.btnStart.onclick = this.onStartClicked.bind(this);
  }

  changeCommandBtnVisibility(hide = true) {
    Array.from(document.querySelectorAll("[name=command]")).forEach((btn) => {
      const fn = hide ? "add" : "remove";
      btn.classList[fn]("unassigned");

      function onClickReset() {}

      btn.onclick = onClickReset;
    });
  }

  configureOnBtnClick(fn) {
    this.onBtnClick = fn;
  }

  async onStartClicked({
    srcElement: {
      innerText
    }
  }) {
    const btnText = innerText
    await this.onBtnClick(btnText)
  }
}
