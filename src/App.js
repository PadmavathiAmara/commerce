import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Headers';
import DisplayBar from './DisplayBar/DisplayBar';
import Categories from './Categories/Categories';
import { Box, Button, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 700,
   height: 600,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

function App() {
   const [allProducts, setAllProducts] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [categoryFilters, setCategoryFilters] = useState([]);
   const [categories, setCategories] = useState([]);
   const [open, setOpen] = useState(false);
   const [cartProds, setCartProds] = useState([]);
   const [minMax, setMinMax] = useState([0,Infinity]);
   const [rate, setRate] = useState(0);
   // alert(JSON.stringify(cartProds));
   let totalPrice = 0;
   const [payload, setPayload] = useState({
      cart : {
         title: "",
         id: "",
         qty: "",
         unitPrice: "",
      }
   });

   useEffect(() => {
      getData();
   }, []);

   const getData = async () => {
      await fetch('https://fakestoreapi.com/products')
         .then((res) => res.json())
         .then((data) => {
            setAllProducts(data);
            setFilteredProducts(data);
            const uniqueCategories = data.map((item) => item.category);
            setCategoryFilters([...new Set(uniqueCategories)])
         })
   }

   const onCategorySelect = (category, isChecked) => {
      console.log(category, isChecked)
      if (isChecked) {
         setCategories([...[category], ...categories]);
      }
      else {
         setCategories(categories.filter((item) => item !== category))
      }
   }

   useEffect(() => {
      if(categories.length>0 || (minMax[0] != 0 && minMax[1] != Infinity) || rate>0){
         console.log("Hello")
         const productsToShow = allProducts.filter((prod) => (categories.length>0 ? categories.includes(prod.category) : true) && ((minMax[0] != 0 && minMax[1] != Infinity) ? prod.price >= minMax[0] && prod.price <= minMax[1] : true) && (rate > 0 ? prod.rating.rate >= rate : true));
         setFilteredProducts(productsToShow);
      }
      else{
         setFilteredProducts(allProducts);
      }
   }, [categories, minMax, rate ]);

   const onPriceSelect = (min, max) => {
         setMinMax(min,max);
   }

   const onRatingSelect = (rating) => {
         setRate(rating);
   }

   const onSearchFilter = (searchValue) => {
      if (searchValue) {
         let searched = allProducts.filter((item) => ((item.category.toLowerCase()).includes(searchValue)) || ((item.title.toLowerCase()).includes(searchValue)))
         setFilteredProducts(searched);
      }
      else {
         setFilteredProducts(allProducts);
      }
   }

   const handleClose = () => setOpen(false);

   const onAddToCartClick = (product) => {
      if (cartProds.includes(product)) {
         // console.log("already present in cart");
         setCartProds(cartProds.map((pro) => {
            if (pro.id === product.id) {
               pro.quantity += 1;
            }
            return pro;
         }));
      }
      else {
         product.quantity = 1;
         setCartProds([...cartProds, product]);
         

          
         // console.log("first time in cart");
         // console.log(`qty ${qty}`);
      }
   }

   const onSubClick = (Id) => {
      let deleted = false;
      let subProd = cartProds.map((cartProd) => {
         if (cartProd.id == Id) {
            if(cartProd.quantity > 1){
               cartProd.quantity -= 1;
            } else {
               deleted = true;
               console.log(`deleted in map${deleted}`);
               onRemoveClick(Id);
            }
         }
         return cartProd;
      })
      console.log(`deleted after map${deleted}`);
      !deleted && setCartProds(subProd);
   }

   const onAddClick = (Id) => {
      let addProds = cartProds.map((cartProd) => {
         if (cartProd.id == Id) {
            cartProd.quantity += 1;
         }
         return cartProd;
      });
      setCartProds(addProds);
   }

   const onRemoveClick = (Id) => {
      console.log(`product in onRemoveClick ${Id}`);
      setCartProds(cartProds.filter((delPro) => {
         if (delPro.id !== Id) {
            return delPro;
         }
      }));
   }

   if (cartProds.length) {
      cartProds.map((cp) => {
         return totalPrice += cp.price * cp.quantity;
      });
   }

   // const onBuyNowClick = () => {
   //    // let payloadCopy = {...payload};
      
   //       cartProds.map((cartprod)=>{
   //          payload.cart.title = cartprod.title;
   //          payload.cart.id = cartprod.id;
   //          payload.cart.qty = cartprod.quantity;
   //          payload.cart.unitPrice = cartprod.price;
   //       });
   //       setPayload(Object.assign(payload));
   //    alert(JSON.stringify(payload));
   // }

   // console.log(payload);

   return (
      <>
         <Header onSearchFilter={onSearchFilter} setOpen={setOpen} cartProds={cartProds} />
         <div className="main-container">
            <Categories categoryFilters={categoryFilters} 
                        onCategorySelect={onCategorySelect} 
                        onPriceSelect={onPriceSelect} 
                        onRatingSelect={onRatingSelect} />
            <DisplayBar allProducts={filteredProducts} onAddToCartClick={onAddToCartClick} />
         </div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <div className='cartHeader'>Cart</div>
               {(cartProds.length) ? (<>
                     <div className='scrollDiv'>
                     {cartProds.map((prod) => {
                        return (
                           <>
                              <div className='cartBody'>
                                 <div>
                                    <div className='prodImgDiv'>
                                       <img src={prod.image} className='prodImg' />
                                    </div>
                                    <div className='cartButtons'>
                                       <button className='btns' onClick={() => onSubClick(prod.id)}>-</button>
                                       <button>{prod.quantity}</button>
                                       <button className='btns' onClick={() => onAddClick(prod.id)}>+</button>
                                    </div>
                                 </div>
                                 <div className='cartRight'>
                                    <div className='textDiv'>
                                       <h3>{prod.title.substr(0, 25)}{prod.title.length > 25 ? "..." : ""}</h3>
                                       <h3>{prod.category}</h3>
                                       <h3>$ {prod.price * prod.quantity}</h3>
                                    </div>
                                    <div className='removebtnDiv'>
                                       <button className='removebtn' onClick={() => onRemoveClick(prod.id)}><DeleteIcon /></button>
                                    </div>
                                 </div>
                              </div>
                           </>
                        )
                     })
                     }
                  </div>
                  <div className='cartFooter'>
                  <Button variant='contained' className='buynowBtn' onClick={()=>onBuyNowClick()}>Buy Now!</Button>
                  <h1>Total Price</h1>
                  <h1>$ {totalPrice.toFixed(2)}</h1>
               </div>
               </>
                 ):(
                  <div className='emptyCart'>
                     <img className='emptyCartImg' src='https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' />
                     <h3>Your Cart is empty!</h3>
                  </div>
                 )}
            </Box>
         </Modal>
      </>
   );
}
export default App;
