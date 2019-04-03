import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    films: [
      {
        id: 0,
        title: 'Avengers',
        year: 2018,
        image: 'Avengers.jpg',
        cast: 'Robert Downey, Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson' +
        'Don Cheadle, Benedict Cumberbatch, Tom Holland, Chadwick Boseman, Zoe Saldana, Karen Gillan' +
        'Tom Hiddleston, Paul Bettany, Elizabeth Olsen, Anthony Mackie',
        description: 'As the Avengers and their allies have continued to protect the world from threats too large ' +
        'for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of ' +
        'intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, ' +
        'and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for ' +
        'has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
        rating: 8.6,
        genre: 'Action | Adventure | Fantasy | Sci-Fi'
      },
      {
        id: 1,
        title: 'Deadpool 2',
        year: 2018,
        image: 'Deadpool2.jpg',
        cast: 'Ryan Reynolds, Josh Brolin, Morena Baccarin',
        description: 'Foul-mouthed mutant mercenary Wade Wilson (AKA. Deadpool), brings together a team of fellow ' +
        'mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg, Cable.',
        rating: 7.9,
        genre: 'Action | Adventure | Comedy | Sci-Fi'
      },
      {
        id: 2,
        title: 'Mamma Mia! Here We Go Again',
        year: 2018,
        image: 'mammaMia.jpg',
        cast: 'Lily James, Amanda Seyfried, Meryl Streep',
        description: 'Five years after the events of Mamma Mia! (2008), Sophie prepares for the grand reopening ' +
        'of the Hotel Bella Donna as she learns more about her mother\'s past.',
        rating: 7.2,
        genre: ' Comedy | Musical'
      },
      {
        id: 3,
        title: 'Ocean\'s 8',
        year: 2018,
        image: 'ocean\'s8.jpg',
        cast: 'Sandra Bullock, Cate Blanchett, Anne Hathaway...',
        description: 'Debbie Ocean gathers an all-female crew to attempt an impossible heist at New York City\'s yearly Met Gala.',
        rating: 6.3,
        genre: ' Action | Comedy | Crime | Thriller'
      },
      {
        id: 4,
        title: 'Hereditary',
        year: 2018,
        image: 'hereditary.jpg',
        cast: 'Toni Collette, Milly Shapiro, Gabriel Byrne',
        description: 'After the family matriarch passes away, a grieving family is haunted by tragic and disturbing ' +
        'occurrences, and begin to unravel dark secrets.',
        rating: 7.4,
        genre: 'Drama | Horror | Mystery | Thriller'
      },
      {
        id: 5,
        title: 'Jurassic World: Fallen Kingdom',
        year: 2018,
        image: 'jurassicWorldFallenKingdom.jpg',
        cast: 'Chris Pratt, Bryce Dallas Howard, Rafe Spall',
        description: 'Three years after the Jurassic World theme park was closed down, Owen and Claire return to Isla Nublar' +
        ' to save the dinosaurs when they learn that a once dormant volcano on the island is active and is threatening' +
        ' to extinguish all life there. Along the way, Owen sets out to find Blue, his lead raptor, and discovers ' +
        'a conspiracy that could disrupt the natural order of the entire planet. Life has found a way, again.',
        rating: 6.4,
        genre: 'Action | Adventure | Sci-Fi'
      },
      {
        id: 6,
        title: 'Mission Impossible: Fallout',
        year: 2018,
        image: 'MissionImpossiibleFallout.jpg',
        cast: 'Tom Cruise, Henry Cavill, Ving Rhames',
        description: 'Two years after Ethan Hunt had successfully captured Solomon Lane, the remnants of the Syndicate' +
        ' have reformed into another organization called the Apostles. Under the leadership of a mysterious ' +
        'fundamentalist known only as John Lark, the organization is planning on acquiring three plutonium cores. ' +
        'Ethan and his team are sent to Berlin to intercept them, but the mission fails when Ethan saves Luther and ' +
        'the Apostles escape with the plutonium. With CIA agent August Walker joining the team, Ethan and his allies ' +
        'must now find the plutonium cores before it\'s too late.',
        rating: 8.2,
        genre: 'Action | Adventure | Thriller'
      },
      {
        id: 7,
        title: 'The Equalizer',
        year: 2014,
        image: 'theEqualizer.jpg',
        cast: 'Denzel Washington, Marton Csokas, Chloë Grace Moretz, David Harbour, Haley Bennett, Bill Pullman',
        description: 'A man believes he has put his mysterious past behind him and has dedicated himself to beginning' +
        'a new, quiet life. But when he meets a young girl under the control of ultra-violent Russian gangsters,' +
        'he can\'t stand idly by - he has to help her.',
        rating: 7.2,
        genre: 'Action | Crime | Thriller'
      },
      {
        id: 8,
        title: 'The Meg',
        year: 2018,
        image: 'theMeg.jpg',
        cast: 'Jason Statham, Bingbing Li, Rainn Wilson',
        description: 'After escaping an attack by what he claims was a 70-foot shark, Jonas Taylor must confront his ' +
        'fears to save those trapped in a sunken submersible.',
        rating: 6.1,
        genre: 'Action | Horror | Sci-Fi | Thriller'
      },
      {
        id: 9,
        title: 'The Nun',
        year: 2018,
        image: 'theNun.jpg',
        cast: 'Bonnie Aarons, Taissa Farmiga, Jonny Coyne',
        description: 'A priest with a haunted past and a novice on the threshold of her final vows are sent ' +
        'by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the ' +
        'form of a demonic nun.',
        rating: '',
        genre: 'Horror | Mystery | Thriller'
      },
      {
        id: 10,
        title: 'Upgrade',
        year: 2018,
        image: 'upgrade.jpg',
        cast: 'Logan Marshall-Green, Melanie Vallejo, Steve Danielsen',
        description: 'Set in the near-future, technology controls nearly all aspects of life. But when Grey, ' +
        'a self-identified technophobe, has his world turned upside down, his only hope for revenge is an ' +
        'experimental computer chip implant called Stem.',
        rating: 7.6,
        genre: 'Action | Horror | Sci-Fi | Thriller'
      }
    ],
    currentMovie: {}
  },
  getters: {
    getAllMovies: state => state.films,
    getCurrentMovie: state => state.currentMovie,
    getMovieById: (state) => (id) => {
      return state.films.find(film => film.id === id)
    }

  },

  mutations: {
    CURRENT_PRODUCT: (state, product) => {
      state.currentMovie = product
    },
    setToken: (state, token) => {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser: (state, user) => {
      state.user = user
    }
  },

  actions: {
    currentMovie: (context, product) => {
      context.commit('CURRENT_PRODUCT', product)
    },
    setToken: ({ commit }, token) => {
      commit('setToken', token)
    },
    setUser: ({ commit }, user) => {
      commit('setUser', user)
    }
  }
})
