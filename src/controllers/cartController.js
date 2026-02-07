const Cart = require("../models/Cart");
const Course = require("../models/Course");

//calculate Pricing

const calculatePricing = (cart, discountPercent = 0) => {
  const totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);

  const payableAmount = totalAmount - discountAmount;

  cart.pricing.totalAmount = totalAmount;
  cart.pricing.discountPercent = discountPercent;
  cart.pricing.discountAmount = discountAmount;
  cart.pricing.payableAmount = payableAmount;
};

//Add course to cart

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        pricing: {},
      });
    }

    // Prevent duplicate course
    const alreadyAdded = cart.items.find(
      (item) => item.course.toString() === courseId,
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: "Course already in cart" });
    }

    cart.items.push({
      course: course._id,
      courseName: course.title,
      price: course.price,
    });

    // Apply default discount (example: 25%)
    calculatePricing(cart, 25);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Course added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get user cart

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: null,
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Remove course from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.course.toString() !== courseId,
    );

    // Recalculate pricing after removal
    calculatePricing(cart, cart.pricing.discountPercent);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Course removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart (after payment success)

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
