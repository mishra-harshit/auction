const BiddingClass = require('../../../services/Biddings/Biddings')

const biddings = new BiddingClass()
const controller = {}

controller.getAll = async (req, res) => {
  const { ProductId } = req.params
  const filter = {
    productId: ProductId
  }
  const bids = await biddings.getAll(filter)
  res.json(bids)
}

controller.getBySellerId = async (req, res) => {
  const { sellerId } = req.params
  const filter = {
    sellerId,
    status: 'open'
  }
  const bids = await biddings.getAll(filter)
  res.json(bids)
}

controller.customerCart = async (req, res) => {
  const { id } = req.params
  const filter = {
    customerId: id,
    status: 'approved'
  }
  const bids = await biddings.getAll(filter)
  res.json(bids)
}

controller.approveBid = async (req, res) => {
  try {
    const { id } = req.params
    const filter = {
      _id: id
    }
    const bids = await biddings.approve(filter)
    res.json(bids)
  } catch (err) {
    res.status(400).json({ message: 'Cannot approve bid' })
  }
}

// controller.getById = async (req, res) => {
//   const { id } = req.params
//   const item = await biddings.getById(id)
//   res.json(item)
// }

controller.create = async (req, res) => {
  try {
    const { data } = req.body
    const success = await biddings.create(data)
    if (!success) res.status(400).json({ message: 'Cannot create product' })
    res.json({ message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: 'Cannot create product' })
  }
}

module.exports = controller
