
const Cart = require('../models/cart');
const User = require('../models/user');
const Profile = require('../models/profile');

exports.showProfileCart = async (req, res) => {
  try{
    const cart = await Cart.findOne({userId:req.Userid, profileId:req.Profileid})
    if(!cart){
      return res.status(404).send({ message: 'Cart not found' })
    }
    res.send(cart)
  }catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .send({ message: error.message || "Error fetching profile" });
  }
  };

  //add product to cart

exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const userId = req.Userid;
        const profileId = req.Profileid;

        let cart = await Cart.findOne({ userId, profileId });


        if (cart) {

            const cartItem = cart.items.find(item => item.product.toString() === product);

            if (cartItem) {

                cartItem.quantity += quantity;
            } else {
                cart.items.push({ product, quantity });
            }


            cart = await cart.save();
        } else {
            cart = new Cart({
                userId,
                profileId,
                items: [{ product, quantity }]
            });
            cart = await cart.save();
        }

        console.log(cart);
        res.json({ message: 'Item added to cart successfully', data: cart });
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).send({ message: 'Error adding item to cart' });
    }
}



exports.decrementCartItem = async (req, res) => {
    try {
        const { product } = req.body;
        let cart = await Cart.findOne({ userId:req.Userid, profileId:req.Profileid });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.product.toString() === product);

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            cart.items = cart.items.filter(item => item.product.toString() !== product);
        }

        cart = await cart.save();

        console.log(cart);
        res.json({ message: 'Item quantity decremented successfully', data: cart });
    } catch (err) {
        console.error('Error decrementing item quantity:', err);
        res.status(500).send({ message: 'Error decrementing item quantity' });
    }
}

exports.deleteItem = async (req,res)=>{
    try{
        const { product } = req.body;
        let cart = await Cart.findOne({ userId:req.Userid, profileId:req.Profileid });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.findIndex(item => item.product.toString() === product);

        if (cartItem === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

            cart.items.splice(cartItem, 1);
        cart = await cart.save();
        console.log(cart);
        res.json({ message: 'Item removed successfully', data: cart });
    }catch (err) {
        console.error('Error decrementing item quantity:', err);
        res.status(500).send({ message: 'Error decrementing item quantity' });
    }
}