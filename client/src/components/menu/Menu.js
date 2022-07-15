import axios from 'axios'
import React, { useEffect, useState } from 'react'

import "./menu.css"

export default function Menu({cart, addCart}) {

    const [category, setCategory] = useState([])
    const [foodByCategorie, setFoodByCategorie] = useState([])
    const [defaultFoodByCategory, setDefaultFoodByCategory] = useState([])
   
   

    


    const getByCategory = async(id) => {
        
       await axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}food/category/`+ id ,
    
        })
        .then((res) => {
          
          console.log(res.data.data)
          
          setFoodByCategorie(res.data.data)
        
           
        })
    
        .catch((err) => {
            console.log(err)
        })
    }

   useEffect(() => {
    axios({
        method:"get",
        url:`${process.env.REACT_APP_API_URL}category/allcategory`,

    })
    .then((res) => {
      
      setCategory(res.data.data)
      
      
        
       
    })

    .catch((err) => {
        console.log(err)
    })
   }, [])


   useEffect(() => {
    const div = document.querySelector(".food-category");
    
    div.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        div.scrollLeft += evt.deltaY;
    });
    
       const burger = "6238bca1978df6979276c658"
     axios({
        method:"get",
        url:`${process.env.REACT_APP_API_URL}food/category/`+ burger ,

    })
    .then((res) => {
      
      console.log(res.data.data)
      setDefaultFoodByCategory(res.data.data)
      
    
       
    })

    .catch((err) => {
        console.log(err)
    })
   }, [])


        
   return (
    <>
        <div className="menu-title"  id="menu">
            <p className='our-menu'>Our menu</p>
            <p className='subtitle-menu'>Take a look about our menu</p>
        </div>

        <div className='menu'>
          {category.map((cat, index) => {
              return <div className="single-category" key={index} onChange={() => getByCategory(cat._id)} >
                      <input type="radio" name="category" id={cat.name} value={cat._id}  defaultChecked={cat.name === "Burger"} />
                      <label htmlFor={cat.name} ><p >{cat.name}</p> <img src={process.env.PUBLIC_URL + `/image/${cat.name}.png`} alt="" /></label>
                     
              </div>
          })}
        </div>
        <div className='food-category' >
            {foodByCategorie.length ===0 ? (defaultFoodByCategory.map((food, index)=> {
                              return <div className='test'>
                                  <div className='add' onClick={() =>addCart(food._id)}>+</div>
                                  <div className="single-food" >
                                      <img src={process.env.PUBLIC_URL + `/image/${food.name}.png`} alt="" width="260" height="260" />
                                      <span className='food-name'>{food.name}</span>


                                      <span className='food-description' >{food.description}</span>


                                      <p className='price'><span className='price-food'>$</span> {food.price}</p>

                                  </div>

                              </div>
                          })) : ( foodByCategorie.map((food, index)=> {
                              return <div className='test'>
                                  <div className='add' onClick={() =>addCart(food._id)}>+</div>
                                  <div className="single-food" >
                                      <img src={process.env.PUBLIC_URL + `/image/${food.name}.png`} alt="" width="260" height="260" />
                                      <span className='food-name'>{food.name}</span>


                                      <span className='food-description' >{food.description}</span>


                                      <p className='price'><span className='price-food'>$</span> {food.price}</p>

                                  </div>

                              </div>
                          }))}
                         
                      </div>
    </>
)}

 

