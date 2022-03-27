import React, {useEffect, useState} from 'react'
import axios from "axios"
import "./modalEditFood.css"
import {Notyf} from "notyf"
export default function ModalEditFood({showEdit, onClose, categories, singleFood, setSingleFood}) {
  
    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()

    
 
    
   const handleEdit = async(id) => {
    await axios({
        method:"put",
        url:`${process.env.REACT_APP_API_URL}food/edit/` +id,
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
        
        const notyf = new Notyf({
            duration: 2000,
          position: {
            x: 'center',
            y: 'top',
          }
          });
          singleFood.name = name
          singleFood.description= description
          singleFood.price = price
          singleFood.category._id = category
        notyf.success('Product edited with success');
       
      
      
    })
    .then(() => onClose())
            
    .catch((err) => {
      console.log(err)
   })
   }

    if(!showEdit){
        return null
    }
  return (
      <div className='modal'onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

              <div className="header-modal" >
                  <h1>Edit product</h1>
                  <button onClick={onClose}>X</button>
              </div>
              <div className="body-modal">
                  <input type="text" id='name' name='name' placeholder='Name...' onChange={(e) => setName(e.target.value)} defaultValue={singleFood.name} />
                  <input type="text" id='description' name='description' placeholder='Description...' onChange={(e) => setDescription(e.target.value)} defaultValue={singleFood.description}/>
                  <input type="text" id='price' name='price' placeholder='Price...'onChange={(e) => setPrice(e.target.value)} defaultValue={singleFood.price}/>
                  <div className="categories-modal">
                      {categories.map((cat, index) => {
                          return <div className="single-category" key={index} >
                              <input type="radio" name="category" id={cat.name} value={cat._id} onChange={(e) => setCategory(e.target.value)} defaultChecked={singleFood.category.name ===cat.name} />
                              <label htmlFor={cat.name} ><p >{cat.name}</p> <img src={process.env.PUBLIC_URL + `/images/${cat.name}.png`} alt="" /></label>

                          </div>
                      })}
                  </div>
              </div>
              <div className="footer-modal">
                  <button onClick={onClose}>Back</button>
                  <button onClick={() => handleEdit(singleFood._id)}>Confirm</button>
              </div>
          </div>

      </div>
  )
}

