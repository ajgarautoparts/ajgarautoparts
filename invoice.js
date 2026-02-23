function downloadInvoice(id){
  const win = window.open("");
  win.document.write(`
    <h2>AJGAR AUTO PARTS</h2>
    <p>ORDER ID: ${id}</p>
    <p>THANK YOU FOR YOUR ORDER</p>
    <p>PAYMENT RECEIVED</p>
    <button onclick="window.print()">PRINT / SAVE PDF</button>
  `);
}
