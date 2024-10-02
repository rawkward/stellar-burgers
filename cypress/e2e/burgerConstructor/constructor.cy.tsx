describe('Burger constructor testing', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');
    cy.fixture('order.json').as('orderData');

    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.setCookie('accessToken', 'mockAccessToken');

    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept(
      {
        method: 'GET',
        url: '/auth/user',
        headers: {
          Cookie: 'accessToken=mockAccessToken'
        }
      },
      {
        fixture: 'user.json'
      }
    ).as('getUser');

    cy.intercept('POST', '/auth/token', (req) => {
      req.reply({
        success: true,
        refreshToken: 'newMockRefreshToken',
        accessToken: 'newMockAccessToken'
      });
    }).as('postToken');

    cy.intercept('POST', '/orders', { fixture: 'order.json' }).as('postOrder');
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

    cy.get(`[data-cy='close-icon']`).click();
    cy.get(`[data-cy='modal']`).should('not.exist');

    cy.get(`[data-cy='ingredient']`).first().click();
    cy.get(`[data-cy='overlay']`).click(1, 1, { force: true });
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Order should be created', () => {});
});
