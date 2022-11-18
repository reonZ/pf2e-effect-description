import { onPF2eEffectClick, onPF2eEffectRightClick } from './pf2e.js'
import { getSetting, localize } from './utils/foundry.js'

/**
 * @param {JQuery.ClickEvent | JQuery.ContextMenuEvent} event
 * @param {EffectsPanel} panel
 */
function getEffect(event, panel) {
    const target = /** @type {HTMLElement} */ (event.currentTarget)
    const id = /** @type {string} */ (target.dataset.itemId)
    return panel.actor?.items.get(id)
}

/** @param {JQuery} $html */
export function addInstructions($html) {
    let instructions = ''

    if (getSetting('remove')) instructions += `<p>${localize('remove')}</p>`
    if (getSetting('sheet')) instructions += `<p>${localize('sheet')}</p>`
    if (getSetting('chat')) instructions += `<p>${localize('chat')}</p>`

    $html.find('.instructions').append(instructions)
}

/**
 * @param {EffectsPanel} panel
 * @param {JQuery} $html
 */
export function setEvents(panel, $html) {
    const $icons = $html.find('div[data-item-id]')
    const clickFn = /** @param {JQuery.ClickEvent} event */ event => onEffectClick(event, panel)
    const rightClickFn = /** @param {JQuery.ContextMenuEvent} event */ event => onEffectRightClick(event, panel)

    $icons.off('click contextmenu')
    $icons.on('click', clickFn)
    $icons.on('contextmenu', rightClickFn)
}

/**
 * @param {JQuery.ClickEvent} event
 * @param {EffectsPanel} panel
 */
async function onEffectClick(event, panel) {
    if (event.ctrlKey && getSetting('sheet')) getEffect(event, panel)?.sheet?.render(true)
    else onPF2eEffectClick(event, panel)
}

/**
 * @param {JQuery.ContextMenuEvent} event
 * @param {EffectsPanel} panel
 */
function onEffectRightClick(event, panel) {
    if (event.ctrlKey && getSetting('chat')) getEffect(event, panel)?.toChat()
    else if (event.shiftKey && getSetting('remove')) getEffect(event, panel)?.delete()
    else onPF2eEffectRightClick(event, panel)
}
