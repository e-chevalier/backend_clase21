import faker from 'faker'

faker.locale = 'es'

const generateProduct = () => {

    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.productAdjective(),
        thumbnail: faker.image.business(),
        price: faker.commerce.price(),
        stock: faker.commerce.price(0, 100, 0)
    }

}


export { generateProduct }
