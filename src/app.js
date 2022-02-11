import './app.css'
import './app.less'
import './app.scss'

const hello = document.createElement('h2')
hello.textContent="hello css"
hello.className = 'hello'
document.body.appendChild(hello)

const h3 = document.createElement('h3')
h3.textContent="hello less"
h3.className = 'hello3'
document.body.appendChild(h3)

const scss = document.createElement('h3')
scss.textContent="hello scss"
scss.className = 'scss'
document.body.appendChild(scss)
