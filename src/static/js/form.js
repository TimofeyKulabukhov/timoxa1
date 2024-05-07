
document.getElementById('order-btn').addEventListener('click', function() {
    fillOrderTable();
    document.getElementById('order-modal').style.display = 'block'; 
  });
  

  function fillOrderTable() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.getElementById('order-items');
  
  
    tableBody.innerHTML = `
      <tr>
        <th>Товар</th>
        <th>Количество</th>
        <th>Цена</th>
      </tr>
    `;
  
 
    let total = 0;
    cart.forEach(item => {
      let row = tableBody.insertRow();
      row.insertCell(0).textContent = item.title;
      row.insertCell(1).textContent = item.quantity;
      row.insertCell(2).textContent = item.price + 'Р';
  
      total += item.quantity * item.price;
    });
  
 
    let totalRow = tableBody.insertRow();
    totalRow.insertCell(0).textContent = 'Итого';
    totalRow.insertCell(1);
    totalRow.insertCell(2).textContent = total + 'Р';
  }
  

  document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('order-modal').style.display = 'none';
  });
  

  document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
   
  });
  