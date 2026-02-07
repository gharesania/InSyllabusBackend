const Cart = require("../models/Cart");
const Subject = require("../models/Subject");

// Pricing Calculator

const calculatePricing = (cart, discountPercent = 0) => {
  const totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const payableAmount = totalAmount - discountAmount;

  cart.pricing.totalAmount = totalAmount;
  cart.pricing.discountPercent = discountPercent;
  cart.pricing.discountAmount = discountAmount;
  cart.pricing.payableAmount = payableAmount;
};

// Add Subject to Cart

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subjectId } = req.body;

    // 1. Validate subject
    const subject = await Subject.findOne({
      _id: subjectId,
      status: "Active",
      type: "Paid",
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    if (subject.price === 0) {
      return res
        .status(400)
        .json({ message: "Free subjects do not require cart" });
    }

    // 2. Find or create cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        pricing: {},
      });
    }

    // 3. Prevent duplicate
    const alreadyAdded = cart.items.find(
      (item) => item.subject.toString() === subjectId,
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: "Subject already in cart" });
    }

    // 4. Add subject
    cart.items.push({
      subject: subject._id,
      subjectName: subject.name, // ✅ FIXED
      price: subject.price,
    });

    // 5. Pricing
    calculatePricing(cart, 25);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Subject added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Cart

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Subject

exports.removeFromCart = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.subject.toString() !== subjectId,
    );

    calculatePricing(cart, cart.pricing.discountPercent);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Subject removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear Cart

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
