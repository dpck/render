import render from '../src'

const App = () => (
  <div className="hello" data-example data-example-2="on9384636" id="Main-true-than-ever">
    Welcome to the website. Here you can find
information regarding different topics.
    <span id="name">This is your name</span>
    <select>
      <option value="pretty">Option One For You To Choose.</option>
      <option value="string">
        Another Option For The Choosing.
      </option>
    </select>
  </div>
)
const s = render(<App />, {
  pretty: true,
  lineLength: 40,
})
console.log(s)