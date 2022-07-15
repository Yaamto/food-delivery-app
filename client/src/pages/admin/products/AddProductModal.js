import axios from 'axios'
import React , {useState}from 'react'
import "./addProductModal.css"
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function AddProductModal({categories, show, onClose, allFood, setAllFood}) {

    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()

    const handleCreate = async() => {
        await axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}food/create`,
            withCredentials:true,
            data: {
                name: name,
                category: category,
                description: description,
                price: price
                
         },
         headers : {
           'Access-Control-Allow-Credentials' : true,
           
          }  
        })
        .then((res) => {
            console.log(res)
            const newArr = [...allFood]
            newArr.unshift(res.data.data)
            console.log(newArr)
            setAllFood(newArr)
            const notyf = new Notyf({
                duration: 2000,
              position: {
                x: 'center',
                y: 'top',
              }
              });
            notyf.success('Product added with success');
           
          
          
        })
        .then(() => onClose())
                
        .catch((err) => {
          console.log(err)
       })
    }

    if(!show){
        return null
    }

    
  return (
      <div className='modal'onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

              <div className="header-modal" >
                  <h1>Add a product</h1>
                  <button onClick={onClose}>X</button>
              </div>
              <div className="body-modal">
                  <input type="text" id='name' name='name' placeholder='Name...' onChange={(e) => setName(e.target.value)} />
                  <input type="text" id='description' name='description' placeholder='Description...' onChange={(e) => setDescription(e.target.value)}/>
                  <input type="text" id='price' name='price' placeholder='Price...'onChange={(e) => setPrice(e.target.value)} />
                  <div className="categories-modal">
                      {categories.map((cat, index) => {
                          return <div className="single-category" key={index} >
                              <input type="radio" name="category" id={cat.name} value={cat._id} onChange={(e) => setCategory(e.target.value)} />
                              <label htmlFor={cat.name} ><p >{cat.name}</p> <img src={process.env.PUBLIC_URL + `/image/${cat.name}.png`} alt="" /></label>

                          </div>
                      })}
                  </div>
              </div>
              <div className="footer-modal">
                  <button onClick={onClose}>Back</button>
                  <button onClick={handleCreate}>Confirm</button>
              </div>
          </div>

      </div>
  )
}
