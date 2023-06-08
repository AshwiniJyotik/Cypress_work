export function cartValidation() {
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

export let cartProductName;

export function getcartdetail() {
  cy.get('.cart_item').each(($item) => {
    const productname = $item.find('.inventory_item_name').text();
    const productprice = $item.find('.inventory_item_price').text();
    cy.log(`Item Name: ${productname}`);
    cy.log(`Item Price: ${productprice}`);
    cartProductName = productname;
    cartProductPrice = productprice;
  });
}