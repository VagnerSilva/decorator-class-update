
export class UpdateClass {

    /**
     * @param {string} event event name
     * @param {Object} target
     * @param {function} enhancer 
     * @returns {function}
     * @example
     * // static properties and methods
     * Clazz.subscribe(`my-event`, target,()=>{});
     * // unSubscribe
     * Clazz.subscribe(target,()=>{})();
     * // unSubscribe
     * const unSubscribe = Clazz.subscribe(target,()=>{});
     * unSubscribe();
     */
    static subscribe(event, target, enhancer) {


        let funcs = Reflect.getMetadata(`update:${event}`, target);
        if (!funcs) {
            Reflect.defineMetadata(`update:${event}`, funcs = [], target);
        }
        funcs.push(enhancer);

        return () => {
            funcs = funcs.filter(f => f !== enhancer);
        }

    }

    /**
     * Observe if decorator method was used and returns a list with anything
     * sent by the UpdateClass.subscriber method
   * @param {string} event event name
   * @param {Object} target 
   * @returns {Array}
   * @example
   * const arr = Clazz.watch('my-event', target)
   * // out [anything]
   */
    static watch(event, target) {
        const result = Reflect.getMetadata(`update:${event}`, target) || []
        return result.map(func => func());
    }
}