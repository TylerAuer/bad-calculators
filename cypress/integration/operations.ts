describe('Test <Puzzle /> Operations', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('.login__auth-btn').contains('Skip').click();
  });

  it('handles addition', () => {
    cy.fixture('puzzle_without_operations.json').then((puz) => {
      puz.operations = [
        {
          symbol: 'addition',
          value: 1,
        },
      ];
      puz.start = 1.5;
      puz.target = -1.234567;

      cy.intercept('GET', '/puzzle/0', puz);
      cy.visit('/#/puzzle/0');

      cy.get('.calc-btn__btn').eq(0).click().click();
      cy.get('.screen__value').should('have.text', '3.5');
      cy.get('.screen__history').should('have.text', ' + 1 + 1');
    });
  });

  it('handles subtraction', () => {
    cy.fixture('puzzle_without_operations.json').then((puz) => {
      puz.operations = [
        {
          symbol: 'subtraction',
          value: 1,
        },
      ];
      puz.start = 10.5;
      puz.target = -1.234567;

      cy.intercept('GET', '/puzzle/0', puz);
      cy.visit('/#/puzzle/0');

      cy.get('.calc-btn__btn').eq(0).click().click();
      cy.get('.screen__value').should('have.text', '8.5');
      cy.get('.screen__history').should('have.text', ' - 1 - 1');
    });
  });

  it('handles multiplication', () => {
    cy.fixture('puzzle_without_operations.json').then((puz) => {
      puz.operations = [
        {
          symbol: 'multiplication',
          value: 2,
        },
      ];
      puz.start = 1.1;
      puz.target = -1.234567;

      cy.intercept('GET', '/puzzle/0', puz);
      cy.visit('/#/puzzle/0');

      cy.get('.calc-btn__btn').eq(0).click().click();
      cy.get('.screen__value').should('have.text', '4.4');
      cy.get('.screen__history').should('have.text', ' × 2 × 2');
    });
  });

  it('handles division', () => {
    cy.fixture('puzzle_without_operations.json').then((puz) => {
      puz.operations = [
        {
          symbol: 'division',
          value: 2,
        },
      ];
      puz.start = 10;
      puz.target = -1.234567;

      cy.intercept('GET', '/puzzle/0', puz);
      cy.visit('/#/puzzle/0');

      cy.get('.calc-btn__btn').eq(0).click().click();
      cy.get('.screen__value').should('have.text', '2.5');
      cy.get('.screen__history').should('have.text', ' ÷ 2 ÷ 2');
    });
  });
});
