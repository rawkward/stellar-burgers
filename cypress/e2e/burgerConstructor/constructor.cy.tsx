describe('Burger constructor testing', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');
    cy.fixture('order.json').as('orderData');
    cy.fixture('orders.json').as('ordersData');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken');
    });
    cy.setCookie('accessToken', 'mockAccessToken');

    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '/auth/token', (req) => {
      req.reply({
        success: true,
        refreshToken: 'newMockRefreshToken',
        accessToken: 'newMockAccessToken'
      });
    }).as('postToken');

    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('postOrder');
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
  });

  it('All ingredients should be displayed', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('@ingredientsData').then((ingredients) => {
      cy.get(`[data-cy='ingredient']`).should(
        'have.length',
        ingredients.data.length
      );
    });
  });

  it('Ingredients should be added to the constructor', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(`[data-cy='ingredients-buns']`).contains('Добавить').click();
    cy.get(`[data-cy='constructor-bun-top']`).should(
      'contain',
      'Краторная булка N-200i (верх)'
    );
    cy.get(`[data-cy='constructor-bun-bottom']`).should(
      'contain',
      'Краторная булка N-200i (низ)'
    );

    cy.get(`[data-cy='ingredients-mains']`).contains('Добавить').click();
    cy.get(`[data-cy='constructor-filling']`).should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Modal should open by clicking on an ingredient, should close by clicking on X button/overlay', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='modal']`).should('be.visible');
    cy.get(`[data-cy='modal']`).should('contain', 'Краторная булка N-200i');

    cy.get(`[data-cy='close-icon']`).click();
    cy.get(`[data-cy='modal']`).should('not.exist');

    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='overlay']`).click(1, 1, { force: true });
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Order should be created', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(`[data-cy='ingredients-buns']`).contains('Добавить').click();
    cy.get(`[data-cy='ingredients-mains']`).contains('Добавить').click();

    cy.get(`[data-cy='order-btn']`).contains('Оформить заказ').click();

    cy.wait(1000);
    cy.get(`[data-cy='modal']`).should('contain', '54874');
    
    cy.get(`[data-cy='close-icon']`).click();
    cy.get(`[data-cy='modal']`).should('not.exist');

    cy.get(`[data-cy='constructor-bun-top-empty']`).should('contain', 'Выберите булки');
    cy.get(`[data-cy='constructor-filling-empty']`).should('contain', 'Выберите начинку');
    cy.get(`[data-cy='constructor-bun-bottom-empty']`).should('contain', 'Выберите булки');
  });

  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })
});
