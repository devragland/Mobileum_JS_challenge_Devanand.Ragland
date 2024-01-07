export class Smartphone {
  private _id: number
  private _name: string
  private _brand: string
  private _description: string
  private _image: string | null

  constructor (
    id: number,
    name: string,
    brand: string,
    image: string | null,
    description: string
  ) {
    this._id = id
    this._name = name
    this._brand = brand
    this._image = image
    this._description = description
  }
  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  get brand () {
    return this._brand
  }

  get image () {
    return this._image
  }

  get description () {
    return this._description
  }
}

let smartPhones: Smartphone[] = [
  new Smartphone(
    1,
    'IPhone 14',
    'Apple',
    'https://www.worten.pt/i/b560d2906fd2a7b1b3add42c93bb2443c53b8f3b.jpg',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo tincidunt diam, non pellentesque est ultricies ac. Aliquam erat volutpat. Aliquam a lacus lorem. Aenean eu ligula at lorem porttitor fermentum luctus et metus.'
  ),
  new Smartphone(
    2,
    'Galaxy s10',
    'Samsung',
    'https://www.worten.pt/i/605b8b93d792bc4be982c1c3612ab528477b627b.jpg',
    'Etiam lacinia, tortor at ornare facilisis, sem diam feugiat urna, nec pulvinar lectus magna ac nisl. Proin at auctor metus. Pellentesque consectetur elit nec dui tristique facilisis. Phasellus aliquam velit et mauris bibendum, at facilisis nisi tempus.'
  ),
  new Smartphone(
    3,
    'Xiaomi 13 pro',
    'Xiaomi',
    'https://cdn.dxomark.com/wp-content/uploads/medias/post-139229/Xiaomi-13-Pro_featured-image-packshot-review-Recovered-1024x691.jpg',
    'Etiam lacinia, tortor at ornare facilisis, sem diam feugiat urna, nec pulvinar lectus magna ac nisl.'
  ),
  new Smartphone(
    4,
    'IPhone 11',
    'Apple',
    'https://d1eh9yux7w8iql.cloudfront.net/product_images/290068_07562224-72df-4a97-8655-a335db1f4a34.jpg',
    'Proin at auctor metus. Pellentesque consectetur elit nec dui tristique facilisis. Phasellus aliquam velit et mauris bibendum, at facilisis nisi tempus.'
  )
]

let id = 5
export class API {
  static async getAll (): Promise<Smartphone[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(smartPhones)
      }, 500)
    })
  }

  static async get (id: number): Promise<Smartphone> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const smartphone = smartPhones.find(item => item.id === id)

        if (!smartphone) {
          reject('Smartphone not found!')
        } else {
          resolve(smartphone)
        }
      }, 500)
    })
  }

  static async add (
    name: string = '',
    brand: string = '',
    image: string = '',
    description: string = ''
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // smartPhones.push(new Smartphone(id++, name, brand, image, description))
        smartPhones = [
          ...smartPhones,
          new Smartphone(id++, name, brand, image, description)
        ]
        resolve()
      }, 500)
    })
  }

  static async remove (id: number): Promise<Smartphone> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = smartPhones.findIndex(item => item.id === id)

        if (idx < 0) {
          reject('Smartphone not found!')
          return
        }

        const smartPhone = smartPhones.splice(idx, 1)

        resolve(smartPhone[0])
      }, 500)
    })
  }
}
