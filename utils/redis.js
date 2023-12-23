import { createClient } from 'redis'
import { promisify } from 'util'

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (error) => {
        console.log(error)
        this.connected = false
      })
      .on('ready', () => {
        console.log('Redis client connection ready')
        this.connected = true
      })

    console.log(this.client.connected)

    this.get = promisify(this.client.get).bind(this.client)
  }

  async get(key) {
    const value = await this.get(key).then((response) => response)
    return value
  }

  async set(key, value, duration) {
    await this.client.set(key, value, 'EX', duration)
  }

  async del(key) {
    await this.client.del(key)
  }

  isAlive() {
    return this.client.connected
  }
}

const redisClient = new RedisClient()

export default redisClient
