import ImReady from '@egjs/imready';
import { onBeforeUnmount, onMounted, reactive, Ref, ref } from 'vue'
import { ImReadyProps } from './types'

export function useImReady(props: Partial<ImReadyProps> = {}) {
  const {
    usePreReady = true,
    usePreReadyElement = true,
    useReady = true,
    useReadyElement = true,
    useError = true,
    selector = "",
    ...options
  } = props;

  const children: HTMLElement[] = [];
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
  });
  const imRef = ref<ImReady>();

  function register<T extends HTMLElement>(ref?: Ref<T> | ((el: T) => any)) {
    return (instance: T) => {
      if (instance) {
        children.push(instance);
      }
      if (!ref) {
        return;
      }
      if (typeof ref === "function") {
        ref(instance);
      } else {
        ref.value = instance;
      }
    };
  }

  onMounted(() => {
    const im = new ImReady(options);

    imRef.value = im;

    let checkedElements = children;

    if (selector) {
      checkedElements = checkedElements.reduce((prev, cur) => {
        return [...prev, ...cur.querySelectorAll<HTMLElement>(selector)];
      }, [] as HTMLElement[]);
    }
    console.log(children, checkedElements);
    im.check(checkedElements).on("error", e => {
      if (useError) {
        state.hasError = true;
        state.errorCount = e.errorCount;
        state.totalErrorCount = e.totalErrorCount;
      }
    }).on("preReadyElement", e => {
      if (usePreReadyElement) {
        state.preReadyCount = e.preReadyCount;
      }
    }).on("readyElement", e => {
      if (useReadyElement) {
        state.readyCount = e.readyCount;
        state.isPreReadyOver = e.isPreReadyOver;
      }
    }).on("preReady", () => {
      if (usePreReady) {
        state.isPreReady = true;
      }
    }).on("ready", () => {
      if (useReady) {
        state.isReady = true;
      }
    });
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

  return {
    state,
    register,
  };
}
