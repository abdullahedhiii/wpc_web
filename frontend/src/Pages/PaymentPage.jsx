
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, Calendar, Lock, CheckCircle, User, Shield, Clock, CreditCardIcon } from 'lucide-react';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvc: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || "";
      value = value.substring(0, 19); // Limit to 16 digits + 3 spaces
    }
    
    // Format expiry date
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      value = value.substring(0, 7);
    }
    
    // Limit CVC to 3 digits
    if (name === "cvc") {
      value = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 2000);
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Payment",
      description: "256-bit encryption for your data"
    },
    {
      icon: Clock,
      title: "Instant Access",
      description: "Get immediate access after payment"
    },
    {
      icon: CreditCardIcon,
      title: "Multiple Payment Options",
      description: "Credit/Debit cards accepted"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
                <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Complete Your Registration
          </h1>
          <p className="text-lg text-gray-600">
            One-time payment for lifetime access to HR Solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
              <div className="flex gap-2">
                <img src="/images/visaCard.png" alt="Visa" className="h-8" />
                <img src="/images/mastercard.png" alt="Mastercard" className="h-8" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    required
                  />
                </div>
              </div>

                            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Card Holder Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                      required
                    />
                  </div>
                </div>

                                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CVC</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || paymentSuccess}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : paymentSuccess ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Payment Successful!</span>
                  </div>
                ) : (
                  `Pay Now`
                )}
              </button>
            </form>
          </motion.div>

                    <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-start space-x-4"
              >
                <div className="bg-yellow-100 rounded-xl p-3">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}

                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Enterprise Package Includes:</h3>
              <ul className="space-y-3">
                {[
                  "Unlimited Employee Profiles",
                  "Advanced Reporting & Analytics",
                  "Custom Workflow Builder",
                  "Priority Support 24/7",
                  "API Access",
                  "Mobile App Access",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-yellow-200" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;