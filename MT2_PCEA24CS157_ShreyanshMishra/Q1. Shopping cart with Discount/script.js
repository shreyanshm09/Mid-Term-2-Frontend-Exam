let cart = [
  { id: 1, name: "Notebook", price: 120, qty: 1 },
  { id: 2, name: "Pen Pack", price: 60, qty: 1 },
  { id: 3, name: "Water Bottle", price: 350, qty: 1 }
];

function changeQty(id, delta) {
  cart = cart.map((item) =>
    item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
  );
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-msg">Your cart is empty</p>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal >= 1000 ? subtotal * 0.1 : 0;
  const finalAmount = subtotal - discount;

  const rowsHtml = cart
    .map((item) => {
      const rowTotal = item.price * item.qty;
      const isMinQty = item.qty <= 1;

      return `
        <tr>
          <td>${item.name}</td>
          <td>Rs. ${item.price}</td>
          <td>
            <button
              type="button"
              class="qty-btn"
              onclick="changeQty(${item.id}, -1)"
              ${isMinQty ? "disabled" : ""}
            >-</button>
            <span class="qty-value">${item.qty}</span>
            <button
              type="button"
              class="qty-btn"
              onclick="changeQty(${item.id}, 1)"
            >+</button>
          </td>
          <td>Rs. ${rowTotal}</td>
          <td>
            <button
              type="button"
              class="remove-btn"
              onclick="removeItem(${item.id})"
            >Remove</button>
          </td>
        </tr>
      `;
    })
    .join("");

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Row Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="summary">
      <p><strong>Subtotal:</strong> Rs. ${subtotal}</p>
      <p><strong>Discount (10% on Rs. 1000+):</strong> -Rs. ${discount}</p>
      <p><strong>Final Amount Payable:</strong> Rs. ${finalAmount}</p>
    </div>
  `;
}

renderCart();