import React from "react";
import "./InvoiceModal.css";

function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null; // safety

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <div className="header-title">
    
            <span style={{color:"black"}}>Invoice {invoice.invoiceNumber}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="info-row">
          <span className="label">Order ID</span>
          <span className="value">{invoice.orderId}</span>
        </div>

           <div className="info-row">
          <span className="label">Amount</span>
          <span className="value">{invoice.amount}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Cashier</span>
          <span className="value">{invoice.cashierName}</span>
        </div>

        <div className="info-row">
          <span className="label">Payment</span>
          <span className="value">{invoice.paymentMethod}</span>
        </div>

        <div className="divider"></div>

    {invoice?.productName &&
  invoice.productName.split(",").map((product, index) => (
    <div key={index} className="product-row">
      <span className="product-name">{product.trim()}</span>
    </div>
))}



        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn btn-print">
            <i className="fas fa-print"></i> Print
          </button>
          <button className="btn btn-refund" onClick={onClose}>
            <i className="fas fa-redo"></i> Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default InvoiceModal;
