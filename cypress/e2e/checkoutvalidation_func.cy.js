import { getcartdetail, cartProductName, cartProductPrice } from './cartValidation_func.cy';

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

  // Get the checkout items name & price details
  function getproductdetailsforcheckout() {
    getcartdetail();
    const checkoutProductNameArray = [];
    const checkoutProductPriceArray = [];

    cy.get('.cart_item').each(($item, index) => {
      const checkoutproductname = $item.find('.inventory_item_name').text();
      const checkoutproductprice = $item.find('.inventory_item_price').text();

      checkoutProductNameArray.push(checkoutproductname);
      checkoutProductPriceArray.push(checkoutproductprice);

      cy.log(`Checkout product names: ${checkoutProductNameArray}`);
      cy.log(`Checkout product prices: ${checkoutProductPriceArray}`);

      const cartProductNameAtIndex = cartProductName[index];
      // Compare checkoutproductname with cartProductName at the same index
      if (checkoutproductname === cartProductNameAtIndex) {
        cy.log(`Checkout product name and cart names are equal`);
      } else {
        cy.log(`Checkout product name and cart names are not equal`);
      }

      const cartProductPriceAtIndex = cartProductPrice[index];
      // Compare the product price on cart & checkout at the same index
      if (checkoutproductprice === cartProductPriceAtIndex) {
        cy.log(`Checkout product price and cart price are equal`);
      } else {
        cy.log(`Checkout product price and cart price are not equal`);
      }
    });

    /* Calculate the Item total: This needs to be revisited
    const totalItemPrice = checkoutProductPriceArray.reduce((accumulator, currentValue) => {
    const price = parseFloat(currentValue.replace('$', ''));
    return accumulator + price;
    }, 0);

    cy.log(`Total Items Price: ${totalItemPrice}`);*/

  
 // Get the Item Total & tax and calculate the Total Pricing
 let Totalamountwithtax;
 let totalPriceWithTax;
    cy.get('.summary_subtotal_label').invoke('text').then((text) => {
      const [label, price] = text.split(':');
      const totalPrice = parseFloat(price.trim().replace('$', ''));
      cy.log(`The Item Total price on screen: ${totalPrice}`);

      cy.get('.summary_tax_label').invoke('text').then((taxText) => {
        const [taxLabel, tax] = taxText.split(':');
        const taxPrice = parseFloat(tax.trim().replace('$', ''));
        cy.log(`Tax Price on screen: ${taxPrice}`);

        // Calculate the total price including tax
         totalPriceWithTax = totalPrice + taxPrice;
        cy.log(`Total Price including tax: ${totalPriceWithTax}`);
      });
    });

// Get the Total Pricing on screen
    cy.get('.summary_total_label').invoke('text').then((text) => {
      const [label, Total] = text.split(':');
       Totalamountwithtax = parseFloat(Total.trim().replace('$', ''));
      cy.log(`The Item Total price on screen: ${Totalamountwithtax}`);
    });

    if(totalPriceWithTax==Totalamountwithtax){
        cy.log(`The calculate pricing and total pricing on screen is matching`);
    } else {
    cy.log(`The calculate pricing and total pricing on screen is not matching`);
    }
  }
}
