/**
 * @param {object} obj
 * @param {string} className
 */
export function isOfClass(obj, className) {
    while ((obj = /** @type {object} */ (Reflect.getPrototypeOf(obj)))) {
        if (obj.constructor.name === className) return true
    }
    return false
}
