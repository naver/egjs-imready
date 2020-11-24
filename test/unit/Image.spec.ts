import { sandbox, cleanup, waitEvent, waitFor, getSize, checkEventOrders, expectOrders } from "./utils";
import ImReady from "../../src/index";
import { spy } from "sinon";
import { toArray, innerWidth, innerHeight } from "../../src/utils";

declare const viewport: any;

describe("Test image", () => {
  let el: HTMLElement;
  let im: ImReady;

  beforeEach(() => {
    im = new ImReady();
    el = sandbox("");
  });
  afterEach(() => {
    im.destroy();
    cleanup();
  });
  it("should check there are images", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/2.jpg"/>
    `;
    const readySpy = spy();
    const preReadySpy = spy();

    im.on("ready", readySpy);
    im.on("preReady", preReadySpy);

    // When
    im.check([el]);
    await waitEvent(im, "ready");

    // Then
    expect(readySpy.calledOnce).to.be.true;
    expect(readySpy.args[0][0].totalCount).to.be.equals(1);
    expect(preReadySpy.calledOnce).to.be.true;
    expect(preReadySpy.args[0][0].totalCount).to.be.equals(1);
    expect(im.getTotalCount()).to.be.equals(1);
  });
  it("should check that the element(image) is loaded.", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/3.jpg"/>
    `;
    // When
    const img = el.querySelector("img");
    im.check([img]);
    const readySpy = spy();
    const height1 = innerHeight(img);

    im.on("ready", readySpy);
    await waitEvent(im, "ready");

    // Then
    const height2 = innerHeight(img);
    expect(height1).to.be.equals(0);
    expect(height2).to.be.not.equals(0);
    expect(readySpy.calledOnce).to.be.true;
  });
  it("should check that error event occurs when there are error images", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg"/>
      <img src="https://ERR"/>
      <img src="https://ERR"/>
    `;
    const preReadySpy = spy();
    const readySpy = spy();
    const errorSpy = spy();

    im.on("preReady", preReadySpy);
    im.on("ready", readySpy);
    im.on("error", errorSpy);

    // When
    im.check([el]);

    await waitEvent(im, "ready");

    const e = errorSpy.args[0][0];

    // Then
    expect(errorSpy.callCount).to.be.equals(2);
    expect(errorSpy.args[0][0].errorCount).to.be.equals(1);
    expect(errorSpy.args[0][0].totalErrorCount).to.be.equals(1);
    expect(errorSpy.args[1][0].errorCount).to.be.equals(1);
    expect(errorSpy.args[1][0].totalErrorCount).to.be.equals(2);
    expect(readySpy.calledOnce).to.be.true;
    expect(readySpy.args[0][0].errorCount).to.be.equals(1);
    expect(readySpy.args[0][0].totalErrorCount).to.be.equals(2);
    expect(preReadySpy.calledOnce).to.be.true;

    expect(e.index).to.be.equals(0);
    expect(e.element.tagName).to.be.equals("DIV");
    expect(e.target.getAttribute("src")).to.have.string("ERR");
  });

  it("should check that error event occurs when there are error images (cache)", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/5.jpg"/>
      <img src="https://ERR2"/>
    `;
    const readySpy = spy();
    const errorSpy = spy();
    const preReadySpy = spy();

    im.on("preReady", preReadySpy);
    im.on("ready", readySpy);
    im.on("error", errorSpy);
    // When

    im.check([el]);

    await waitEvent(im, "ready");

    im.check([el]);

    await waitEvent(im, "ready");
    // Then
    expect(errorSpy.callCount).to.be.equals(2);
    expect(readySpy.callCount).to.be.equals(2);
    expect(preReadySpy.callCount).to.be.equals(2);

    for (let i = 0; i < 2; ++i) {
      const e = errorSpy.args[i][0];

      expect(e.index).to.be.equals(0);
      expect(e.element.tagName).to.be.equals("DIV");
      expect(e.target.getAttribute("src")).to.have.string("ERR");
      expect(e.errorCount).to.be.equals(1);
      expect(e.totalErrorCount).to.be.equals(1);
    }
  });
  it("should check that preReady caculate virtual sizes when there are data prefixes", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/6.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/7.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/8.jpg" data-width="100" data-height="100" style="width: 100%;"/>
    `;
    // When
    im.check([el]);

    await waitEvent(im, "preReady");
    const fakeSizes = toArray(el.querySelectorAll("img")).map(img => {
      return getSize(img);
    });
    await waitEvent(im, "ready");
    const realSizes = toArray(el.querySelectorAll("img")).map(img => {
      return getSize(img);
    });

    // Then
    fakeSizes.forEach(size => {
      expect(size[0]).to.be.equals(size[1]);
    });
    realSizes.forEach(size => {
      expect(size[0]).to.be.not.equals(size[1]);
    });
  });
  it("should check that AutoSizer works when the element itself has data prefixes", async () => {
    // Given
    el.setAttribute("data-width", "100");
    el.setAttribute("data-height", "100");
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/9.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/10.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/11.jpg" data-width="100" data-height="100" style="width: 100%;"/>
    `;
    // When
    im.check([el]);

    await waitEvent(im, "preReady");
    // 100 x 100
    const size1 = getSize(el);

    await waitEvent(im, "ready");
    // ? X ?
    const size2 = getSize(el);


    // Then
    expect(size1[0]).to.be.equals(size1[1]);
    expect(size2[0]).to.be.not.equals(size2[1]);
  });

  it("should check that ignored when the property include a skip attribute.", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/12.jpg" data-skip="true" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/13.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/14.jpg" data-width="100" data-height="100" style="width: 100%;"/>
    `;
    const readyElementSpy = spy();
    const readySpy = spy();
    const preReadyElementSpy = spy();
    const preReadySpy = spy();
    const events = checkEventOrders(im);

    im.on("preReadyElement", preReadyElementSpy);
    im.on("preReady", preReadySpy);
    im.on("readyElement", readyElementSpy);
    im.on("ready", readySpy);

    // When
    im.check(el.querySelectorAll("img"));

    await waitEvent(im, "ready");

    // Then
    expect(readyElementSpy.callCount).to.be.equals(2);
    expect(readySpy.args[0][0].totalCount).to.be.equals(2);
    expect(preReadyElementSpy.callCount).to.be.equals(2);
    expect(preReadySpy.args[0][0].totalCount).to.be.equals(2);
    expect(im.getTotalCount()).to.be.equals(2);

    // readyElement
    expect(events[4].isPreReadyOver).to.be.equals(true);
    expectOrders(events, [
      "preReadyElement", "preReadyElement", "preReady",
      "readyElement", "readyElement", "ready",
    ]);
  });
  it("should check that call preReady if include the loading attribute.", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/15.jpg" loading="lazy"/>
    `;

    const img = el.querySelector("img");

    // inject loading attribute for not supported browser
    Object.defineProperty(img, "loading", {
      value: "lazy",
    });

    const events = checkEventOrders(im);

    // When
    im.check([img]);

    await waitEvent(im, "preReady");
    const loadingSize = getSize(img);

    await waitEvent(im, "ready");


    // Then
    expect(loadingSize).to.be.deep.equals([0, 0]);
    // preReadyElement
    expect(events[0].hasLoading).to.be.equals(true);
    // preReady
    expect(events[1].hasLoading).to.be.equals(true);
    expectOrders(events, [
      "preReadyElement", "preReady", "readyElement", "ready",
    ]);
  });
  it("should check that AutoSizer works when window resize (400 => 600)", async () => {
    // Given
    el.innerHTML = `
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/16.jpg" data-width="100" data-height="100" style="width: 100%;"/>
  `;

    // When
    im.check([el]);

    const img = el.querySelector("img");

    // maybe 400 x 400
    const size1 = getSize(img);

    viewport.set(600, 400);
    // When the network state is too early, an finish event occurs in an instant.
    await waitFor(60);

    // maybe 600 x 600
    const size2 = getSize(img);

    await waitEvent(im, "ready");

    // maybe 600 X ???
    const size3 = getSize(img);

    // Then
    // preReady (ratio 1:1)
    expect(size1[0]).to.be.equals(size1[1]);

    // resize 400 => 600
    expect(size2[0]).to.be.equals(size2[1]);
    expect(size1[1]).to.be.not.equals(size2[1]);

    // ready
    expect(size2[0]).to.be. equals(size3[0]);
    expect(size2[1]).to.be.not.equals(size3[1]);
  });
  it("should check that AutoSizer works when data-fixed='height' and window height (400 => 600)", async () => {
    // Given
    el.style.position = "absolute";
    el.style.width = "100%";
    el.style.height = "100%";
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/17.jpg" data-fixed="height" data-width="100" data-height="100" style="height: 100%;"/>
    `;
    // When
    im.check([el]);
    const img = el.querySelector("img");

    // window size 300
    const width1 = innerWidth(img);
    const height1 = innerHeight(img);

    viewport.set(400, 600);
    // When the network state is too early, an finish event occurs in an instant.
    await waitFor(60);
    // window size 600
    const width2 = innerWidth(img);
    const height2 = innerHeight(img);

    await waitEvent(im, "ready");

    // window size 600
    const width3 = innerWidth(img);
    const height3 = innerHeight(img);

    // Then
    // preReady (ratio 1:1)
    expect(width1).to.be.equals(height1);

    // resize
    expect(width2).to.be.equals(height2);
    expect(width1).to.be.not.equals(width2);

    // ready
    expect(height2).to.be.equals(height3);
    expect(width2).to.be.not.equals(width3);
  });
});
