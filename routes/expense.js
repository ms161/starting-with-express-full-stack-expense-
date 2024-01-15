const express=require('express')

const expenseController=require('../controllers/expense')

const router=express.Router()

router.post('/post-expense',expenseController.postExpense)

router.get('/get-expenses',expenseController.getExpenses)

router.post('/delete-expense/:expenseId',expenseController.postDelete)

router.post('/edit-expense/:expenseId',expenseController.editExpense)

module.exports=router