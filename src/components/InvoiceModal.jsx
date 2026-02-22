import React from "react";
import "./InvoiceModal.css";

function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const products = invoice.productName
    ? invoice.productName.split(",").map((p) => p.trim()).filter(Boolean)
    : [];

  const perItemAmount = products.length > 0
    ? (Number(invoice.amount) / products.length).toFixed(2)
    : Number(invoice.amount).toFixed(2);

  const handlePrint = () => window.print();

  return (
    <div className="inv-overlay">
      <div className="inv-modal">

        {/* ── Header ── */}
        <div className="inv-header">
          <div className="inv-store">
            <div className="inv-store-icon">🧾</div>
            <div>
              <div className="inv-store-name">BillMaster</div>
              <div className="inv-store-sub">Sales Invoice</div>
            </div>
          </div>
          <button className="inv-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Invoice Number ── */}
        <div className="inv-number-row">
          <span className="inv-number-label">Invoice</span>
          <span className="inv-number-value">{invoice.invoiceNumber}</span>
        </div>

        <div className="inv-divider" />

        {/* ── Info Rows ── */}
        <div className="inv-info-section">
          <div className="inv-row">
            <span className="inv-label">Order ID</span>
            <span className="inv-value inv-mono">{invoice.orderId || "—"}</span>
          </div>
          <div className="inv-row">
            <span className="inv-label">Cashier</span>
            <span className="inv-value">{invoice.cashierName || "—"}</span>
          </div>
          <div className="inv-row">
            <span className="inv-label">Payment Method</span>
            <span className={`inv-badge ${invoice.paymentMethod === "ONLINE" ? "inv-badge-online" : "inv-badge-cash"}`}>
              {invoice.paymentMethod || "—"}
            </span>
          </div>

        </div>

        <div className="inv-divider" />

        {/* ── Products Table ── */}
        <div className="inv-products-header">
          <span>Item</span>
          <span>Qty</span>
          <span>Amount</span>
        </div>

        <div className="inv-products-list">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="inv-product-row">
                <span className="inv-product-name">{product}</span>
                <span className="inv-product-qty">×1</span>
                <span className="inv-product-price">₹{perItemAmount}</span>
              </div>
            ))
          ) : (
            <div className="inv-product-row">
              <span className="inv-product-name">—</span>
              <span className="inv-product-qty"></span>
              <span className="inv-product-price">₹{Number(invoice.amount).toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="inv-divider" />

        {/* ── Total ── */}
        <div className="inv-total-row">
          <span className="inv-total-label">Total Amount</span>
          <span className="inv-total-value">₹{Number(invoice.amount).toFixed(2)}</span>
        </div>

        {/* ── Footer ── */}
        <div className="inv-footer">
          <button className="inv-btn inv-btn-print" onClick={handlePrint}>
            <i className="fas fa-print" /> Print
          </button>
          <button className="inv-btn inv-btn-cancel" onClick={onClose}>
            <i className="fas fa-times" /> Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default InvoiceModal;
