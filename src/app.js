import './app.css'
import './app.less'
import './app.scss'
import './hello.js'

const hello = document.createElement('h2')
hello.textContent = 'hello css'
hello.className = 'hello'
document.body.appendChild(hello)
console.log(111)
const h3 = document.createElement('h3')
h3.textContent = 'hello less'
h3.className = 'hello3'
document.body.appendChild(h3)
console.log(222)
const scss = document.createElement('h3')
scss.textContent = 'hello scss'
scss.className = 'scss'
document.body.appendChild(scss)
console.log(33)

class a {
	constructor() {
		console.log('a')
	}
}

const r = new a()
