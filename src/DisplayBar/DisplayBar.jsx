import { Button, Rating, Tooltip } from '@mui/material';
import './DisplayBar.css';
import Grid from '@mui/material/Grid';
export const DisplayBar = ({ allProducts, onAddToCartClick }) => {
  return (
    <div className='display-products'>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {allProducts.map((product) => (
          <Grid item xs={2} sm={4} md={4}>
            <div className='card'>
              <div className='product-image'>
                <img className='image' src={product.image} />
              </div>
              <div className='product-details'>
                <div className='prod-category'>{product.category}</div>
                <div className='prod-title'><Tooltip title={product.title} arrow>
                  <Button>{product.title.substr(0, 30)}{product.title.length > 30 ? "..." : ""}</Button>
                </Tooltip></div>
                <div className='prod-rating'>
                  <Rating name="read-only" value={product.rating.rate} readOnly />
                </div>
                <div className='prod-price'>$ {product.price}</div>
              </div>
              <div className='buttons'>
                {/* <Button className='btn' >-</Button> */}
                <Button className='btn' onClick={()=>onAddToCartClick(product)}>AddToCart</Button>
                {/* <Button className='btn'>+</Button> */}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default DisplayBar;