const WaitForStylesheetsLoaded = (document) =>
  new Promise((resolve) => {
    const links = Array.from(document.querySelectorAll('link[rel=stylesheet]'))
    const parsedLinks = []
    let loaded = false
    let loadedCount = 0

    links.forEach((stylesheet) => {
      if (stylesheet.getAttribute('type')) parsedLinks.push(stylesheet)
    })

    const checkAllLoaded = (initial = false) => {
      if ((!loaded && initial && document.styleSheets.length >= parsedLinks.length) || (!initial && loadedCount >= parsedLinks.length)) {
        loaded = true
        resolve()
      }
    }

    checkAllLoaded(true)
    if (!loaded) {
      parsedLinks.forEach((stylesheet) => {
        // eslint-disable-next-line no-param-reassign
        stylesheet.onload = () => {
          loadedCount += 1
          checkAllLoaded()
        }
      })
    }
  })

export default WaitForStylesheetsLoaded
