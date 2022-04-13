// right filter sidebar toggle
const filterSidebarElement = () => document.querySelector('#sidebar')
// left menu sidebar toggle with menu button
const menuTogglerElement = () => document.querySelector('#utility_nav')
const menuWrapperElement = () => document.querySelector('#tabs')
// nested menu items toggle
const nestedMenuItem = () => document.querySelector('#tabs .has_nested')

const menuWrapperOpenedClass = "tabs_open"

function toggleSidebar(event) {
  const insideSection = document.querySelector('#filters_sidebar_section')
  if (!(event.target === insideSection || insideSection.contains(event.target))) {
    filterSidebarElement().classList.toggle('sidebar_open')
  }
}

function toggleMenu(event) {
  const currentUser = document.querySelector('#current_user')
  const logout = document.querySelector('#logout')
  const forbiddenLinks = event.target === logout ||
    logout.contains(event.target) ||
    event.target === currentUser ||
    currentUser.contains(event.target)
  if (!forbiddenLinks) {
    menuWrapperElement().classList.toggle(menuWrapperOpenedClass)
  }
}

function closeMenu(event) {
  const forbiddenLinks = event.target === menuWrapperElement ||
    menuWrapperElement().contains(event.target) ||
    event.target === menuTogglerElement() ||
    menuTogglerElement().contains(event.target)
  if (menuWrapperElement().classList.contains(menuWrapperOpenedClass) && !forbiddenLinks) {
    menuWrapperElement().classList.remove(menuWrapperOpenedClass)
  }
}

function toggleNestedMenu(event) {
  event.stopPropagation()
  nestedMenuItem.classList.toggle('open')
}

const elementClickEvents = [
  [filterSidebarElement, toggleSidebar],
  [menuTogglerElement, toggleMenu],
  [() => document.body, closeMenu],
  [nestedMenuItem, toggleNestedMenu]
]

function addListeners() {
  elementClickEvents
    .forEach(([element, clickHandler]) => element()?.addEventListener('click', clickHandler))
}

function removeListeners() {
  elementClickEvents
    .forEach(([element, clickHandler]) => element()?.removeEventListener('click', clickHandler))
}


document.addEventListener('DOMContentLoaded', addListeners)

document.addEventListener('turbo:load', () => {
  removeListeners()
  addListeners()
})
