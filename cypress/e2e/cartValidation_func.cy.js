export function cartValidation() {
  // Check if cart list has any cart items and if not remove it & continue
  cy.get('.cart_list').then(($cartList) => {
    if ($cartList.find('.cart_item').length === 0) {
      cy.get('[data-test="continue-shopping"]').click();
      cy.wait(1000);

      cy.get('.inventory_item_name').each(($product) => {
        const productName = $product.text();
        if (productName.includes('Shirt')) {
          cy.wrap($product)
            .parents('.inventory_item')
            .find('.btn_inventory')
            .click();
        }
      });
    } else {
      cy.get('.btn.btn_secondary.btn_small.btn_inventory').click();
      cy.get('[data-test="continue-shopping"]').click();
      cy.wait(1000);
      // Search the item name contains 'Shirt'
      cy.get('.inventory_item_name').each(($product) => {
        const productName = $product.text();
        if (productName.includes('Shirt')) {
          cy.wrap($product)
            .parents('.inventory_item')
            .find('.btn_inventory')
            .click();
        }
      });
    }
  });
}

// Get item name & price for the items present in cart
export let cartProductName;
export let cartProductPrice;

export function getcartdetail() {
  const cartProductNameArray = [];
  const cartProductPriceArray = [];

  cy.get('.cart_item').each(($item) => {
    const productname = $item.find('.inventory_item_name').text();
    const productprice = $item.find('.inventory_item_price').text();

    cartProductNameArray.push(productname);
    cartProductPriceArray.push(productprice);

    cy.log(`Item Names on Cart: ${cartProductNameArray}`);
    cy.log(`Item Prices on Cart: ${cartProductPriceArray}`);
  });

  cartProductName = cartProductNameArray;
  cartProductPrice = cartProductPriceArray;
}
