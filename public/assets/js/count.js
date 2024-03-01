let countBox = document.getElementById('count')
let count = 0
let num = 12000
let counting = setInterval(function () {
  if (count >= num) {
    count = num
    clearInterval(counting)
  } else {
    count += 41
  }
  countBox.innerHTML = new Intl.NumberFormat().format(count) + '명'
}, 10)
