import { sandbox, cleanup, waitEvent, getSize, checkEventOrders, expectOrders } from "./utils";
import ImReady from "../../src/index";
import { spy } from "sinon";
import { toArray, innerWidth, innerHeight } from "../../src/utils";

describe("Test video", () => {
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
  it("should check there are videos", async () => {
    // Given
    el.innerHTML = `
      <video src="./videos/pano1.mp4" ></video>
      <video src="./videos/pano2.mp4" ></video>
    `;
    const readySpy = spy();
    im.on("ready", readySpy);

    // When
    im.check([el]);
    await waitEvent(im, "ready");

    // Then
    expect(readySpy.calledOnce).to.be.true;
    expect(readySpy.args[0][0].totalCount).to.be.equals(1);
    expect(readySpy.args[0][0].errorCount).to.be.equals(0);
    expect(im.getTotalCount()).to.be.equals(1);
  });
  it("should check that the element(video) is loaded.", async () => {
    // Given
    el.innerHTML = `
      <video src="./videos/pano3.mp4" ></video>
    `;
    // When
    const video = el.querySelector("video");
    im.check([video]);
    const readySpy = spy();
    // default size 300 x 150
    const height1 = innerHeight(video);

    im.on("ready", readySpy);
    await waitEvent(im, "ready");

    // Then
    const height2 = innerHeight(video);
    expect(height1).to.be.equals(150);
    expect(height2).to.be.not.equals(150);
    expect(readySpy.calledOnce).to.be.true;
  });

  it("should check that error event occurs when there are error videos", async () => {
    // Given
    el.innerHTML = `
    <video src="./videos/pano4.mp4" ></video>
    <video src="./videos/ERR.mp4" ></video>
    `;
    const readySpy = spy();
    const errorSpy = spy();

    im.on("ready", readySpy);
    im.on("error", errorSpy);

    // When
    im.check([el]);

    await waitEvent(im, "ready");

    const e = errorSpy.args[0][0];

    // Then
    expect(im.hasError()).to.be.true;
    expect(errorSpy.calledOnce).to.be.true;
    expect(readySpy.calledOnce).to.be.true;

    expect(e.index).to.be.equals(0);
    expect(e.element.tagName).to.be.equals("DIV");
    expect(e.target.getAttribute("src")).to.have.string("ERR");
  });

  it("should check that error event occurs when there are error videos (cache)", async () => {
    // Given
    el.innerHTML = `
    <video src="./videos/pano5.mp4" ></video>
    <video src="./videos/ERR2.mp4" ></video>
    `;
    const readySpy = spy();
    const errorSpy = spy();
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

    for (let i = 0; i < 2; ++i) {
      const e = errorSpy.args[i][0];

      expect(e.index).to.be.equals(0);
      expect(e.element.tagName).to.be.equals("DIV");
      expect(e.target.getAttribute("src")).to.have.string("ERR");
    }
  });
  it("should check that preReady caculate virtual sizes when there are data prefixes", async () => {
    // Given
    el.innerHTML = `
      <video src="./videos/pano6.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
      <video src="./videos/pano7.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
      <video src="./videos/pano8.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
    `;
    // When
    im.check([el]);

    const video = el.querySelectorAll("video");
    await waitEvent(im, "preReady");
    const fakeSizes = toArray(video).map(video => {
      return getSize(video);
    });
    await waitEvent(im, "ready");
    const realSizes = toArray(video).map(video => {
      return getSize(video);
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
    <video src="./videos/pano9.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
    <video src="./videos/pano10.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
    <video src="./videos/pano11.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
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
    <video src="./videos/pano12.mp4" data-skip="true" data-width="100" data-height="100" style="width: 100%;"></video>
    <video src="./videos/pano13.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
    <video src="./videos/pano14.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
    `;
    const readyElementSpy = spy();
    const readySpy = spy();
    const events = checkEventOrders(im);

    im.on("readyElement", readyElementSpy);
    im.on("ready", readySpy);

    // When
    im.check(el.querySelectorAll("video"));

    await waitEvent(im, "ready");

    // Then
    // skip
    expect(events[0].isSkip).to.be.equals(true);
    expect(events[1].isSkip).to.be.equals(true);
    // no skip
    expect(events[2].isSkip).to.be.equals(false);
    expect(readyElementSpy.callCount).to.be.equals(3);
    expect(readySpy.args[0][0].totalCount).to.be.equals(3);
    expect(im.getTotalCount()).to.be.equals(3);
    expectOrders(events, [
      "preReadyElement", "readyElement",
      "preReadyElement", "preReadyElement", "preReady",
      "readyElement", "readyElement", "ready",
    ]);
  });
  it("should check that AutoSizer works when window resize (400 => 600)", async () => {
    // Given
    el.innerHTML = `
    <video src="./videos/pano15.mp4" data-width="100" data-height="100" style="width: 100%;"></video>
  `;

    // When
    im.check([el]);

    const video = el.querySelector("video");

    // maybe 400 x 400
    const size1 = getSize(video);


    // The resize event is fired synchronously.
    el.style.width = "90%";
    window.dispatchEvent(new Event("resize"));

    // maybe 360 x 360
    const size2 = getSize(video);

    await waitEvent(im, "ready");

    // maybe 600 X ???
    const size3 = getSize(video);

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
    <video src="./videos/pano16.mp4" data-fixed="height" data-width="100" data-height="100" style="height: 100%;"></video>
    `;
    // When
    im.check([el]);
    const video = el.querySelector("video");

    // window size 300
    const width1 = innerWidth(video);
    const height1 = innerHeight(video);

    // The resize event is fired synchronously.
    el.style.height = "90%";
    window.dispatchEvent(new Event("resize"));

    // maybe 270 x 270
    const width2 = innerWidth(video);
    const height2 = innerHeight(video);

    await waitEvent(im, "ready");

    // window size 600
    const width3 = innerWidth(video);
    const height3 = innerHeight(video);

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
