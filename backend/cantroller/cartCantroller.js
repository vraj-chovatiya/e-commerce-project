import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemid, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemid]) {
      if (cartData[itemid][size]) {
        cartData[itemid][size] += 1;
      } else {
        cartData[itemid][size] = 1;
      }
    } else {
      cartData[itemid] = {};
      cartData[itemid][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemid, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemid][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getUserCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {};
      console.log("Cart Data:", cartData); // Log the cart data being sent back
  
      res.json({ success: true, cartData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

export { addToCart, updateCart, getUserCart };
