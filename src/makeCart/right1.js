import _ from 'lodash'

export default () => ({
  items: [],
  addItem(product, count) {
    const existItem = _.find(this.items, (item) =>
      _.isEqual(item.product, product),
    )
    if (existItem) {
      existItem.count += count
    } else {
      this.items.push({ product, count })
    }
  },
  getItems() {
    return this.items
  },
  getCount() {
    return _.sumBy(this.items, (item) => item.count)
  },
  getCost() {
    return _.sumBy(this.items, (item) => item.product.price * item.count)
  },
})
