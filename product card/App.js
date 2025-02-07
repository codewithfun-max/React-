import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  // Dark/Light Mode Toggle with localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "bg-dark text-white" : "bg-light text-dark";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // FAQ Toggle State
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="container py-5">
      {/* Dark Mode Toggle */}
      <div className="text-end">
        <button className="btn btn-outline-primary" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      {/* Pricing Table */}
      <h2 className="text-center mt-4">Pricing Plans</h2>
      <div className="row mt-4">
        {["Basic", "Standard", "Premium"].map((plan, index) => (
          <div className="col-md-4" key={index}>
            <div className="card text-center shadow-lg p-4">
              <h3>{plan}</h3>
              <h4>${(index + 1) * 10}/mo</h4>
              <p>Features of {plan} plan</p>
              <button className="btn btn-primary">Choose Plan</button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <h2 className="text-center mt-5">Frequently Asked Questions</h2>
      <div className="accordion mt-3">
        {[
          { question: "What is included in the Basic plan?", answer: "Basic plan includes core features." },
          { question: "Can I upgrade later?", answer: "Yes, you can upgrade anytime." },
          { question: "Do you offer a refund?", answer: "We have a 30-day refund policy." }
        ].map((faq, index) => (
          <div className="card mb-2" key={index}>
            <div className="card-header" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
              <h5 className="mb-0">{faq.question}</h5>
            </div>
            {openFAQ === index && <div className="card-body">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
