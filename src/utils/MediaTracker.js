import { SET_MEDIA_STATE } from '@/store/modules/Application'

export const MediaQueries = {
  xs: '(max-width: 639px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)'
}

export const MediaState = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5
}

export default class MediaTracker {
  constructor(store) {
    this.$store = store
    this.state = MediaState.xs
    this.queryList = []

    Object.keys(MediaQueries).map((prop) => {
      this.queryList[MediaQueries[prop]] = false
      const mq = window.matchMedia(MediaQueries[prop])
      mq.addListener(this.onMediaStateChange.bind(this))
      this.onMediaStateChange(mq)
      return prop
    })
  }

  onMediaStateChange({ media, matches }) {
    this.queryList[media] = matches
    this.getMediaState()
  }

  getMediaState() {
    let stateProp = 'xs'

    Object.keys(this.queryList).map((query) => {
      if (this.queryList[query]) {
        Object.keys(MediaQueries).map((prop) => {
          if (MediaQueries[prop] === query) {
            stateProp = prop
          }
          return prop
        })
      }
      return query
    })

    this.state = MediaState[stateProp]
    this.$store.commit(SET_MEDIA_STATE, this.state)
  }
}
