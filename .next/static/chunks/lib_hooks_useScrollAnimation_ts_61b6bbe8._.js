(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/hooks/useScrollAnimation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollAnimation",
    ()=>useScrollAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useScrollAnimation(options) {
    _s();
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollAnimation.useEffect": ()=>{
            const element = elementRef.current;
            if (!element) return;
            const observer = new IntersectionObserver({
                "useScrollAnimation.useEffect": (param)=>{
                    let [entry] = param;
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (options === null || options === void 0 ? void 0 : options.triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!(options === null || options === void 0 ? void 0 : options.triggerOnce)) {
                        setIsVisible(false);
                    }
                }
            }["useScrollAnimation.useEffect"], {
                threshold: (options === null || options === void 0 ? void 0 : options.threshold) || 0.1,
                rootMargin: (options === null || options === void 0 ? void 0 : options.rootMargin) || "0px"
            });
            observer.observe(element);
            return ({
                "useScrollAnimation.useEffect": ()=>{
                    observer.disconnect();
                }
            })["useScrollAnimation.useEffect"];
        }
    }["useScrollAnimation.useEffect"], [
        options === null || options === void 0 ? void 0 : options.threshold,
        options === null || options === void 0 ? void 0 : options.rootMargin,
        options === null || options === void 0 ? void 0 : options.triggerOnce
    ]);
    return {
        ref: elementRef,
        isVisible
    };
}
_s(useScrollAnimation, "kj0+AkzNuhJENTgfnnAkIQJQPhA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_hooks_useScrollAnimation_ts_61b6bbe8._.js.map