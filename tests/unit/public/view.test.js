import { jest, expect, describe, test } from "@jest/globals";
import { JSDOM } from "jsdom";
import View from "../../../public/controller/js/view.js";

describe("#View - test suite for presentation layer", () => {
  const dom = new JSDOM();
  global.document = dom.window.document;
  global.window = dom.window;

  function makeBtnElement(
    { text, classList } = {
      text: "",
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    }
  ) {
    return {
      onclick: jest.fn(),
      classList,
      innerText: test,
    };
  }

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();

    jest.spyOn(document, "getElementById").mockReturnValue(makeBtnElement());
  });

  test("#changeCommandBtnVisibility - given hide=true it should add unassigned class and reset onclick", () => {
    const view = new View();
    const btn = makeBtnElement();
    jest.spyOn(document, "querySelectorAll").mockReturnValue([btn]);

    view.changeCommandBtnVisibility();

    expect(btn.classList.add).toHaveBeenCalledWith("unassigned");
    expect(btn.onclick.name).toStrictEqual("onClickReset");
    expect(() => btn.onclick()).not.toThrow();
  });

  test("#changeCommandBtnVisibility - given hide=false it should remove unassigned class and reset onclick", () => {
    const view = new View();
    const btn = makeBtnElement();
    jest.spyOn(document, "querySelectorAll").mockReturnValue([btn]);

    view.changeCommandBtnVisibility(false);

    expect(btn.classList.add).not.toHaveBeenCalled();
    expect(btn.classList.remove).toHaveBeenCalledWith("unassigned");
    expect(btn.onclick.name).toStrictEqual("onClickReset");
    expect(() => btn.onclick()).not.toThrow();
  });
  
  test("#onLoad", () => {
    const view = new View();
    jest.spyOn(
      view,
      view.changeCommandBtnVisibility.name,
    ).mockReturnValue();

    view.onLoad();

    expect(view.changeCommandBtnVisibility).toHaveBeenCalled();
  });
});
