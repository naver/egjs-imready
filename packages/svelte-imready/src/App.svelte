<script>
  import { useImReady } from "./svelte-imready/useImReady.ts";

  const {
    register,
    readyCount,
    totalCount,
    errorCount,
    isReady,
  } = useImReady({
    selector: "video",
  });
</script>

<style>

</style>
<div class="App">
  <header class="App-header">
    <p>isReady: <span id="isReady">{$isReady ? "I'm Ready" : "Loading..."}</span></p>
    <p>progress: <span id="readyCount">{$readyCount}</span> / <span id="totalCount">{$totalCount}</span></p>
    <p>errors: <span id="readyCount">{$errorCount}</span></p>
  </header>
  <div class="images" use:register>
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg" alt="img" data-width="1280" data-height="853"
      style={{ width: "1280px", "height": "853px" }} />
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/2.jpg" alt="img" data-width="1280" data-height="853"
      style={{ width: "1280px", "height": "853px" }} />
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/3.jpg" alt="img" style={{ width: "1280px", "height": "853px" }} />
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg" alt="img" data-width="1280" data-height="853"
      style={{ width: "1280px", "height": "853px" }} />
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/5e.jpg" alt="img" />
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/6.jpg" alt="img" data-width="1280" data-height="853" />
    <div data-width class="fancy">
      <div>
        <img src="https://naver.github.io/egjs-infinitegrid/assets/image/7.jpg" alt="img" data-width="1280" data-height="853" />
      </div>
    </div>
    <video src="https://naver.github.io/egjs-view360/examples/img/equi.mp4"></video>
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/8ㄸ.jpg" alt="img" data-width="1280" data-height="853" />
    <img src="https://naver.github.io/egjs-infinitegrid/assets/image/8.jpg" alt="img" data-width="1280" data-height="853" loading="lazy"/>
  </div>
</div>
