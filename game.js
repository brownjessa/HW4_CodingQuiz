function preload () { // load sort and save
    console.log('dmsg: preload')
    var score = {
      ini: window.localStorage.getItem('ini'),
      value: window.localStorage.getItem('score')
    }
    var scores = []
  
    if (window.localStorage.getItem('scores') === null) {
      scores.push(score)
    } else {
      scores = JSON.parse(window.localStorage.getItem('scores'))
      console.dir(scores[1])
      console.dir(score)
      console.log(scores[0].ini !== score.ini && score[0].value !== score.value)
      if (scores[0].ini !== score.ini && score[0].value !== score.value) {
        scores.push(score)
      }
    }
    window.localStorage.setItem('scores', JSON.stringify(scores))
  }
  
  function renderScores (obj) {
  //  console.log('dmsg: renderScores')
    var ul = document.querySelector('ul')
    ul.innerHTML = ''
    var scores = JSON.parse(window.localStorage.getItem('scores'))
  //  console.dir(scores)
    if (scores !== null) {
      var sortedScores = sort(scores)
      console.dir(sortedScores)
      for (var key in sortedScores) {
        var li = document.createElement('li')
        li.classList.add('list-group-item')
        li.textContent = 'Player : ' + sortedScores[key].ini + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Score : ' + sortedScores[key].value
        ul.appendChild(li)
      }
    }
  }
  
  function sort (obj) {
    if (obj === null) {
      return obj
    }
    var scoreArray = []
    var newArray = []
    obj.forEach(function (element) {
    //  console.log(element)
      scoreArray.push(element.value)
    })
    scoreArray.sort(function (a, b) { return b - a })
    scoreArray.forEach(function (element) {
      for (var key in obj) {
        if (element === obj[key].value) {
          newArray.push(obj[key])
        }
      }
    })
    return newArray
  }
  
  preload()
  renderScores()
  
  document.querySelector('#return').addEventListener('click', function () {
    window.location.href = 'index.html'
  })
  
  document.querySelector('#clear').addEventListener('click', function () {
    window.localStorage.clear()
    renderScores()
  })
  