/* yarn example/ */
import render from '../src'

const App = () => (
  <div className="hello">
    <span id="name"></span>
  </div>
)
const s = render(<App />)
console.log(s)