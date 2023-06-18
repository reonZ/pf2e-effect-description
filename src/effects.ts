import { getSetting } from '@utils/foundry/settings'
import { localize } from '@utils/foundry/localize'

export function renderEffectsPanel(panel: EffectsPanel, html: JQuery) {
    addInstructions(panel, html)
    setEvents(html, panel)
}

function addInstructions(panel: EffectsPanel, html: JQuery) {
    const effectPanels = html.find('.effect-item').toArray()

    const remove = getSetting<boolean>('remove') ? `<p>${localize('remove')}</p>` : ''
    const sheet = getSetting<boolean>('sheet') ? `<p>${localize('sheet')}</p>` : ''

    for (const effectPanel of effectPanels) {
        const id = effectPanel.dataset.itemId as string
        const effect = panel.actor?.items.get(id) as Embedded<EffectPF2e>
        if (!effect) continue

        let instructions = ''
        if (!effect.isLocked && effect.badge && effect.badge.type === 'counter') instructions += remove
        instructions += sheet

        effectPanel.querySelector('.instructions')!.insertAdjacentHTML('beforeend', instructions)
    }
}

function setEvents(html: JQuery, panel: EffectsPanel) {
    html.find('.effect-item[data-item-id] .icon').each((i, icon) => {
        icon.addEventListener('click', event => onClick(event, panel), true)
        icon.addEventListener('contextmenu', event => onContextMenu(event, panel), true)
    })
}

function onContextMenu(event: Event, panel: EffectsPanel) {
    if ((!(event as MouseEvent).shiftKey && !(event as MouseEvent).ctrlKey) || !getSetting('remove')) return

    const effect = getEffect(event, panel)
    if (!effect || effect.isLocked || !effect.badge || effect.badge.type !== 'counter') return

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    effect.delete()
}

function onClick(event: Event, panel: EffectsPanel) {
    if (!(event as MouseEvent).ctrlKey || !getSetting('sheet')) return

    const effect = getEffect(event, panel)
    if (!effect) return

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    effect.sheet.render(true)
}

function getEffect(event: Event, panel: EffectsPanel) {
    const target = (event as MouseEvent).currentTarget as HTMLElement
    const effect = target.closest('.effect-item[data-item-id]') as HTMLElement
    const id = effect.dataset.itemId!
    return panel.actor?.items.get(id) as Embedded<EffectPF2e> | undefined
}
