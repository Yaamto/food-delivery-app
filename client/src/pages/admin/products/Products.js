import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalEditFood from '../../../components/modal/ModalEditFood'
import SideBar from '../../../components/sidebar/SideBar'
import LoadingSpinner from '../../../components/spinner/Spinner'
import AddProductModal from './AddProductModal'
import { Notyf } from 'notyf';
import "./products.css"
export default function Products() {
    const [allFood, setAllFood] = useState([])
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [singleFood, setSingleFood] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const getFood = async() => {

            await axios({
                method:"get",
                url:`${process.env.REACT_APP_API_URL}food/allfood`,
                
            })
            .then((res) => {
                console.log(res.data.data)
                setAllFood(res.data.data)
                setTimeout(() => {
                    setLoading(true)
                }, 300);
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getFood()
       }, [])

       useEffect(() => {
        axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}category/allcategory`,
    
        })
        .then((res) => {
          console.log(res.data.data)
          setCategories(res.data.data)
          
          
            
           
        })
    
        .catch((err) => {
            console.log(err)
        })
       }, [])


       const handleDelete = async(id, i) => {
           setLoading(false)
        await axios({
            method:"delete",
            url:`${process.env.REACT_APP_API_URL}food/delete/`+ id,
            withCredentials: true,
            headers : {
                'Access-Control-Allow-Credentials' : true,
                
               } 
    
        })
        .then((res) => {
          console.log(res)
          if(res.data.msg){
              localStorage.removeItem("userInfo")
              localStorage.removeItem("userId")
              navigate('/')
          }else {
                setTimeout(() => {
                    setLoading(true)
                }, 200)
                const notyf = new Notyf({
                    duration: 2000,
                  position: {
                    x: 'center',
                    y: 'top',
                  }
                  });
                notyf.success('Product deleted with success');
              let newFood = [...allFood]
              
              newFood.splice(i, 1)
              setAllFood(newFood)
            }
        })
        .catch((err) => {
            console.log(err)
        })
       }

       


       if(loading === false){
           return <LoadingSpinner />
       }
  return (
      <div>
          <SideBar />
          <button className="add-product" onClick={() => setShow(true)}>Add product</button>
          <div className="all-food">

              <table>
                  <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th>Action</th>
                  </tr>
                  {allFood.map((food, i) => {
                      return <tr key={i}>
                          
                          <td>{food.name}</td>
                          <td>{food.description}</td>
                          <td>${food.price}</td>
                          <td>{food.category.name}</td>
                          <td>Image</td>
                          <td><img src={process.env.PUBLIC_URL + "/image/pencil.png"} alt="edit" height="35" width="35" onClick={() => {setShowEdit(true); setSingleFood(food)}}/> <img src={process.env.PUBLIC_URL + "/image/remove.png"} alt="remove" height="35" width="35" onClick={() => handleDelete(food._id, i)} /></td>
                         
                      </tr>
                      
                  })}


              </table>
          </div>
          <AddProductModal categories={categories} show={show} onClose={() => setShow(false)} allFood={allFood} setAllFood={setAllFood} />
          <ModalEditFood showEdit={showEdit} onClose={() => setShowEdit(false)} categories={categories} singleFood={singleFood} setSingleFood={setSingleFood}/>
      </div>
  )
}
