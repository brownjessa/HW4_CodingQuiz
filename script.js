var sel
var ctdown
var currentQC
var score
var database = [
  {
    Question: "Inside which HTML element do we put the JavaScript?",
    Choices: {
      1: "<javascript>",
      2: "<js>",
      3: "<scripting>",
      4: "<script>"
    },
    Answer: 4
  },

  {
    q: "What is the correct JavaScript syntax to change the content of the HTML element: <p id='demo'>THis is a demonstration.</p>",
    c: {
      1: "#demo.innerHTML = 'Hello World!';",
      2: "document.getElementById('demo').innerHTML = 'Hello World!';",
      3: "document.getElementByName('p').innerHTML = 'Hello World!';",
      4: "document.getElement('p').innerHTML = 'Hello World!';",
    },
    a: 2
  },

  {
    q: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    c: {
      1: 'if (i <> 5)',
      2: 'if i =! 5 then',
      3: 'if (i != 5)',
      4: 'if i <> 5'
    },
    a: 3
  },

  {
    q: 'How does a FOR loop start?',
    c: {
      1: 'for (i = 0; i <= 5; i++)',
      2: 'for (i = 0; i <= 5)',
      3: 'for (i <= 5; i++)',
      4: 'for i = 1 to 5'
    },
    a: 1
  },

  {
    q: 'Which of the following function of String object creates an HTML anchor that is used as a hypertext target?',
    c: {
      1: 'anchor()',
      2: 'link()',
      3: 'blink()',
      4: 'big()'
    },
    a: 1
  }
]

function main () {
  makeQC(database)
  ctdown = 7500
  document.getElementById('time').textContent = Math.floor(ctdown / 100)
  score = 0
  setInterval(function () {
    document.getElementById('time').textContent = Math.floor(ctdown / 100)
    if (ctdown > 0) {
      ctdown--
    } else {
      jump2score()
    }
  }, 10)
}

function makeQC (obj) {
  console.log('dmsg: makeQC')
  sel = generateSelector(obj)
  loadQC(obj, sel)
  document.getElementById('score').textContent = score
}

function generateSelector (obj) {
  console.log('dmsg: generateSelector')
  var n = obj.length
  return Math.floor(
    (window.crypto.getRandomValues(new Uint32Array(2))[0] / 0xffffffff) * n
  )
}

function loadQC (obj, index) {
  console.log('dmsg: loadQC')
  renderQC(obj[index])
  currentQC = obj.splice(index, 1)
}

function renderQC (obj) {
  console.log('dmsg: renderQC')
  console.dir(Object.keys(obj))
  console.log(obj.q)
  console.dir(document.getElementsByTagName('h3'))
  document.getElementById('question').textContent = obj.q
  console.dir(document.getElementsByTagName('h3'))
  document.getElementById('choice').innerHTML = ''
  for (var key in obj.c) {
    var cDiv = document.createElement('div')
    var cBtn = document.createElement('button')
    cBtn.classList.add('btn', 'btn-primary', 'v-left')
    cBtn.id = key
    console.log(key)
    console.dir(obj.c[key])
    cBtn.textContent = obj.c[key]
    document.getElementById('choice').appendChild(cDiv)
    cDiv.appendChild(cBtn)
    console.dir(cBtn)
  }
}

function jump2score () {
  score += ctdown / 5
  ctdown = 0
  window.localStorage.setItem('score', score)
  console.log(window.localStorage.getItem('score'))
  document.location.href = 'highscore.html'
}

main()
document.querySelector('#choice').addEventListener('click', function (e) {
  console.log('dmsg: chka')
  var userSel = Number(e.target.id)
  if (userSel === currentQC[0].a) {
    score += 300
    document.getElementById('score').textContent = score
    document.querySelector('.answer').textContent = 'Correct!'
    if (database.length > 0) {
      makeQC(database)
    } else {
      jump2score()
    }
  } else {
    document.querySelector('.answer').textContent = 'Wrong!'
    if (ctdown > 1500) {
      ctdown -= 1500
    } else {
      ctdown = 0
    }
  }
})
