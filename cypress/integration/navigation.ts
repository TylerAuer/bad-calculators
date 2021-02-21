const NUMBER_OF_LEVELS = 5;

describe('Redirect to landing page for arrivals without a session', () => {
  it('Redirect from puzzle', () => {
    cy.visit('/#/puzzle/0');
    cy.location('hash').should('eq', '#/');
  });
  it('Redirect from level', () => {
    cy.visit('/#/level/1');
    cy.location('hash').should('eq', '#/');
  });
  it('Redirect from malformed link', () => {
    cy.visit('/#/fasdhjfkjashdflkashlk');
    cy.location('hash').should('eq', '#/');
  });
});

describe('Navigate as anonymous user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.get('.login__auth-btn').contains('Skip').click();
  });

  it('Can move from Level 1 and to last level and back', () => {
    // Move up through the levels
    for (let level = 1; level <= NUMBER_OF_LEVELS; level++) {
      cy.url().should('include', `/level/${level}`);

      console.log(level);
      if (level < NUMBER_OF_LEVELS) {
        cy.get('.lvl-page__right > .lvl-page__level-btn').click();
      }
    }

    // Move down through the levels
    for (let level = NUMBER_OF_LEVELS; level > 0; level--) {
      cy.url().should('include', `/level/${level}`);

      if (level > 1) {
        cy.get('.lvl-page__left > .lvl-page__level-btn').click();
      }
    }
  });

  it('Confirm no Level 0 nor Level 6 exist', () => {
    cy.get('.lvl-page__left > .lvl-page__level-btn').should('not.exist');
    cy.get('.lvl-page__right > .lvl-page__level-btn').click();
    cy.get('.lvl-page__right > .lvl-page__level-btn').click();
    cy.get('.lvl-page__right > .lvl-page__level-btn').click();
    cy.get('.lvl-page__right > .lvl-page__level-btn').click();
    cy.get('.lvl-page__right > .lvl-page__level-btn').should('not.exist');
  });

  it('Can open all puzzles', () => {
    for (let level = 1; level <= NUMBER_OF_LEVELS; level++) {
      cy.get('.lvl-page__puzzle-btn').each(($el, i) => {
        cy.get('.lvl-page__puzzle-btn')
          .eq(i)
          .click()
          .then(() => {
            cy.url().should('include', 'puzzle');
            cy.get('.level-and-puzzle').contains(`Puzzle: ${level}-${i + 1}`);
            cy.go('back');
          });
      });

      if (level !== NUMBER_OF_LEVELS) {
        cy.get('.lvl-page__right > .lvl-page__level-btn').click();
      }
    }
  });
});
