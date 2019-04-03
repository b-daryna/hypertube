<template>
    <div>
        <div ref="player" v-if="movie.torrent.length > 0" @mouseleave="hideCtrls" @mousemove="showCtrls"
             class="video flexx-item video-main-container flexx-column flexx-item-center">
            <video ref="video" class="video__player" id="video__player"
                   preload="metadata"
                   :src="src"
                   @timeupdate="displayTime(); handleProgress()"
                   @click="togglePlay"
                   @dblclick="fullScreen"
                   @playing="isPlaying = true; videoIsLoading = false"
                   @pause="isPlaying = false"
                   @seeking="videoIsLoading = true"
                   @seeked="videoIsLoading = false"
                   @waiting="videoIsLoading = true"
                   @loadeddata="loadedData">
                <track :src="subSrc" kind="subtitles" srclang="en" label="English" id="track" default>
            </video>
            <div class="loader" v-if="videoIsLoading"></div>
            <div class="video__control flexx-item" ref="videoControl">
                <ul class="flexx-item">
                    <li v-if="!isPlaying" @click="togglePlay" class="video__control__button tooltip" id="video__play">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px"
                             viewBox="0 0 24 24">
                            <g transform="translate(0, 0)">
                                <polygon fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="5,22 5,2 20,12 "
                                         stroke-linejoin="miter"></polygon>
                            </g>
                        </svg>
                    <li v-else @click="togglePlay" class="video__control__button tooltip" id="video__pause">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px"
                             viewBox="0 0 24 24">
                            <g transform="translate(0, 0)">
                                <rect x="3" y="2" fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" width="6" height="20"
                                      stroke-linejoin="miter"></rect>
                                <rect x="15" y="2" fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" width="6" height="20"
                                      stroke-linejoin="miter"></rect>
                            </g>
                        </svg>
                    </li>
                </ul>
                <div class="video__duration flexx-item flexx--items-center tooltip" id="video__duration">{{vidCurrent}}</div>
                <div class="video__control__button video__track flexx__child flexx-item flexx--items-center tooltip" data-tooltip-content="Track">
                    <input :disabled="!initialized || videoIsLoading" @change="updateCurrentTime" ref="timeTrack" class="video__track__range flexx__child" id="video__track"
                           type="range" step="0.1" min="0" max="100" :value="currentTime"/>
                </div>
                <div class="video__duration flexx-item flexx--items-center tooltip" id="video__duration">{{totalDuration}}</div>
                <div class="video__control__button volume flexx-item tooltip">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" v-if="!isMuted" @click="volMute" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         width="24px" height="24px" viewBox="0 0 24 24">
                        <g transform="translate(0, 0)">
                            <polygon fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="14,22 6,16 1,16 1,8 6,8 14,2 "
                                     stroke-linejoin="miter"></polygon>
                            <line data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="19" y1="12" x2="23" y2="12"
                                  stroke-linejoin="miter"></line>
                            <line data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="17.7" y1="7" x2="21.1"
                                  y2="5" stroke-linejoin="miter"></line>
                            <line data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="17.7" y1="17" x2="21.1"
                                  y2="19" stroke-linejoin="miter"></line>
                        </g>
                    </svg>
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" v-else @click="volMute" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px"
                         height="24px" viewBox="0 0 24 24">
                        <g transform="translate(0, 0)">
                            <polyline fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="18,11 18,22 11.813,17.36 "
                                      stroke-linejoin="miter"></polyline>
                            <polyline data-cap="butt" fill="none" stroke="#929191" stroke-width="2" stroke-miterlimit="10" points="8,16 2,16 2,8 10,8 18,2 18,6 "
                                      stroke-linejoin="miter" stroke-linecap="butt"></polyline>
                            <line data-cap="butt" data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-miterlimit="10" x1="23" y1="1" x2="1" y2="23"
                                  stroke-linejoin="miter" stroke-linecap="butt"></line>
                        </g>
                    </svg>
                    <div class="video__track__range__sound">
                        <input @change="setVolume" @input="setVolume" ref="volume_track" class="video__track__range" id="sound__track" type="range" step="1" min="0" max="10"
                               value="10"/>
                    </div>
                </div>
                <div class="video__control__button tooltip flexx-item" id="video__quality">
                    <select v-if="qualities" class="player--select" :disabled="!initialized || videoIsLoading" v-on:change="changeQuality">
                        <option v-for="quality in qualities">{{quality.quality}}</option>
                    </select>
                </div>
                <div class="video__control__button tooltip flexx-item" id="video__subtitles">
                    <select v-if="subtitles" class="player--select" :disabled="!initialized || videoIsLoading" v-on:change="changeSubs">
                        <option v-for="sub in subtitles">{{sub}}</option>
                    </select>
                </div>
                <div class="video__control__button tooltip" id="video__fullScreen" data-tooltip-content="Maximize" @click="fullScreen">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" v-if="isFullScreen" class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22px"
                         height="22px" viewBox="0 0 24 24">
                        <g transform="translate(0, 0)">
                            <line data-cap="butt" data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-miterlimit="10" x1="22" y1="2" x2="14" y2="10"
                                  stroke-linejoin="miter" stroke-linecap="butt"></line>
                            <polyline fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="14,2 22,2 22,10 "
                                      stroke-linejoin="miter"></polyline>
                            <line data-cap="butt" data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-miterlimit="10" x1="2" y1="22" x2="10" y2="14"
                                  stroke-linejoin="miter" stroke-linecap="butt"></line>
                            <polyline fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="2,14 2,22 10,22 "
                                      stroke-linejoin="miter"></polyline>
                        </g>
                    </svg>
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" v-else class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px"
                         viewBox="0 0 24 24">
                        <g transform="translate(0, 0)">
                            <line data-cap="butt" data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-miterlimit="10" x1="14" y1="10" x2="22" y2="2"
                                  stroke-linejoin="miter" stroke-linecap="butt"></line>
                            <polyline data-color="color-2" fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points=" 21,10 14,10 14,3 "
                                      stroke-linejoin="miter"></polyline>
                            <line data-cap="butt" fill="none" stroke="#929191" stroke-width="2" stroke-miterlimit="10" x1="10" y1="14" x2="2" y2="22" stroke-linejoin="miter"
                                  stroke-linecap="butt"></line>
                            <polyline fill="none" stroke="#929191" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="10,21 10,14 3,14 "
                                      stroke-linejoin="miter"></polyline>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <div v-else class="no-video
        player">
            <div class="no-video-text">
                <div>No torrent for that movie.</div>
            </div>
        </div>
    </div>
</template>

<script>
  'use strict'
  const movieService = require('../../services/movie.service.js')
  const userService = require('../../services/user.service.js')
  export default {
    props: ['movie'],
    components: {
      'customSelect': require('../form/materialSelect')
    },
    data: function () {
      return {
        waiting: false,
        movieData: {},
        currentTime: 0,
        totalDuration: '0:0:0',
        video: null,
        update: 0,
        src: '',
        isPlaying: false,
        isFullScreen: true,
        isMuted: false,
        isSeen: false,
        hidden: false,
        timer: null,
        vidCurrent: '',
        timeTrack: null,
        videoIsLoading: true,
        initialized: false,
        onPlaying: false,
        onPause: false,
        subSrc: '',
        subtitles: []
      }
    },
    beforeDestroy: function () {
      this.$refs.video.parentElement.removeChild(this.$refs.video)
      this.src = ''
      this.subSrc = ''
    },
    computed: {
      qualities: function () {
        if (this.movie.torrent && this.movie.torrent.length == 1 && this.movie.torrent[0].quality === '3D')
          return [{hash: this.movie.torrent[0].hash, quality: this.movie.torrent[0].quality}]
        return this.movie.torrent.map(tor => {
          return {hash: tor.hash, quality: tor.quality}
        }).filter(tor => tor.quality !== '3D')
      }
    },
    mounted: function () {
      if (this.$refs.video) {
        this.$refs.video.onplaying = function () {
          this.onPlaying = true
          this.onPause = false
        }
        this.$refs.video.onpause = function () {
          this.onPlaying = false
          this.onPause = true
        }
        this.timeTrack = this.currentTime
      }
    },
    created: function () {
      this.displayTime()
      this.handleProgress()
      this.initSubs()
      userService.getCurrentUser()
        .then(res => {
          if (res.data.data && res.data.data.currentMovies && res.data.data.currentMovies.length > 0 &&
            res.data.data.currentMovies.find(movie => movie.imdbId == this.movie.imdbId)) {
            this.currentTime = res.data.data.currentMovies.find(movie => movie.imdbId == this.movie.imdbId).timestamp || 0
          }
          if (this.$refs.video)
            this.$refs.video.currentTime = this.currentTime
          if (this.qualities && this.qualities.length > 0)
            this.src = `/api/movies/${this.movie.imdbId}/stream?quality=${this.qualities[0].quality}`
        })
        .catch(err => console.log(err))
    },
    methods: {
      hideCtrls: function () {
        if (this.$refs.videoControl) {
          let control = this.$refs.videoControl
          clearTimeout(this.timer)
          control.style.opacity = 0
        }
      },
      showCtrls: function () {
        if (this.$refs.videoControl) {
          let control = this.$refs.videoControl
          clearTimeout(this.timer)
          control.style.opacity = 1
          this.timer = setTimeout(this.hideCtrls, 5000)
        }
      },
      changeQuality: function (event) {
        if (this.initialized && this.$refs.video) {
          let time = this.$refs.video.currentTime
          let newQuality = this.qualities.find(elem => elem.quality == event.currentTarget.value).quality
          let newSrc = `/api/movies/${this.movie.imdbId}/stream?quality=${newQuality}`
          if (newSrc !== this.src) this.src = newSrc
          this.$refs.video.onloadstart = function () {
            this.currentTime = time
            this.play()
          }
        }
      },
      changeSubs: function (event) {
        let video = this.$refs.video
        if (video && this.initialized) {
          let track = document.querySelector('#track')
          let newLanguageSub = event.currentTarget.value
          if (newLanguageSub === 'none' && video.hasChildNodes()) return video.removeChild(track)
          if (video.hasChildNodes()) video.removeChild(track)
          let newTrack = document.createElement('track')
          newTrack.kind = 'subtitles'
          newTrack.srclang = newLanguageSub.substring(0, 2)
          newTrack.label = newLanguageSub
          newTrack.src = `/api/movies/${this.movie.imdbId}/subtitles?language=${newLanguageSub}`
          newTrack.id = 'track'
          video.appendChild(newTrack)
        }
      },
      fullScreen: function () {
        let player = this.$refs.player
        player.style = ''
        if (document.webkitIsFullScreen) {
          document.webkitCancelFullScreen()
          this.isFullScreen = true
        }
        else if (player.mozRequestFullScreen) {
          player.mozRequestFullScreen()
          this.isFullScreen = false
        } else if (player.webkitRequestFullScreen) {
          player.webkitRequestFullScreen()
          this.isFullScreen = false
        }
      },
      togglePlay: function () {
        let video = this.$refs.video
        if (video.paused && !this.onPlaying && !this.videoIsLoading && this.initialized) {
          this.isPlaying = true
          video.play()
        } else if (!video.paused && !this.onPause && !this.videoIsLoading && this.initialized) {
          this.isPlaying = false
          video.pause()
        }
      },
      volMute: function () {
        let video = this.$refs.video
        let volume_value = this.$refs.volume_track.value / 10
        this.isMuted = this.isMuted == true ? false : true
        video.muted = !video.muted
      },
      setVolume: function (e) {
        let video = this.$refs.video
        let volume_value = this.$refs.volume_track.value / 10
        video.volume = volume_value
      },
      displayTime: function () {
        if (this.$refs.video && this.initialized) {
          let video = this.$refs.video
          let totalCurrent = video.currentTime
          this.vidCurrent = this.secondsToMinutesStr(totalCurrent)
        }
      },
      handleProgress: function () {
        if (this.$refs.video && this.initialized) {
          let video = this.$refs.video
          let percent = (video.currentTime / video.duration) * 100
          this.currentTime = percent
        }
      },
      timeUpdate: function () {
        if (this.$refs.video) {
          let totalDuration = Math.round(this.$refs.video.duration / 60)
          let currentTime = Math.round(this.$refs.video.currentTime / 60)
          let creditsDuration = 10
          if (currentTime >= totalDuration - creditsDuration && !this.isSeen) {
            movieService.deleteCurrentMovies(this.movie.imdbId)
            movieService.updateSeenMovies(this.movie.imdbId)
            this.isSeen = true
          } else if (!this.isSeen) {
            movieService.updateCurrentMovies(this.movie.imdbId, this.$refs.video.currentTime)
          }
        }
      },
      loadedData: function () {
        this.initialized = true;
        this.videoIsLoading = false;
        if (this.$refs.video && this.$refs.video.duration) {
          this.currentTime = this.currentTime / 100 * this.$refs.video.duration
          this.totalDuration = this.secondsToMinutesStr(this.$refs.video.duration)
          setInterval(this.timeUpdate, 15000)
        }
      },
      updateCurrentTime: function (event) {
        if (this.initialized) {
          let currentTime = (event.currentTarget.value * this.$refs.video.duration) / 100
          this.currentTime = event.currentTarget.value
          this.$refs.video.currentTime = currentTime
          this.vidCurrent = this.secondsToMinutesStr(currentTime)
        }
      },
      secondsToMinutesStr: function (seconds) {
        let timeHours = Math.floor(seconds / 3600)
        seconds %= 3600
        let timeMinutes = Math.round(seconds / 60)
        let timeSeconds = Math.round(seconds % 60)
        if (timeMinutes < 10)
          timeMinutes = '0' + timeMinutes
        return timeHours + ':' + timeMinutes + ':' + timeSeconds
      },
      initSubs: function () {
        let defaultLanguage = 'english'
        this.subtitles = ['none']
        this.subtitles.push(defaultLanguage)
        userService.getCurrentUser()
          .then(res => {
            if (res.data.data && res.data.data.language !== defaultLanguage)
              this.subtitles.push(res.data.data.language)
          })
      }
    }
  }
</script>
