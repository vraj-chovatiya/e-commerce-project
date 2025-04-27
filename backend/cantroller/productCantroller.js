import productModel from "../models/porductModel.js";
import { v2 as cloudinary } from "cloudinary";
import axios from 'axios';

// Function to fetch products from Fake Store API
const fetchFakeStoreProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching from Fake Store API:", error);
    return [];
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      description,
      sizes,
      bestseller,
      price,
    } = req.body;

    // Check if files exist and assign them accordingly
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url; // Get the secure URL from Cloudinary
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
      isAdminProduct: true, // Flag to identify admin-added products
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    // Get products from our database
    const dbProducts = await productModel.find({});
    
    // Get products from Fake Store API
    const fakeStoreProducts = await fetchFakeStoreProducts();
    
    // Transform Fake Store products to match our model
    const transformedFakeStoreProducts = fakeStoreProducts.map(product => ({
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      subCategory: product.category,
      bestseller: false,
      sizes: ['S', 'M', 'L', 'XL'],
      image: [product.image],
      date: new Date().getTime(),
      isFakeStoreProduct: true
    }));
    
    // Combine products from both sources
    const allProducts = [...transformedFakeStoreProducts, ...dbProducts];
    
    res.json({ success: true, products: allProducts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    
    // Check if the product is from Fake Store API
    if (id.startsWith('fake_')) {
      return res.json({ success: false, message: "Cannot remove Fake Store products" });
    }
    
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if the product is from Fake Store API
    if (productId.startsWith('fake_')) {
      const fakeStoreId = productId.replace('fake_', '');
      const fakeStoreProducts = await fetchFakeStoreProducts();
      const fakeProduct = fakeStoreProducts.find(p => p.id.toString() === fakeStoreId);
      
      if (fakeProduct) {
        const transformedProduct = {
          _id: fakeProduct.id.toString(),
          name: fakeProduct.title,
          description: fakeProduct.description,
          category: fakeProduct.category,
          price: fakeProduct.price,
          subCategory: fakeProduct.category,
          bestseller: false,
          sizes: ['S', 'M', 'L', 'XL'],
          image: [fakeProduct.image],
          date: new Date().getTime(),
          isFakeStoreProduct: true
        };
        
        return res.json({ success: true, product: transformedProduct });
      }
    }
    
    // If not a Fake Store product, get from our database
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, singleProduct, removeProduct };
