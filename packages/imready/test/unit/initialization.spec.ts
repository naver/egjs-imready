import { spy } from "sinon";
import ImReady from "../../src";
import { cleanup, waitEvent } from "./utils";

describe("Initialization", () => {
  // let el: HTMLElement;
  let im: ImReady;

  beforeEach(() => {
    im = new ImReady();
    // el = sandbox("");
  });
  afterEach(() => {
    im.destroy();
    cleanup();
  });

  it("should check no item", async () => {
    // Given
    const readySpy = spy();
    im.on("ready", readySpy);

    // When
    im.check([]);


    await waitEvent(im, "ready");

    // Then
    expect(readySpy.calledOnce).to.be.true;
    expect(readySpy.args[0][0].totalCount).to.be.equals(0);
    expect(im.getTotalCount()).to.be.equals(0);
  });
});
