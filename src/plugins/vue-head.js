/* eslint-disable func-names */
/* eslint-disable object-shorthand */

/*
 * Simplified VueHead based on https://github.com/ktquez/vue-head/blob/master/vue-head.js
 */

const KeyType = {
  TITLE: 'title',
  META: 'meta'
}

const Util = {
  abbr: {
    ch: 'charset',
    n: 'name',
    ip: 'itemprop',
    c: 'content',
    p: 'property',
    r: 'rel',
    h: 'href',
    s: 'src',
    a: 'async',
    d: 'defer'
  },

  getNode: (node) => document.getElementsByTagName(node)[0],

  prepareElement: function (obj, el) {
    Object.keys(obj).forEach((prop) => {
      const abbr = this.abbr[prop] || prop
      if (abbr.match(/(body|undo|replace)/g)) return
      el.setAttribute(abbr, obj[prop])
    })

    return el
  },

  addNode: function (el, parent) {
    parent.appendChild(el)
  },

  [KeyType.TITLE]: function (title) {
    if (!title) return
    document.title = title
  },

  [KeyType.META]: function (arr, tag, node, update = true) {
    if (!arr) return
    arr.forEach((obj) => {
      const parent = obj.body ? this.getNode('body') : this.getNode(node)
      let el = document.getElementById(obj.id)
      if (!el) {
        el = document.createElement(tag)
        // eslint-disable-next-line no-param-reassign
        update = false
      }

      if (el.hasAttribute('id')) {
        this.prepareElement(obj, el)
        return
      }

      el = this.prepareElement(obj, el)
      this.addNode(el, parent)
    })
  }
}

export default {
  install: (app) => {
    app.mixin({
      // eslint-disable-next-line consistent-return
      created() {
        const head = typeof this.$options.head === 'function' ? this.$options.head.bind(this)() : this.$options.head
        if (!head) return

        Object.keys(head).forEach((key) => {
          const prop = head[key]
          if (!prop) return
          const obj = typeof prop === 'function' ? head[key].bind(this)() : head[key]
          if (key === KeyType.TITLE) {
            Util[key](obj)
            return
          }

          Util.meta(obj, key, 'head')
        })
      }
    })
  }
}
