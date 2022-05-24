$(document).ready(function () {
  const basePrice = 4.99;

  $(".calculate").change(function () {
    let newPrice = basePrice;
    let quantity = $('#quantity').val();
    $(".calculate option:selected").each(function () {
      newPrice += $(this).data('price')
    });
      $("#total-price").html('Total: ' + newPrice * quantity);
      console.log('QUANTITY', quantity * newPrice)

    
  });
})