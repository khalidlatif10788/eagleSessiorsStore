import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import ReviewSection from '../components/reviews/ProductReview';
import ProductList from '../components/productList/ProductList';
import ContactForm from '../components/sections/Forme';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../redux/productSlice/getsingleProductSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleSku } from '../redux/productSlice/getSingleSkuSlice';
import { getAllReviews } from '../redux/reviewSlice.jsx/getAllReviews';
import { MoonLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { toggle } from '../redux/cartSlice/addToCartToggle';

const ProductPage = () => {
  let {id}=useParams();
  let navigate=useNavigate()
  
  
  let dispatch=useDispatch();
  let {isProductLoading,product,skus}=useSelector((state)=>state.getSingleProduct)
  let {isLoading,sku}=useSelector((state)=>state.getSingleSku)
  let {reviews}=useSelector((state)=>state.getAllReviewsUser)
  console.log(skus?.[0]?.image?.url);
  useEffect(()=>{
    dispatch(getSingleProduct(id)).then((res)=>{
      console.log(res);
      setSelectedColor(res.payload?.product?.colors?.[0]?.color)
      setSelectedSize(res.payload?.product?.sizes?.[0]?.size)
      setSelectedVariant(res.payload?.product?.varients?.[0]?.varient)
      
    })
    dispatch(getAllReviews()).then((res)=>{
      console.log(res);
    })
    
    
  },[])

  
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // State management
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("description");

  const [skuId,setSkuId]=useState("")
  useEffect(() => {
    const parts =
      `${selectedColor || ""}${selectedSize || ""}${selectedVariant || ""}`.replace(
        /\s+/g,
        ""
      );
    if (parts) {
      setSkuId(parts);
    } else if (skus?.length && skus[0]?.skuId) {
      setSkuId(skus[0].skuId);
    } else {
      setSkuId("");
    }
  }, [selectedColor, selectedSize, selectedVariant, skus]);
  


  useEffect(() => {
    const key = (skuId || "").replace(/\s+/g, "");
    if (!key || !id) return;
    dispatch(getSingleSku(`productId=${id}&skuId=${key}`));
  }, [skuId, id, dispatch]);

  const activeSku = sku || skus?.[0];

  // Get all available SKUs for thumbnail display
 


  // Accordion component
  const Accordion = ({ title, id, children }) => (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpenSection(openSection === id ? '' : id)}
        className="flex justify-between items-center w-full py-4"
      >
        <span className="font-medium">{title}</span>
        <FaChevronDown 
          className={`w-5 h-5 transition-transform ${
            openSection === id ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {openSection === id && (
        <div className="pb-4 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );

  // Color selector component
  const ColorOption = ({ color }) => (
    <button
      onClick={() => setSelectedColor(color)}
      className={`relative px-4 py-2 rounded-full border-2 transition-all ${
        selectedColor === color 
          ? 'border-black ring-2 ring-black ring-offset-2 bg-black text-white'
          : 'border-gray-200 hover:border-gray-400 text-gray-700'
      }`}
    >
      {color}
      {selectedColor === color && (
        <svg
          className="w-4 h-4 absolute -top-1 -right-1 text-black bg-white rounded-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );


  const SizeOption = ({ size }) => (
    <button
      onClick={() => setSelectedSize(size)}
      className={`relative px-4 py-2 rounded-full border-2 transition-all ${
        selectedSize === size 
          ? 'border-black ring-2 ring-black ring-offset-2 bg-black text-white'
          : 'border-gray-200 hover:border-gray-400 text-gray-700'
      }`}
    >
      {size}
      {selectedSize === size && (
        <svg
          className="w-4 h-4 absolute -top-1 -right-1 text-black bg-white rounded-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );

  let addToCart = () => {
    if (quantity <= 0) {
      console.error("Quantity must be greater than 0.");
      return;
    }
  
    try {
      // Get existing orders from localStorage or initialize an empty array
      let order = JSON.parse(localStorage.getItem("order")) || [];
  
      // Check if the product with the same productId and skuId already exists
      let existingIndex = order.findIndex(
        (orderr) => orderr._id === activeSku?._id
      );
  
      if (existingIndex !== -1) {
        // If the product exists, update its quantity
        order[existingIndex].quantity = quantity;
      } else {
        // If the product does not exist, add it to the cart
        order.push({
          _id:activeSku?._id,
          quantity,
        });
      }
  
      // Update localStorage with the modified order array
      localStorage.setItem("order", JSON.stringify(order));
      toast.success("Product Added to Cart.")
      dispatch(toggle())
    } catch (error) {
      console.error("Failed to update the cart:", error);
    }
  };
  let buyNowHandler = () => {
    if (quantity <= 0) {
      console.error("Quantity must be greater than 0.");
      return;
    }
  
    try {
      // Get existing orders from localStorage or initialize an empty array
      let order = JSON.parse(localStorage.getItem("order")) || [];
  
      // Check if the product with the same productId and skuId already exists
      let existingIndex = order.findIndex(
        (orderr) => orderr._id === activeSku?._id
      );
  
      if (existingIndex !== -1) {
        // If the product exists, update its quantity
        order[existingIndex].quantity = quantity;
      } else {
        // If the product does not exist, add it to the cart
        order.push({
          _id:activeSku?._id,
          quantity,
        });
      }
  
      // Update localStorage with the modified order array
      localStorage.setItem("order", JSON.stringify(order));
      toast.success("Product Added to Cart.")
      dispatch(toggle())
      navigate("/checkout")
    } catch (error) {
      console.error("Failed to update the cart:", error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {isProductLoading ? (
    <div className="sweet-loading  h-screen flex justify-center items-center">
      <MoonLoader
        color="#ff0000"
        cssOverride={{}}
        loading={isProductLoading}
        size={60}
        speedMultiplier={2}
      />
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="sticky top-4 space-y-4">
          <div className="w-full relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={
                activeSku?.image?.url ||
                skus?.[0]?.image?.url ||
                product?.images?.[0]?.url
              }
              alt="Product"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '450px' }}
            />
          </div>
          <div className='flex gap-x-3 overflow-x-scroll'>

            {skus?.map((row) => (
                <div key={row?._id} onClick={()=>setSkuId(row?.skuId)} className='border border-black'>
        <img src={row?.image?.url} className='h-20' alt="" />

            </div>
              ))}

          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          {product?.rating > 0 ? (
            <div className="flex items-center space-x-2">
              {[...new Array(Math.ceil(product?.rating)).keys()].map((star) => (
                <span key={star} className="text-yellow-400 text-xl">★</span>
              ))}
              <span className="text-sm text-gray-600">({product?.numberOfReviews} reviews)</span>
            </div>
          ) : null}
          <h1 className="text-2xl font-bold mt-2 break-words">
            {product?.name}
          </h1>
          <p className="text-xl mt-2">£ {Number(activeSku?.priceAfterDiscount ?? 0).toLocaleString()}</p>
          {Number(activeSku?.price ?? 0) !== Number(activeSku?.priceAfterDiscount ?? 0) ? (
            <p className="text-lg mt-2 line-through">£ {Number(activeSku?.price ?? 0).toLocaleString()}</p>
          ) : null}
          <p className="text-sm text-gray-600 mt-1">SKU: {activeSku?.skuId ?? skuId} | Stock: {activeSku?.stock ?? "—"}</p>
        </div>

        <div className="space-y-6">
          {product?.varients?.length>0?<div>
            <h3 className="font-medium mb-3">Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {product?.varients?.map((varient) => (
                <button
                  key={varient?._id}
                  onClick={() => setSelectedVariant(varient?.varient)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    selectedVariant === varient?.varient
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {varient?.varient}
                </button>
              ))}
            </div>
          </div>:null}

          {product?.colors?.length > 0 ? (
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex gap-4">
                {product?.colors?.map((color) => (
                  <ColorOption key={color?._id} color={color?.color} />
                ))}
              </div>
            </div>
          ) : null}

          {product?.sizes?.length > 0 ? (
            <div>
              <h3 className="font-medium mb-3">Sizes</h3>
              <div className="flex gap-4">
                {product?.sizes?.map((size) => (
                  <SizeOption key={size?._id} size={size?.size} />
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center border rounded-lg w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border-r hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full text-center focus:outline-none"
                max={activeSku?.stock}
              />
              <button
                onClick={() => setQuantity(Math.min(activeSku?.stock || 1, quantity + 1))}
                className="px-3 py-2 border-l hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
          onClick={addToCart}
            className="w-full py-3 px-4 border border-black bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:border-gray-300"
            disabled={!activeSku?.stock}
          >
            Add to Cart
          </button>
          <button 
          onClick={buyNowHandler}
            className="w-full py-3 px-4 border border-black rounded-lg hover:bg-gray-50 transition-colors disabled:border-gray-300 disabled:text-gray-300"
            disabled={!activeSku?.stock}
          >
            Buy Now
          </button>
        </div>

        <div className="space-y-0">
          <Accordion title="Product Description" id="description">
            <div className="space-y-4">
              {product?.description}
            </div>
          </Accordion>

          <Accordion title="Shipping Information" id="shipping">
            <p>Free worldwide shipping on all orders during our sale period.</p>
            <p>Please allow for customs clearance time variations in delivery estimates.</p>
          </Accordion>

          <Accordion title="Return Policy" id="returns">
            <p>We offer a money back guarantee on all purchases. If you're unhappy with your purchase, please contact us via email for return assistance.</p>
          </Accordion>

          <Accordion title="Scissor Care" id="care">
            <p>Check and adjust scissor tension after each use to maintain optimal performance.</p>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>Clean after each use</li>
              <li>Store in provided case</li>
              <li>Regular maintenance recommended</li>
            </ul>
          </Accordion>
        </div>
      </div>
    </div>
  )}

  {reviews?.length > 0 ? <ReviewSection Reviews={reviews} /> : null}
  <ProductList />
  <ContactForm />
</div>

  );
};

export default ProductPage;