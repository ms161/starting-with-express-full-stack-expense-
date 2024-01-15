import { useEffect, useState } from "react"
import axios from 'axios'
import { useRef } from "react"
function Expenses() {
    const [amount, setAmount] = useState('')
    const [description, setDesc] = useState('')
    const [category, setCategory] = useState('food')
    const [data, setData] = useState([])
    const [isEditing, setIsEditing] = useState(0)


    const amountRef = useRef('')
    const descRef = useRef('')
    const catRef = useRef('')

    const handleAmount = (e) => {
        setAmount(e.target.value)

    }
    const handleDesc = (e) => {
        setDesc(e.target.value)

    }
    const handleOpt = (e) => {
        console.log(e.target.value, 'op')
        setCategory(e.target.value)

    }

    const postData = async (e) => {
        e.preventDefault()
        let obj = {
            amount,
            description,
            category
        }
        console.log(obj)
        const response = await axios.post('http://localhost:5000/post-expense', obj)
        console.log(response.data)

        setData(p => {
            return [...p, response.data]
        })


    }

    async function getData() {
        const response = await axios.get('http://localhost:5000/get-expenses')
        console.log(response.data)
        setData(p => [...response.data])

    }




    useEffect(() => {
        getData()
    }, [])


    const deleteExpense = async (e, id) => {
        e.target.parentNode.remove()
        const response = await axios.post(`http://localhost:5000/delete-expense/${id}`, { id: id })

    }
    const editExpense = async (id) => {
        const editedData = data.map((ele) => {
            console.log(id)
            if (ele.id == id) {
                return {
                    amount: amountRef.current.value,
                    description: descRef.current.value,
                    category: catRef.current.value

                }
            }
            else {
                return ele
            }
        })
        setData(editedData)
        let obj={
            amount: amountRef.current.value ,
            description: descRef.current.value,
            category: catRef.current.value
        }
        amountRef.current.value =null
        descRef.current.value = null 
        catRef.current.value = null 
        const response=axios.post(`http://localhost:5000/edit-expense/${id}`,obj)
        console.log(response)

    }

    const edit = (ele) => {
        setIsEditing(ele.id)
        console.log(ele)
        amountRef.current.value = ele.amount
        descRef.current.value = ele.description
        catRef.current.value = ele.category


    }
    return (
        <div style={{width:'50%',margin:'auto'}}>
            <form  onSubmit={postData} action="">
                <input ref={amountRef} onChange={handleAmount} name="amount" type="text" placeholder="Amount" />
                <input ref={descRef} onChange={handleDesc} type="text" name="desc" placeholder="Description" />
                <select ref={catRef} onChange={handleOpt} name="" id="">
                    <option value="food">food</option>
                    <option value="electricity">electricity</option>
                </select>
                <button>Add Expense</button>

            </form>
            <table  >
                <thead style={{border:'2px solid black'}}>

                    <tr style={{border:'2px solid black'}}>
                        <th style={{borderBottom:'2px solid black',padding:'10px'}}>Amount</th>
                        <th  style={{borderBottom:'2px solid black',padding:'10px'}}>Description</th>
                        <th   style={{borderBottom:'2px solid black',padding:'10px'}}>Category</th>
                    </tr>
                </thead>
                <tbody style={{border:'2px solid black'}}>

                    {data.map(ele => {
                        return <>

                            <tr  key={ele.id} style={{ borderCollapse: 'collapse', border: '2px solid black' }}>
                                <td  style={{borderBottom:'2px solid black',padding:'10px'}}>{ele.amount}</td>
                                <td  style={{borderBottom:'2px solid black',padding:'10px'}}>{ele.description}</td>
                                <td  style={{borderBottom:'2px solid black',padding:'10px'}}>{ele.category}</td>
                                <button style={{cursor:'pointer',width:'7rem', borderRadius:'66px',border:'none',padding:'15px',textAlign:'center',backgroundColor:'red',color:'white',fontWeight:'bolder'}} onClick={(e) => { deleteExpense(e, ele.id) }}>Delete</button>
                                <button style={{marginLeft:'1rem',cursor:'pointer',width:'7rem', borderRadius:'66px',border:'none',padding:'15px',textAlign:'center',backgroundColor:'gray',color:'white',fontWeight:'bolder'}} onClick={(e) => { edit(ele) }}>Edit</button>
                                {isEditing == ele.id && <button style={{marginLeft:'1rem',cursor:'pointer',width:'7rem', borderRadius:'66px',border:'none',padding:'15px',textAlign:'center',backgroundColor:'green',color:'white',fontWeight:'bolder'}}  onClick={() => { editExpense(ele.id) }}>Update</button>}
                            </tr>
                        </>
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default Expenses

