import React, { useState } from 'react';

const RegisterForm = ({ handleRegistration }) => {
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    buyerAddress: '',
    loyaltyPoints: 0,
    paymentMode: '',
    buyerDob: '',
    membershipType: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerFunction = async (event) => {
    event.preventDefault();

    try {
      await handleRegistration(formData);
      setFormData({
        buyerName: '',
        buyerPhone: '',
        buyerEmail: '',
        buyerAddress: '',
        loyaltyPoints: 0,
        paymentMode: '',
        buyerDob: '',
        membershipType: '',
        password: '',
      });
      setError('');
    } catch (exception) {
      console.log(exception);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Register</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={registerFunction}>
            <div className="form-group">
              <label htmlFor="buyerName">Buyer Name:</label>
              <input
                type="text"
                className="form-control"
                id="buyerName"
                name="buyerName"
                value={formData.buyerName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyerPhone">Buyer Phone:</label>
              <input
                type="text"
                className="form-control"
                id="buyerPhone"
                name="buyerPhone"
                value={formData.buyerPhone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyerEmail">Buyer Email:</label>
              <input
                type="email"
                className="form-control"
                id="buyerEmail"
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyerAddress">Buyer Address:</label>
              <input
                type="text"
                className="form-control"
                id="buyerAddress"
                name="buyerAddress"
                value={formData.buyerAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="loyaltyPoints">Loyalty Points:</label>
              <input
                type="number"
                className="form-control"
                id="loyaltyPoints"
                name="loyaltyPoints"
                value={formData.loyaltyPoints}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMode">Payment Mode:</label>
              <input
                type="text"
                className="form-control"
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyerDob">Buyer Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                id="buyerDob"
                name="buyerDob"
                value={formData.buyerDob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="membershipType">Membership Type:</label>
              <input
                type="text"
                className="form-control"
                id="membershipType"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
