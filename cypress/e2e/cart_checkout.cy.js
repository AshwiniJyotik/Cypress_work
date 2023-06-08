import { login } from './login.cy';
import { cartValidation } from './cartValidation_func.cy';
import { checkoutValidation } from './checkoutvalidation_func.cy';
import { getproductdetailsforcheckout } from './checkoutvalidation_func.cy';
import { getcartdetail } from './cartValidation_func.cy';

describe('Cart and Checkout Validation', () => {
  beforeEach(() => {
    login(); // Call the login function from login.cy.js
  });

 it('Cart validation & add item have a word shirt', () => {
    cartValidation(); // Call the cartValidation function
  });

  it('Checkout validation', () => {
    cartValidation(); // Call the cartValidation function
    checkoutValidation();
  });
});