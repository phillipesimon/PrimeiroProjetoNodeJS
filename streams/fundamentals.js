import { Readable, Writable, Transform } from 'node:stream'

//Stream de leitura
class OneToHundreadStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

//Stream transform(ler dados de um lugar e escreve os dados em outro lugar)
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

//Stream de escrita
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundreadStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())

// Para rodar o arquivo execute no terminal o comando node streams/fundamentals.js
