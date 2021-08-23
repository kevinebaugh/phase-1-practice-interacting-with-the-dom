const counter = document.querySelector("#counter")
let isPaused = false
let heartDb = {}

const minusButton = document.querySelector("#minus")
const plusButton = document.querySelector("#plus")
const heartButton = document.querySelector("#heart")
const pauseButton = document.querySelector("#pause")
const submitButton = document.querySelector("#submit")
const commentInput = document.querySelector("#comment-input")
const likes = document.querySelector(".likes")

minusButton.addEventListener("click", decrementCounter)
plusButton.addEventListener("click", incrementCounter)
heartButton.addEventListener("click", heartCounter)
pauseButton.addEventListener("click", pauseUnpause)
submitButton.addEventListener("click", submitComment)


function incrementCounter() {
  currentCount = parseInt(counter.innerText)
  counter.innerText = currentCount + 1
}

function decrementCounter() {
  currentCount = parseInt(counter.innerText)
  counter.innerText = currentCount - 1
}

function heartCounter(e) {
  currentCount = parseInt(counter.innerText)
  if (heartDb[currentCount] == null) {
    heartDb[currentCount] = 1
  } else {
    heartDb[currentCount]++
  }
  while (likes.firstChild) {
    likes.removeChild(likes.firstChild)
  }
  for (const count in heartDb) {
    pairLi = document.createElement("li")
    const dbCount = heartDb[count]
    pairLi.innerText = `${count} has been liked ${dbCount} times`
    likes.appendChild(pairLi)
    // console.log(`${count}: ${heartDb[count]}`)
  }
}

function reenableAllButPause() {
  ["minus", "plus", "heart", "submit"].forEach(id => {
    document.querySelector(`#${id}`).disabled = false
  })
}

function disableAllButPause() {
  ["minus", "plus", "heart", "submit"].forEach(id => {
    document.querySelector(`#${id}`).disabled = true
  })
}

function pauseUnpause() {
  if (isPaused) {
    isPaused = false
    pauseButton.innerText = "pause"
    reenableAllButPause()
  } else {
    isPaused = true
    pauseButton.innerText = "resume"
    disableAllButPause()
  }
}

function addComment(commentText) {
  const commentsList = document.querySelector("#list")
  const newComment = document.createElement("p")
  newComment.innerText = commentText
  commentsList.appendChild(newComment)
}

function submitComment(event) {
  event.preventDefault()
  addComment(commentInput.value)
}

setInterval(function() {
  if (isPaused == true) {
    console.error("Counter is paused")
  } else {
    incrementCounter()
  }
}, 1000)
