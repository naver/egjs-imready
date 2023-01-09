import { spy } from "sinon";
import ImReady from "../../src";
import { sandbox, cleanup, waitEvent, checkEventOrders, expectOrders } from "./utils";

describe("Test Element", () => {
  let el: HTMLElement;
  let im: ImReady;

  beforeEach(() => {
    im = new ImReady();
    el = sandbox("");
    document.body.style.overflow = "hidden";
  });
  afterEach(() => {
    document.body.style.overflow = "visible";
    cleanup();
    im.destroy();
  });
  it("should check that the element is ready", async () => {
    // Given
    const events = checkEventOrders(im);
    const preReadySpy = spy();
    const readySpy = spy();
    im.on("preReady", preReadySpy);
    im.on("ready", readySpy);

    // When
    im.check([el]);

    await waitEvent(im, "ready");

    // Then
    expect(im.getTotalCount()).to.be.equals(1);
    expect(readySpy.calledOnce).to.be.true;
    expect(readySpy.args[0][0].totalCount).to.be.equals(1);
    expect(preReadySpy.calledOnce).to.be.true;
    expect(preReadySpy.args[0][0].isReady).to.be.equals(true);
    expect(preReadySpy.args[0][0].totalCount).to.be.equals(1);

    // readyElement
    expect(events[1].isPreReadyOver).to.be.equals(false);

    expectOrders(events, [
      "preReadyElement", "readyElement",
      "preReady", "ready",
    ]);
  });
  it("should check that the event does not occur if you destroy before ready.", done => {
    // Given
    const readySpy = spy();
    const readyElementSpy = spy();
    const preReadySpy = spy();
    const preReadyElementSpy = spy();

    im.on("ready", readySpy);
    im.on("readyElement", readyElementSpy);
    im.on("preReady", preReadySpy);
    im.on("preReadyElement", preReadyElementSpy);

    // When
    im.check([el]);
    im.destroy();

    // Then
    setTimeout(() => {
      expect(readySpy.callCount).to.be.equal(0);
      expect(readyElementSpy.callCount).to.be.equal(0);
      expect(preReadySpy.callCount).to.be.equal(0);
      expect(preReadyElementSpy.callCount).to.be.equal(0);
      done();
    }, 200);
  });
});
