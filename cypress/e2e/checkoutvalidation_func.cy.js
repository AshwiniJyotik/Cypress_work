import { getcartdetail, cartProductName ,cartProductPrice } from './cartValidation_func.cy';

export function checkoutValidation() {
  cy.get('.shopping_cart_link', { timeout: 15000 }).click();
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type('Ashwini');
  cy.get('[data-test="lastName"]').type('Jyotik');
  cy.get('[data-test="postalCode"]').type('453771');
  cy.get('[data-test="continue"]').click();
  cy.get('.cart_list').then(($cartList) => {
    if ($cartList.find('.cart_item').length > 0) {
      cy.log('Cart list has items added');
    } else {
      cartValidation();
    }
    getproductdetailsforcheckout();

    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.get('[data-test="back-to-products"]').should('be.enabled');
  });

  function getproductdetailsforcheckout() {
    cy.get('.cart_item').each(($item) => {
      const checkoutproductname = $item.find('.inventory_item_name').text();
      const checkoutproductprice = $item.find('.inventory_item_price').text();
      cy.log(`Item Name: ${checkoutproductname}`);
      cy.log(`Item Price: ${checkoutproductprice}`);

      // Compare checkoutproductname with cartProductName
      if (checkoutproductname === cartProductName) {
        cy.log('checkoutproductname and cartProductName are equal');
      } else {
        cy.log('checkoutproductname and cartProductName are not equal');
      }
      if (checkoutproductprice === cartProductPrice) {
        cy.log('checkoutproductname and cartProductName are equal');
      } else {
        cy.log('checkoutproductname and cartProductName are not equal');
      }
    });
  }
}
