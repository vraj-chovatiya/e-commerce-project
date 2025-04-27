import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";  
// import Serchbar from "../components/Serchbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currancy = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // Add to cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  // Get cart count
  const getCartCount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item];
          }
        } catch (error) {
          // Handle error silently
        }
      }
    }
    return totalAmount;
  }

  // Update cart quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  // Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items || product.id === items);
      if (!itemInfo) continue;

      for (const size in cartItems[items]) {
        const quantity = cartItems[items][size];
        if (quantity > 0) {
          try {
            totalAmount += itemInfo.price * quantity;
          } catch (error) {
            console.error("Error calculating total amount:", error);
          }
        }
      }
    }
    return totalAmount;
  };

  // Fetch products from Fake Store API
  const getFakeStoreProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.data) {
        // Transform Fake Store API data to match our product model
        const transformedProducts = response.data.map(product => ({
          _id: product.id.toString(), // Convert to string to match MongoDB _id format
          name: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          subCategory: product.category, // Using category as subCategory for Fake Store products
          bestseller: false,
          sizes: ['S', 'M', 'L', 'XL'], // Default sizes for Fake Store products
          image: [product.image], // Convert single image to array format
          date: new Date().getTime(),
          isFakeStoreProduct: true // Flag to identify Fake Store products
        }));
        return transformedProducts;
      }
      return [];
    } catch (error) {
      console.error("Error fetching from Fake Store API:", error);
      return [];
    }
  };

  // Get products from our backend
  const getBackendProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        return response.data.products;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return [];
    }
  };

  // Combine products from both sources
  const getProductsData = async () => {
    try {
      // Get products from both sources
      const [fakeStoreProducts, backendProducts] = await Promise.all([
        getFakeStoreProducts(),
        getBackendProducts()
      ]);
      
      // Combine products from both sources
      setProducts([...fakeStoreProducts, ...backendProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }
  }, []);

  const value = {
    products,
    currancy,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;