import { isOfClass } from './utils/object.js'
/**
 * @param {ItemPF2e | undefined} effect
 * @returns {effect is AbstractEffectPF2e}
 */
function isAbstractEffectPF2e(effect) {
    if (!effect) return false
    return isOfClass(effect, 'AbstractEffectPF2e')
}

/**
 * @param {JQuery.ClickEvent} event
 * @param {EffectsPanel} panel
 */
export async function onPF2eEffectClick(event, panel) {
    const $target = $(event.currentTarget)
    if ($target.attr('data-locked')) return

    const effect = panel.actor?.items.get($target.attr('data-item-id') ?? '')
    if (isAbstractEffectPF2e(effect)) await effect.increase()
}

/**
 * @param {JQuery.ContextMenuEvent} event
 * @param {EffectsPanel} panel
 */
export async function onPF2eEffectRightClick(event, panel) {
    const $target = $(event.currentTarget)
    if ($target.attr('data-locked')) return

    const effect = panel.actor?.items.get($target.attr('data-item-id') ?? '')
    if (isAbstractEffectPF2e(effect)) await effect.decrease()
    else panel.refresh()
}
