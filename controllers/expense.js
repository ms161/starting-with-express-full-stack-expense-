const Expenses = require('../models/expenses')


exports.postExpense = (req, res) => {
    console.log(req.body)

    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    Expenses.create({
        amount,
        description,
        category
    })
        .then((result) => {
            // console.log('this is post data', result.dataValues)
            res.json(result.dataValues)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })

}
exports.getExpenses = (req, res) => {

    Expenses.findAll()
        .then((resp) => {
            res.json(resp)
        })
        .catch(err => {
            console.log(err)
        })

}
exports.postDelete = (req, res) => {
    const id = req.params.expenseId
    console.log('this is params', id)
    Expenses.findByPk(id)
        .then((prod) => {
            return prod.destroy()
        })
        .then(r => {
            console.log(res)
            res.json({ sucess: 'Expense Delete succesfull' })
        })
        .catch(err => {
            console.log(err)
            res.json({ sucess: err })
        })
}

exports.editExpense = (req, res) => {
    const id = req.params.expenseId
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    console.log(amount,description,category)
    Expenses.findByPk(id)
        .then((prod) => {
                prod.amount = amount,
                prod.description = description,
                prod.category = category
            return prod.save()
        })
        .then((resp) => {
            res.json({ data: resp })
        })
        .catch(err => { console.log(err) })

}

