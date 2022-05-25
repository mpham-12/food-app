$(document).ready(function () {
  const basePrice = 4.99;

  $(".calculate").change(function () {
    let newPrice = basePrice;
    let quantity = $('#quantity').val();
    $(".calculate option:selected").each(function () {
      newPrice += $(this).data('price')
    });
    let total = newPrice * quantity;
   return $("#total-price").html('Total: ' + total);

  })


  $.ajax({
    type: 'POST',
    data: {data: total},
    url: location.href.slice(21),                      
});



})