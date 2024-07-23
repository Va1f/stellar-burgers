const testUrl = 'http://localhost:4000';

describe('E2E тесты для главной страницы и модальных окон', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.visit(testUrl);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавление ингредиентов в конструктор', function () {
    cy.get('[data-cy=buns]').as('bunsSection');
    cy.get('[data-cy=mains]').as('mainsSection');
    cy.get('[data-cy=sauces]').as('saucesSection');

    cy.get('@bunsSection').contains('Добавить').click();
    cy.get('@mainsSection').contains('Добавить').click();
    cy.get('@saucesSection').contains('Добавить').click();

    cy.get('.constructor-element_pos_top').as('topElement');
    cy.get('@topElement').contains('Краторная булка N-200i (верх)');
    cy.get('.constructor-element').as('middleElement');
    cy.get('@middleElement').contains('Биокотлета из марсианской Магнолии');
    cy.get('.constructor-element_pos_bottom').as('bottomElement');
    cy.get('@bottomElement').contains('Краторная булка N-200i (низ)');

    cy.get('.move_button').as('moveButtons');
    cy.get('@moveButtons').eq(1).click();
    cy.get('@middleElement').contains('Соус Spicy-X');
  });

  it('Проверка отсутствия модального окна', function () {
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка открытия модального окна', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').contains('Соус фирменный Space Sauce');
  });

  it('Закрытие модального окна по кнопке', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Закрытие модального окна по клавише esc', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Закрытие модального окна по клику на overlay', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#overlay').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('E2E тесты оформления заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.visit(testUrl);
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформление заказа', function () {
    cy.get('[data-cy=buns]').as('bunsSection');
    cy.get('[data-cy=mains]').as('mainsSection');
    cy.get('[data-cy=sauces]').as('saucesSection');

    cy.get('@bunsSection').contains('Добавить').click();
    cy.get('@mainsSection').contains('Добавить').click();
    cy.get('@saucesSection').contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').find('h2').contains(41975);
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);

    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');
  });
});
