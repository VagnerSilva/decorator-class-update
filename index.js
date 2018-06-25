
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
   * @param {string} event event name
   * @param {Object} target 
   * @returns {Array}
   * @example
   * // static properties and methods
   * const arr = Clazz.update('my-event', target)
   * arr.forEach(f => f());
   * // instance properties and methods
   * const arr = Clazz.update('my-event', target.prototype)
   * arr.forEach(f => f());
   */
    static watch(event, target) {
        const result = Reflect.getMetadata(`update:${event}`, target) || []
        return result.map(func => func());
    }
}