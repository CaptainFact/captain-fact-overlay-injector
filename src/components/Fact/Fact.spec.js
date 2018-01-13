import Fact from './Fact'


test("approving fact", () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: true, score: 1337}}/>)
})

test("refuting fact", () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: false, score: 1337}}/>)
})

test("with text", () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: true, score: 1337, text: "Foobar"}}/>)
})

test("custom star image", () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: true, score: 1337}} imgStar="custom.jpg"/>)
})