import MODULE_ID from './module.js'

/**
 * @param {string} key
 * @param {object} [data]
 */
export function localize(key, data) {
    key = `${MODULE_ID}.${key}`
    if (data) return game.i18n.format(key, data)
    return game.i18n.localize(key)
}
