const db = require("../utils/db");

const registerBuyer = async ({ buyerName, buyerPhone, buyerEmail, buyerAddress, loyaltyPoints, paymentMode, buyerDob, membershipType, password }) => {
  try {
    const result = await db.run(
      'INSERT INTO Buyer(buyer_name, buyer_phone, buyer_email, buyer_address, loyalty_points, payment_mode, buyer_dob, membership_type, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [buyerName, buyerPhone, buyerEmail, buyerAddress, loyaltyPoints, paymentMode, buyerDob, membershipType, password]
    );

    if (result.lastID) {
      const newBuyer = await db.get('SELECT buyer_id, buyer_name FROM Buyer WHERE buyer_id = ?', [result.lastID]);
      return newBuyer;
    }
  } catch (error) {
    console.error('Error registering buyer:', error);
    throw error;
  }

  return null;
};

module.exports = { registerBuyer };
