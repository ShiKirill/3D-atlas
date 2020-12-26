
const leftMenuToggle = document.querySelector('.sidebar-toggle');
const leftMenu = document.querySelector('.sidebar');
const navBarToggler = document.querySelector('.navbar-toggler');
const navBarCollapse = document.querySelector('.navbar-collapse');
const sideBarClose = document.querySelectorAll('.sidebar-close');
const sideBarTopics = document.querySelector('.sidebar-topics');
const sideBarTopicsItemList = document.querySelectorAll('.sidebar-topics-item-list');

leftMenuToggle.addEventListener('click', event => {
    event.preventDefault();
    leftMenu
        .classList
        .add('visible');
    navBarToggler.classList.add('collapsed');
    navBarCollapse.classList.remove('show');
});

sideBarClose.forEach(elem => elem.addEventListener('click', event => {
    leftMenu.classList.remove('visible');
    sideBarTopicsItemList.forEach(el => {
        el.hidden = true;
    })
}))

for (let li of sideBarTopics.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling); // поместить текстовый узел внутрь элемента <span>
}

  //  ловим клики на всём дереве
sideBarTopics.onclick = function(event) {

    if (event.target.tagName != 'SPAN') {
    return;
    }

    let childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return; // нет детей

    childrenContainer.hidden = !childrenContainer.hidden;
}