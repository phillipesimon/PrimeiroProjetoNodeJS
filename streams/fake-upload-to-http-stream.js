import { Readable } from 'node:stream'

class OneToHundreadStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundreadStream(),
})
  .then((response) => {
    return response.text()
  })
  .then((data) => {
    console.log(data)
  })

//Para testar rode no terminal primeiro o node streams/stream-http-server.js
//e em outro terminal rode o comando node streams/fake-upload-to-http-stream.js
