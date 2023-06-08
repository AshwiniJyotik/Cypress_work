// login.cy.js
export const login = () => {
  // Login logic here
  // e.g., visit the login page, enter credentials, click login button
  cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.get('.app_logo').should('have.text','Swag Labs')

    // Checking if cart is empty
   cy.get('.shopping_cart_link').click();
   cy.wait(2000);
};

describe('Login Tests', () => {
  it('should successfully log in', () => {
    // Test login functionality here
    login();
    //cy.wait(2000);
    // Add assertions or further tests
  });

  // Other login-related tests
});