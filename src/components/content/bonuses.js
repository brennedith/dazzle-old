export default {
  structures: {
    'hon': {
      'below60': [ [0.44, 0.0075], [0.42, 0.0060], [0.41, 0.0050], [0.39, 0.0045], [0.37, 0.0040], [0.35, 0.0035], [0.33, 0.0030], [0.31, 0.0025], [0.29, 0.0022], [0.27, 0.0020] ],
      'above60': [ [0.50, 0.0075], [0.48, 0.0060], [0.45, 0.0050], [0.43, 0.0045], [0.40, 0.0040], [0.38, 0.0035], [0.36, 0.0030], [0.34, 0.0025], [0.32, 0.0022], [0.30, 0.0020] ]
    },
    'gua': {
      'below60': [ [0.44, 0.01], [0.42, 0.0085], [0.41, 0.0075], [0.39, 0.0070], [0.37, 0.0065], [0.35, 0.0060], [0.33, 0.0055], [0.31, 0.0050], [0.29, 0.0030], [0.27, 0.0025] ],
      'above60': [ [0.50, 0.01], [0.48, 0.0085], [0.45, 0.0075], [0.43, 0.0070], [0.40, 0.0065], [0.38, 0.0060], [0.36, 0.0055], [0.34, 0.0050], [0.32, 0.0030], [0.30, 0.0025] ]
    }
  },
  calc (country, tenure, conversion) {
    const structure = this.structures[country][tenure]
    const length = structure.length
    let index = 0
    let bonus = {
      current: 0,
      next: 0
    }

    structure.map((x) => {
      if (conversion >= x[0]) {
        index = index + 1
      }
    })

    if (index === 0) {
      bonus = {
        current: 0,
        next: structure[length - 1][1]
      }
    } else if (index === 10) {
      bonus = {
        current: structure[0][1],
        next: structure[0][1]
      }
    } else {
      bonus = {
        current: structure[length - index][1],
        next: structure[length - index - 1][1]
      }
    }

    return bonus
  }
}
