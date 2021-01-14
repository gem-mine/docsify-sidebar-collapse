import './style.css'

$docsify.plugins = [
  function (hook, vm) {
    hook.doneEach(function (html, next) {
      // 寻找active的el，给全部父级li加上open
      var el = document.querySelector('.sidebar-nav .active');

      if (el) {
        el.classList.add('open');

        while (el.className !== 'sidebar-nav') {
          if (el.parentElement.tagName === 'LI' || el.parentElement.className === 'app-sub-sidebar') {
            el.parentElement.classList.add('open');
          }

          el = el.parentElement;
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
  document.querySelector('.sidebar-nav').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('open');
    }

    if (e.target.tagName === 'A') {
      if (e.target.getAttribute('href') === '#/') {
        e.preventDefault()
        e.stopPropagation()
      }
      var elp = e.target.parentElement;

      if (elp.tagName === 'LI') {
        if (elp.classList.contains('open')) {
          requestAnimationFrame(() => {
            elp.classList.remove('open')
          })
        } else {
          requestAnimationFrame(() => {
            elp.classList.add('open')
            const elpSubUls = elp.querySelectorAll('a + ul')
            elpSubUls.forEach((elpSubUl) => {
              const elA = elpSubUl.parentElement
              elA.classList.add('open')
            })
          })
        }
      }
    }
  }, true);
})