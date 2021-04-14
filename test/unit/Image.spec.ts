import { sandbox, cleanup, waitEvent, getSize, checkEventOrders, expectOrders, waitFor } from "./utils";
import ImReady from "../../src/index";
import { spy } from "sinon";
import { toArray, innerWidth, innerHeight } from "../../src/utils";

describe("Test image", () => {
  let el: HTMLElement;
  let im: ImReady;

  beforeEach(() => {
    im = new ImReady();
    el = sandbox("");
    document.body.style.overflow = "hidden";
  });
  afterEach(() => {
    document.body.style.overflow = "visible";
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
    expect(im.hasError()).to.be.true;
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
    // no error
    const hasError1 = im.hasError();

    await waitEvent(im, "ready");

    // occur error
    const hasError2 = im.hasError();

    im.check([el]);

    // no error
    const hasError3 = im.hasError();

    await waitEvent(im, "ready");

    // occur error
    const hasError4 = im.hasError();

    // Then

    expect(hasError1).to.be.false;
    expect(hasError2).to.be.true;
    expect(hasError3).to.be.false;
    expect(hasError4).to.be.true;
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
  it("should checks to ignore even if there are images in the skip element.", async () => {
    // Given
    el.setAttribute("data-skip", "true");
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/19.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/20.jpg" data-width="100" data-height="100" style="width: 100%;"/>
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/21.jpg" data-width="100" data-height="100" style="width: 100%;"/>
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
    im.check([el]);

    await waitEvent(im, "ready");

    // Then
    expect(readyElementSpy.callCount).to.be.equals(1);
    expect(readySpy.args[0][0].totalCount).to.be.equals(1);
    expect(preReadyElementSpy.callCount).to.be.equals(1);
    expect(preReadySpy.args[0][0].totalCount).to.be.equals(1);
    expect(im.getTotalCount()).to.be.equals(1);
    // skip
    expect(events[0].isSkip).to.be.equals(true);
    expect(events[1].isSkip).to.be.equals(true);
    expectOrders(events, [
      "preReadyElement", "readyElement",
      "preReady", "ready",
    ]);
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
    expect(readyElementSpy.callCount).to.be.equals(3);
    expect(readySpy.args[0][0].totalCount).to.be.equals(3);
    expect(preReadyElementSpy.callCount).to.be.equals(3);
    expect(preReadySpy.args[0][0].totalCount).to.be.equals(3);
    expect(im.getTotalCount()).to.be.equals(3);

    // skip
    expect(events[0].isSkip).to.be.equals(true);
    expect(events[1].isSkip).to.be.equals(true);
    // no skip
    expect(events[2].isSkip).to.be.equals(false);
    // readyElement
    expect(events[6].isPreReadyOver).to.be.equals(true);
    expectOrders(events, [
      "preReadyElement", "readyElement",
      "preReadyElement", "preReadyElement", "preReady",
      "readyElement", "readyElement", "ready",
    ]);
  });
  it("should check that call preReady if include the loading img.", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/15.jpg" loading="lazy"/>
    `;

    const img = el.querySelector("img");

    // inject loading attribute for not supported browser
    img.setAttribute("loading", "lazy");
    Object.defineProperty(img, "loading", {
      value: "lazy",
    });

    const events = checkEventOrders(im);

    // When
    im.check([el]);

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
  it("should check that call preReady if include the loading img and not loading img.", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/23.jpg" loading="lazy"/>
      <img />
    `;

    const imgs = el.querySelectorAll("img");

    // inject loading attribute for not supported browser
    imgs[0].setAttribute("loading", "lazy");
    Object.defineProperty(imgs[0], "loading", {
      value: "lazy",
    });
    // preReady(loading) => (preReady => ready)(not loading) => ready(loading)
    // Complete a little faster than the network.
    setTimeout(() => {
      Object.defineProperty(imgs[1], "naturalWidth", {
        value: 1920,
      });
      Object.defineProperty(imgs[1], "naturalHeight", {
        value: 1080,
      });
      Object.defineProperty(imgs[1], "clientWidth", {
        value: 1920,
      });
      Object.defineProperty(imgs[1], "clientHeight", {
        value: 1080,
      });
      imgs[1].dispatchEvent(new Event("load"));
    }, 30);


    const events = checkEventOrders(im);
    const preReadyEvent = waitEvent(im, "preReady");
    const readyEvent = waitEvent(im, "ready");

    // When
    im.check([el]);

    await preReadyEvent;
    // loading element1 is preReady
    const element1Size1 = getSize(imgs[0]);
    // no loading element2 is also preReady
    const element2Size1 = getSize(imgs[1]);

    await readyEvent;
    const element1Size2 = getSize(imgs[0]);
    const element2Size2 = getSize(imgs[1]);

    // Then
    expect(element1Size1).to.be.deep.equals([0, 0]);
    expect(element2Size1).to.be.not.deep.equals([0, 0]);
    expect(element1Size2).to.be.not.deep.equals([0, 0]);
    // It is the same because preReady and ready occur at the same time.
    expect(element2Size2).to.be.deep.equals(element2Size1);
    // preReadyElement
    expect(events[0].hasLoading).to.be.equals(true);
    // preReady
    expect(events[1].hasLoading).to.be.equals(true);
    expectOrders(events, [
      "preReadyElement", "preReady", "readyElement", "ready",
    ]);
  });
  it("should check that call preReady if include the loading attribute.", async () => {
    // Given
    el.innerHTML = `
      <img src="https://naver.github.io/egjs-infinitegrid/assets/image/18.jpg" loading="lazy"/>
    `;

    const img = el.querySelector("img");

    // inject loading attribute for not supported browser
    img.setAttribute("loading", "lazy");
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

    // The resize event is fired synchronously.
    el.style.width = "90%";
    window.dispatchEvent(new Event("resize"));

    // maybe 360 x 360
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
    expect(size2[0]).to.be.equals(size3[0]);
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

    // The resize event is fired synchronously.
    el.style.height = "90%";
    window.dispatchEvent(new Event("resize"));

    // maybe 270 x 270
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
  it("should check whether the image of empty src is checked even if it is complete", async () => {
    // Given
    el.innerHTML = `<img />`;

    const img = el.querySelector("img");

    Object.defineProperty(img, "complete", {
      value: true,
    });
    const events = checkEventOrders(im);

    // When
    im.check([el]);

    // The ready event does not occur immediately.
    await waitFor(100);

    const isReady1 = im.isReady();
    img.src = "https://naver.github.io/egjs-infinitegrid/assets/image/22.jpg";

    await waitEvent(im, "ready");
    const isReady2 = im.isReady();

    // Then
    expect(isReady1).to.be.false;
    expect(isReady2).to.be.true;
    expectOrders(events, [
      "preReadyElement", "preReady",
      "readyElement", "ready",
    ]);
  });
  it("should check that the ready event does not occur if you destroy before preReady.", async () => {
    // Given
    el.innerHTML = `
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-width="1920" data-height="1080"/>
    `;
    const readySpy = spy();

    const preReadySpy = spy();


    im.on("preReady", preReadySpy);
    im.on("ready", readySpy);

    // When
    im.check([el.querySelector("img")]);
    im.destroy();

    await waitFor(100);

    // Then
    expect(readySpy.callCount).to.be.equal(0);
    expect(preReadySpy.callCount).to.be.equal(0);
  });
});
