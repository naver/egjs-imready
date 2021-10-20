import ImReady from "@egjs/imready";
import { onBeforeUnmount, onMounted, reactive, Ref, ref } from "@vue/composition-api";
import { ImReadyProps, ImReadyValue } from "./types";


/**
 * Vue hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Vue hook.
 * @memberof Vue2ImReady
 * @param - Vue ImReady's props <ko> Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/vue2-imready";
 *
 * setup() {
 *   const im = useImReady({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *      container: im.register(),
 *   }
 * }
 * // {{im.readyCount}}
 * // &lt;div v-bind:ref="container"&gt;&lt;/div&gt;
 * ```
 */
export function useImReady(props: Partial<ImReadyProps> = {}): ImReadyValue {
  const {
    usePreReady = true,
    usePreReadyElement = true,
    useReady = true,
    useReadyElement = true,
    useError = true,
    selector = "",
    ...options
  } = props;

  const refs: Array<Ref<HTMLElement | null | undefined>> = [];
  const state = reactive({
    preReadyCount: 0,
    readyCount: 0,
    errorCount: 0,
    totalErrorCount: 0,
    totalCount: 0,
    isPreReady: false,
    isReady: false,
    isPreReadyOver: false,
    hasError: false,
    register<T extends HTMLElement>(refOption: Ref<T | null | undefined> = ref()): Ref<T | null | undefined> {
      refs.push(refOption);

      return refOption;
    },
  });
  const imRef = ref<ImReady>();

  onMounted(() => {
    const im = new ImReady(options);

    imRef.value = im;

    let checkedElements = refs.map((childRef) => childRef.value!);

    if (selector) {
      checkedElements = checkedElements.reduce((prev, cur) => {
        return [...prev, ...cur.querySelectorAll<HTMLElement>(selector)];
      }, [] as HTMLElement[]);
    }


    im.check(checkedElements)
      .on("error", e => {
        if (useError) {
          state.hasError = true;
          state.errorCount = e.errorCount;
          state.totalErrorCount = e.totalErrorCount;
        }
      })
      .on("preReadyElement", e => {
        if (usePreReadyElement) {
          state.preReadyCount = e.preReadyCount;
        }
      })
      .on("readyElement", e => {
        if (useReadyElement) {
          state.readyCount = e.readyCount;
          state.isPreReadyOver = e.isPreReadyOver;
        }
      })
      .on("preReady", () => {
        if (usePreReady) {
          state.isPreReady = true;
        }
      })
      .on("ready", () => {
        if (useReady) {
          state.isReady = true;
        }
      });

    console.log(im.getTotalCount());
    state.preReadyCount = 0;
    state.readyCount = 0;
    state.errorCount = 0;
    state.totalErrorCount = 0;
    state.totalCount = im.getTotalCount();
    state.isReady = false;
    state.isPreReady = false;
    state.hasError = false;
    state.isPreReadyOver = false;
  });
  onBeforeUnmount(() => {
    imRef.value?.destroy();
  });

  return state;
}
