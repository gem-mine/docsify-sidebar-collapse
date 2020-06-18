import './style.css'

$docsify.plugins = [
  function (hook, vm) {
    hook.doneEach(function (html, next) {
      var links = Docsify.dom.findAll('.sidebar-nav li>a[href="#/"]')
      links.forEach((el) => {
        Docsify.dom.on(el, 'click', (event) => {
          event.preventDefault()
          links.forEach((a) => {
            if (a === el) {
              Docsify.dom.toggleClass(a.parentNode, 'add', 'open')
              let targetEl = a.parentNode
              while (targetEl.className !== 'sidebar-nav') {
                if (targetEl.parentNode.tagName === 'LI' || targetEl.parentNode.className === 'app-sub-sidebar') {
                  Docsify.dom.toggleClass(targetEl.parentNode, 'add', 'open')
                }
                targetEl = targetEl.parentNode;
              }
            }
          })
        })
      })

      let el = document.querySelector('.sidebar-nav .active')
      if (el) {
        el.classList.add('open')
        while (el.className !== 'sidebar-nav') {
          if (
            el.parentElement.tagName === 'LI' ||
            el.parentElement.className === 'app-sub-sidebar'
          ) {
            el.parentElement.classList.add('open')
          }
          el = el.parentElement
        }
      }
      next(html)
    })
  }
].concat($docsify.plugins || [])

window.addEventListener('hashchange', e => {
  requestAnimationFrame(() => {
    const el = document.querySelector('.sidebar-nav .active')
    if (el) {
      el.parentElement.parentElement
        .querySelectorAll('.app-sub-sidebar')
        .forEach(dom => dom.classList.remove('open'))

      if (
        el.parentElement.tagName === 'LI' ||
        el.parentElement.className === 'app-sub-sidebar'
      ) {
        el.parentElement.classList.add('open')
      }
    }
  })
})

document.addEventListener(
  'scroll',
  e => {
    requestAnimationFrame(() => {
      let el = document.querySelector('.app-sub-sidebar > .active')
      if (el) {
        el.parentElement.parentElement
          .querySelectorAll('.app-sub-sidebar')
          .forEach(dom => dom.classList.remove('open'))
        while (el.parentElement.classList.contains('app-sub-sidebar')) {
          el.parentElement.classList.add('open')
          el = el.parentElement
        }
      }
    })
  },
  false
)

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.sidebar-nav').addEventListener(
    'click',
    e => {
      if (e.target.tagName === 'LI') {
        e.target.classList.toggle('open')
      }

      if (e.target.tagName === 'A') {
        const elp = e.target.parentElement
        if (elp.tagName === 'LI') {
          if (elp.classList.contains('open')) {
            if (e.target.getAttribute('href') === '#/') {
              requestAnimationFrame(function () {
                elp.classList.remove('open');
              })
            } else {
              requestAnimationFrame(function () {
                elp.classList.add('collapse');
                elp.classList.remove('open');
                elp.classList.add('hold');
              });
            }
          } else {
            requestAnimationFrame(() => {
              if (elp.classList.contains('hold')) {
                elp.classList.remove('collapse')
                elp.classList.add('open')
                elp.classList.remove('hold')
              }
            })
          }
        }
      }
    },
    true
  )
})