import { MutableRefObject, Ref, RefCallback, useEffect, useState } from "react";
import ImReady from "@egjs/imready";
import { ImReadyProps, ImReadyValue } from "./types";

/**
 * React hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 react hook.
 * @memberof ReactImReady
 * @param - React ImReady's props </ko>React ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/react-imready";
 *
 * function App() {
 *   const {
 *         register,
 *         isReady,
 *         isPreReady,
 *         preReadyCount,
 *         readyCount,
 *         totalCount,
 *     } = useImReady({
 *         selector: "img",
 *     });
 *     // &lt;div ref={register()}&gt;&lt;/div&gt;
 * }
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


    const children: HTMLElement[] = [];
    const [preReadyCount, setPreReadyCount] = useState(0);
    const [readyCount, setReadyCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [totalErrorCount, setTotalErrorCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isPreReady, setIsPreReady] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isPreReadyOver, setIsPreReadyOver] = useState(false);

    function register<T extends HTMLElement>(ref?: Ref<T>) {
        return (instance: T | null) => {
            if (instance) {
                children.push(instance);
            }
            if (!ref) {
                return;
            }
            const refType = typeof ref;

            if (refType === "function") {
                (ref as RefCallback<T>)(instance);
            } else {
                (ref as MutableRefObject<T | null>).current = instance;
            }
        };
    }

    useEffect(() => {
        const im = new ImReady(options);

        let checkedElements = children;
        if (selector) {
            checkedElements = checkedElements.reduce((prev, cur) => {
                return [...prev, ...cur.querySelectorAll<HTMLElement>(selector)];
            }, [] as HTMLElement[]);
;        }
        im.check(checkedElements).on("error", e => {
            if (useError) {
                setHasError(true);
                setErrorCount(e.errorCount);
                setTotalErrorCount(e.totalErrorCount);
            }
        }).on("preReadyElement", e => {
            if (usePreReadyElement) {
                setPreReadyCount(e.preReadyCount);
            }
        }).on("readyElement", e => {
            if (useReadyElement) {
                setReadyCount(e.readyCount);
                setIsPreReadyOver(e.isPreReadyOver);
            }
        }).on("preReady", () => {
            if (usePreReady) {
                setIsPreReady(true);
            }
        }).on("ready", () => {
            if (useReady) {
                setIsReady(true);
            }
        });
        setPreReadyCount(0);
        setReadyCount(0);
        setTotalErrorCount(0);
        setErrorCount(0);
        setTotalCount(im.getTotalCount());
        setIsReady(false);
        setIsPreReady(false);
        setHasError(false);
        setIsPreReadyOver(false);

        return () => {
            im.destroy();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        preReadyCount,
        readyCount,
        totalCount,
        errorCount,
        totalErrorCount,
        isPreReady,
        isReady,
        hasError,
        isPreReadyOver,
        register,
    };
}
