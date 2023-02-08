import { getSetting } from '@utils/foundry/settings'
import { localize } from '@utils/foundry/localize'

export function renderEffectsPanel(panel: EffectsPanel, html: JQuery) {
    addInstructions(html)
    setEvents(html, panel)
}

function addInstructions(html: JQuery) {
    let instructions = ''
    if (getSetting<boolean>('remove')) instructions += `<p>${localize('remove')}</p>`
    if (getSetting<boolean>('sheet')) instructions += `<p>${localize('sheet')}</p>`
    if (getSetting<boolean>('chat')) instructions += `<p>${localize('chat')}</p>`
    html.find('.instructions').append(instructions)
}

function setEvents(html: JQuery, panel: EffectsPanel) {
    html.find('.effect-item[data-item-id] .icon').each((i, icon) => {
        icon.addEventListener('click', event => onClick(event, panel), true)
        icon.addEventListener('contextmenu', event => onContextMenu(event, panel), true)
    })
}

function onContextMenu(event: Event, panel: EffectsPanel) {
    const sendToChat = (event as MouseEvent).ctrlKey && getSetting('chat')
    const remove = (event as MouseEvent).shiftKey && getSetting('remove')
    if (!sendToChat && !remove) return

    const effect = getEffect(event, panel)
    if (!effect) return

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    if (sendToChat) effect.toMessage()
    else effect.delete()
}

function onClick(event: Event, panel: EffectsPanel) {
    const openSheet = (event as MouseEvent).ctrlKey && getSetting('sheet')
    if (!openSheet) return

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
    return panel.actor?.items.get(id)
}
