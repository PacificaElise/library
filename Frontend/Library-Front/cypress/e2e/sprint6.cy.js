const myId = 8;
const myName = 'Фёдор';
const myLastName = 'Сумкин';
const myBooking = {
  id: 7,
  order: true,
  dateOrder: '2023-01-19T00:00:00.000Z',
  customerId: myId,
  customerFirstName: myName,
  customerLastName: myLastName,
};
const myCommentText = 'Новый коммент выше...';

const CATEGORIES = [
  {
    name: 'Зарубежная литература',
    path: 'business',
    id: 1,
  },
  {
    name: 'Компьютерная литература',
    path: 'business2',
    id: 2,
  },
];

const USER = {
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjY2NTQ0MzI5LCJleHAiOjE2NjkxMzYzMjl9.erLicGJGH5wttjAF6xDWMcxDJOIJvEnFLFzuMVzUkSU',
  user: {
    id: myId,
    username: 'pihoozzz',
    email: 'psioozzz@tut.by',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-10-23T16:58:49.851Z',
    updatedAt: '2022-10-23T16:58:49.851Z',
    firstName: myName,
    lastName: myLastName,
    phone: '+375 (33) 333-33-33',
  },
};

const BOOK_INFO_ITEM = {
  id: 1,
  title: 'Книга 1',
  rating: 2,
  issueYear: '2019',
  description:
    'Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?\nОткройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.',
  publish: 'Питер',
  pages: '288',
  cover: 'Мягкая обложка',
  weight: '370',
  format: '70х100',
  ISBN: '978-5-4461-0923-4',
  producer: 'ООО «Питер Мейл». РФ, 198206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29',
  authors: ['Адитья Бхаргава'],
  images: [
    {
      url: '/uploads/image_book_5e25f0be0d.jpg',
    },
  ],
  categories: ['Зарубежная литература', 'Компьютерная литература'],
  comments: [
    {
      id: 1,
      rating: 2,
      text: '... Старый коммент ниже',
      createdAt: '2022-10-23T12:23:13.012Z',
      user: {
        commentUserId: 6,
        firstName: 'Агент',
        lastName: 'Смит',
        avatarUrl: '/uploads/thumbnail_Screenshot_3_1016a62c87.png',
      },
    },
  ],
  booking: {
    id: 7,
    order: true,
    dateOrder: '2022-10-24T00:00:00.000Z',
    customerId: 6,
    customerFirstName: 'Агент',
    customerLastName: 'Смит',
  },
  delivery: null,
  histories: [
    {
      id: 1,
      userId: 7,
    },
  ],
};

const BASE_BOOKS_ITEM = {
  issueYear: '2019',
  rating: 2,
  title: 'Книга 1',
  authors: ['Адитья Бхаргава'],
  image: {
    url: '/uploads/image_book_5e25f0be0d.jpg',
  },
  categories: ['Зарубежная литература', 'Компьютерная литература'],
  id: 1,
  booking: {
    id: 7,
    order: true,
    dateOrder: '2022-10-24T00:00:00.000Z',
    customerId: 6,
    customerFirstName: 'Агент',
    customerLastName: 'Смит',
  },
  delivery: null,
  histories: [
    {
      id: 1,
      userId: 7,
    },
  ],
};

const BOOK_INFO_PAGES = [
  { ...BOOK_INFO_ITEM, booking: null },
  { ...BOOK_INFO_ITEM, id: 2, title: 'Книга 2' },
  { ...BOOK_INFO_ITEM, id: 3, title: 'Книга 3', booking: myBooking, delivery: null },
  {
    ...BOOK_INFO_ITEM,
    id: 4,
    title: 'Книга 4',
    booking: null,
    delivery: {
      id: 7,
      handed: true,
      dateHandedFrom: '2023-01-24T00:00:00.000Z',
      dateHandedTo: '2023-01-28T00:00:00.000Z',
      recipientId: 6,
      recipientFirstName: 'Агент',
      recipientLastName: 'Смит',
    },
  },
];

const BOOKS_LIST_BASE = [
  { ...BASE_BOOKS_ITEM, booking: null },
  { ...BASE_BOOKS_ITEM, id: 2, title: 'Книга 2' },
  {
    ...BASE_BOOKS_ITEM,
    id: 3,
    booking: myBooking,
    delivery: null,
    title: 'Книга 3',
  },
  {
    ...BASE_BOOKS_ITEM,
    id: 4,
    title: 'Книга 4',
    booking: null,
    delivery: {
      id: 7,
      handed: true,
      dateHandedFrom: '2023-01-24T00:00:00.000Z',
      dateHandedTo: '2023-01-28T00:00:00.000Z',
      recipientId: 6,
      recipientFirstName: 'Агент',
      recipientLastName: 'Смит',
    },
  },
];

const BOOKS_LIST_AFTER_BOOKING = BOOKS_LIST_BASE.map((item, ind) =>
  ind === 0 ? { ...BOOKS_LIST_BASE[0], booking: myBooking } : item
);

const BOOKS_LIST_AFTER_EDIT_BOOKING = BOOKS_LIST_BASE.map((item, ind) =>
  ind === 2
    ? {
        ...BOOKS_LIST_BASE[2],
        booking: { ...myBooking, dateOrder: '2023-01-20T00:00:00.000Z' },
      }
    : item
);

const BOOKS_LIST_AFTER_DELETE_BOOKING = BOOKS_LIST_BASE.map((item, ind) =>
  ind === 2
    ? {
        ...BOOKS_LIST_BASE[2],
        booking: null,
      }
    : item
);

const BOOK_INFO_PAGE_AFTER_COMMENT = {
  ...BOOK_INFO_ITEM,
  booking: null,
  rating: 3,
  comments: [
    ...BOOK_INFO_ITEM.comments,
    {
      id: 2,
      rating: 4,
      text: myCommentText,
      createdAt: '2023-01-19T00:00:00.000Z',
      user: {
        commentUserId: myId,
        firstName: myName,
        lastName: myLastName,
        avatarUrl: '/uploads/thumbnail_Screenshot_3_1016a62c87.png',
      },
    },
  ],
};

const BOOKING_RESPONSE = {
  data: {
    order: true,
    dateOrder: '2023-01-19T00:00:00.000Z',
    book: '1',
    customer: myId,
  },
};

const BOOKING_UPDATE_RESPONSE = {
  data: {
    id: 7,
    attributes: {
      order: true,
      createdAt: '2023-01-19T00:00:00.000Z',
      updatedAt: '2023-01-20T00:00:00.000Z',
      publishedAt: '2023-01-20T00:00:00.000Z',
      dateOrder: '2023-01-20T00:00:00.000Z',
    },
  },
  meta: {},
};

const BOOK_RATE_RESPONSE = {
  data: {
    id: 9,
    attributes: {
      rating: 4,
      text: myCommentText,
      createdAt: '2023-01-19T00:00:00.000Z',
      updatedAt: '2023-01-19T00:00:00.000Z',
      publishedAt: '2023-01-19T00:00:00.000Z',
    },
  },
  meta: {},
};

const BOOKING_DELETE_RESPONSE = { ...BOOKING_UPDATE_RESPONSE };

const dayDisabledColor = 'rgb(167, 167, 167)';
const dayColor = 'rgb(54, 54, 54)';
const todayColor = 'rgb(248, 54, 0)';
const transparent = 'rgba(0, 0, 0, 0)';
const weekendBg = 'rgb(254, 235, 234)';
const dayActive = 'rgb(255, 255, 255)';
const successColor = 'rgb(235, 249, 241)';
const orangeGradient = 'linear-gradient(231.58deg, rgb(248, 54, 0) -53.35%, rgb(249, 212, 35) 297.76%)';

const authorize = () => {
  cy.viewport('macbook-16');
  cy.intercept('/api/auth/local', USER).as('authorize');
  cy.intercept('/api/categories', CATEGORIES).as('categories');
  cy.intercept('/api/books', BOOKS_LIST_BASE).as('books');
  cy.visit('http://localhost:3000');
  cy.get('[data-test-id=auth-form] input[name=identifier]').type('TestUser1');
  cy.get('[data-test-id=auth-form] input[name=password]').type('Qwerty123');

  cy.get('[data-test-id=auth-form]').contains('вход', { matchCase: false }).should('be.enabled').click();
  cy.wait('@authorize');
};

const openBookPage = (bookName) => {
  cy.contains('[data-test-id=card]', bookName).click();
};

const checkBookingCardButton = (bookName = '', isDisabled = false, btnText = '', colorText = 'rgb(255, 255, 255)') => {
  cy.contains('[data-test-id=card]', bookName)
    .find('[data-test-id=booking-button]')
    .should(isDisabled ? 'be.disabled' : 'be.enabled')
    .contains(btnText, { matchCase: false })
    .and('have.css', 'color', colorText);
};

const checkBookingButton = (bookId, isDisabled = false, btnText = '', colorText = 'rgb(255, 255, 255)') => {
  cy.intercept(`https://strapi.cleverland.by/api/books/${bookId}`, {
    body: BOOK_INFO_PAGES[bookId - 1],
    statusCode: 200,
  }).as(`book${bookId}`);
  cy.visit(`http://localhost:3000/#/books/all/${bookId}`);
  cy.get('[data-test-id=booking-button]')
    .should(isDisabled ? 'be.disabled' : 'be.enabled')
    .contains(btnText, { matchCase: false })
    .and('have.css', 'color', colorText);
};

const openBookingModal = (isEdit = false) =>
  cy
    .contains('[data-test-id=card]', isEdit ? 'Книга 3' : 'Книга 1', { matchCase: false })
    .find('[data-test-id=booking-button]')
    .click();

const openRateModal = () => {
  cy.get('[data-test-id=button-rate-book]').click();
};

const closeModal = () => cy.get('[data-test-id=modal-outer]').find('[data-test-id=modal-close-button]').click();

const setDate = (year, month, day) => cy.clock().invoke('setSystemTime', new Date(year, month, day));

const checkCalendarDayColor = (dayNum, expectColor, expectBackground, isGradient) => {
  cy.get('[data-test-id=booking-modal]')
    .find('[data-test-id=day-button]')
    .contains(dayNum)
    .as('day')
    .should('have.css', 'color')
    .and('eq', expectColor);
  if (expectBackground) {
    cy.get('@day')
      .should('have.css', isGradient ? 'background-image' : 'background-color')
      .and('eq', expectBackground);
  }
};
const clickDay = (dayNum, isForce) =>
  cy
    .get('[data-test-id=booking-modal]')
    .find('[data-test-id=day-button]')
    .contains(dayNum)
    .click(isForce && { force: true });

const checkModalElements = (isEdit = false, isRateModal = false) => {
  cy.get('[data-test-id=modal-outer]')
    .as('outer')
    .screenshot(isRateModal ? '15-rate-modal' : isEdit ? '13-booking-edit-modal-view' : '2-booking-modal-view');
  cy.get(`[data-test-id=${isRateModal ? 'modal-rate-book' : 'booking-modal'}]`)
    .as('modal')
    .should('exist');
  cy.get('@modal').find('[data-test-id=modal-close-button]').as('close');
  cy.get('@modal')
    .find('[data-test-id=modal-title]')
    .as('title')
    .contains(isRateModal ? 'оцените книгу' : isEdit ? 'Изменение даты бронирования' : 'выбор даты бронирования', {
      matchCase: false,
    });

  if (isRateModal) {
    cy.get('@modal').find('[data-test-id=rating]').as('rating').should('exist');
    cy.get('@rating').find('[data-test-id=star]').should('have.length', 5);
    cy.get('@modal').find('[data-test-id=comment]').should('exist');
    cy.get('@modal')
      .find('[data-test-id=button-comment]')
      .should('be.enabled')
      .contains('оценить', { matchCase: false });
  } else {
    cy.get('@modal').find('[data-test-id=calendar]');
    cy.get('@modal').find('[data-test-id=booking-button]').should('be.disabled');
    if (isEdit) {
      cy.get('@modal').find('[data-test-id=booking-cancel-button]').should('be.enabled');
    }
  }

  cy.get('@title').click();
  cy.get('@outer').should('exist');
  cy.viewport(400, 600);
  cy.get('@outer').screenshot(isRateModal ? '16-rate-modal-mobile' : isEdit ? 'edit-mobile-view' : '3-mobile-view');
  cy.get('@close').click();
  cy.get('@outer').should('not.exist');
  cy.viewport('macbook-16');
  if (isRateModal) {
    openRateModal();
  } else {
    openBookingModal(isEdit);
  }
  cy.get('@outer').click('topLeft');
  cy.get('@outer').should('not.exist');
};

const checkAlert = (text, isSuccess) => {
  cy.get('[data-test-id=error]').should('be.exist').contains(text, { matchCase: false });
  cy.get('[data-test-id=error]')
    .should('have.css', 'background-color')
    .and('eq', isSuccess ? successColor : weekendBg);
};

const checkCloseAlert = (isByTimeOut = false) => {
  if (isByTimeOut) {
    cy.tick(5000);
    cy.get('[data-test-id=error]').should('not.exist');
  } else {
    cy.get('[data-test-id=alert-close]').click();
    cy.get('[data-test-id=error]').should('not.exist');
  }
};

const checkBookingRequest = (isSuccess, isEdit, doScreenshot = true) => {
  cy.intercept(isEdit ? '/api/bookings/*' : '/api/bookings', {
    method: isEdit ? 'PUT' : 'POST',
    statusCode: isSuccess ? 200 : 400,
    body: isSuccess ? (isEdit ? BOOKING_UPDATE_RESPONSE : BOOKING_RESPONSE) : null,
    delay: 2000,
  }).as('sendBooking');
  // if change data by req
  if (!isSuccess) {
    cy.intercept('/api/books', BOOKS_LIST_BASE).as('booksOld');
  } else {
    if (isEdit) {
      cy.intercept('/api/books', BOOKS_LIST_AFTER_EDIT_BOOKING);
    } else {
      cy.intercept('/api/books', BOOKS_LIST_AFTER_BOOKING);
    }
  }

  cy.get('[data-test-id=booking-modal]').find('[data-test-id=booking-button]').should('be.enabled').click();
  cy.get('[data-test-id=loader]').should('be.exist');
  cy.wait('@sendBooking')
    .its('request.body')
    .should('have.property', 'data')
    .then((data) => {
      expect(data.book.toString()).eq(isEdit ? '3' : '1');
      expect(data.customer.toString()).eq(`${myId}`);
      expect(data.dateOrder.toString()).to.include('2023-01-20T');
      expect(data.order.toString()).eq(`true`);
    });

  if (doScreenshot) {
    cy.wait(2500).screenshot(
      isEdit ? (isSuccess ? 'edit-success' : 'edit-error') : isSuccess ? '12-booking-success' : '11-booking-error'
    );
  }

  if (isEdit) {
    if (isSuccess) {
      checkAlert('Изменения успешно сохранены!', isSuccess);
    } else {
      checkAlert('Изменения не были сохранены. Попробуйте позже!', isSuccess);
    }
  } else {
    if (isSuccess) {
      checkAlert('Книга забронирована. Подробности можно посмотреть на странице Профиль', isSuccess);
    } else {
      checkAlert('Что-то пошло не так, книга не забронирована. Попробуйте позже!', isSuccess);
    }
  }
  cy.get('[data-test-id=error]')
    .should('have.css', 'background-color')
    .and('eq', isSuccess ? successColor : weekendBg);
  cy.get('[data-test-id=booking-modal]').should('not.exist');
  if (!isEdit && isSuccess) {
    checkBookingCardButton('Книга 1', false, 'забронирована', dayColor);
  }
  checkCloseAlert(true);
};

const checkCancelBookingRequest = (isSuccess) => {
  cy.intercept('/api/bookings/*', {
    method: 'DELETE',
    statusCode: isSuccess ? 200 : 400,
    body: isSuccess ? BOOKING_DELETE_RESPONSE : null,
    delay: 2000,
  }).as('sendBookingCancel');
  // if req for update
  if (isSuccess) {
    cy.intercept('/api/books', BOOKS_LIST_AFTER_DELETE_BOOKING);
  } else {
    cy.intercept('/api/books', BOOKS_LIST_BASE);
  }

  cy.get('[data-test-id=booking-cancel-button]')
    .should('be.enabled')
    .contains('отменить бронь', { matchCase: false })
    .click();

  if (isSuccess) {
    checkAlert('Бронирование книги успешно отменено!', isSuccess);
  } else {
    checkAlert('Не удалось снять бронирование книги. Попробуйте позже!', isSuccess);
  }
  // cy.wait(200).screenshot(isSuccess ? 'delete-success' : 'delete-error');
  checkCloseAlert();
  if (isSuccess) {
    checkBookingCardButton('Книга 3', false, 'забронировать', dayActive);
  }
};

const checkRateBookRequest = (isSuccess) => {
  cy.intercept('/api/comments', {
    method: 'POST',
    statusCode: isSuccess ? 200 : 400,
    body: isSuccess ? BOOK_RATE_RESPONSE : null,
    delay: 2000,
  }).as('sendRating');
  // if change data by req
  if (isSuccess) {
    cy.intercept('api/books/*', BOOK_INFO_PAGE_AFTER_COMMENT);
    cy.intercept('api/books*', BOOK_INFO_PAGE_AFTER_COMMENT);
  } else {
    cy.intercept('api/books/*', BOOK_INFO_PAGES[0]);
  }
  cy.get('[data-test-id=comment]').type(myCommentText);
  if (isSuccess) {
    cy.get('[data-test-id=modal-rate-book]').screenshot('17-rate-filled', { padding: 20 });
  }
  cy.get('[data-test-id=button-comment]').should('be.enabled').click();
  cy.get('[data-test-id=loader]').should('be.exist');
  cy.wait('@sendRating')
    .its('request.body')
    .should('have.property', 'data')
    .then((data) => {
      expect(data.book.toString()).eq('1');
      expect(data.rating.toString()).eq('4');
      expect(data.user.toString()).eq(`${myId}`);
      expect(data.text).eq(myCommentText);
    });
  // cy.screenshot(isSuccess ? 'rate-book-success' : 'rate-book-error');
  checkCloseAlert();
};

const checkStarsRating = (parentDataId, expectStars, nthParent = 0) => {
  cy.get(`[data-test-id=${parentDataId}]`).eq(nthParent).find('[data-test-id=rating]').as('rating');
  cy.get('@rating').find('[data-test-id=star-active]').should('have.length', expectStars);
};

const selectStarsRate = (starNumSelect, doScreenshot) => {
  cy.get(`[data-test-id=modal-rate-book]`).find('[data-test-id=rating]').as('rating');
  cy.get('@rating')
    .find('[data-test-id=star]')
    .eq(starNumSelect - 1)
    .click();
  checkStarsRating('modal-rate-book', starNumSelect);
  if (doScreenshot) {
    cy.get(`[data-test-id=modal-rate-book]`).screenshot(`modal-stars-is-${starNumSelect}`);
  }
};

describe('booking and book rate', () => {
  describe('booking buttons view', () => {
    before(() => {
      authorize();
    });
    it('check buttons on book info pages', () => {
      checkBookingButton(1, false, 'забронировать', 'rgb(255, 255, 255)');
      checkBookingButton(2, true, 'забронирована', 'rgb(167, 167, 167)');
      checkBookingButton(3, false, 'забронирована', 'rgb(54, 54, 54)');
      checkBookingButton(4, true, 'занята до 28.01', 'rgb(167, 167, 167)');

      cy.visit('http://localhost:3000/#/books/all');
    });
    it('check booking button active (no user)', () => {
      checkBookingCardButton('Книга 1', false, 'забронировать', 'rgb(255, 255, 255)');
    });
    it('check booking edit button active (booked by current user)', () => {
      checkBookingCardButton('Книга 3', false, 'забронирована', 'rgb(54, 54, 54)');
    });
    it('check booking button disabled (already booked)', () => {
      checkBookingCardButton('Книга 2', true, 'забронирована', 'rgb(167, 167, 167)');
    });
    it('check booking button disabled (on delivery)', () => {
      checkBookingCardButton('Книга 4', true, 'занята до 28.01', 'rgb(167, 167, 167)');
      cy.get('[data-test-id=content]').screenshot('1-all-buttons');
    });
  });

  describe('booking modal', () => {
    before(() => {
      const testDate = new Date(2023, 0, 19).getTime();
      cy.clock(testDate);
      authorize();
    });
    beforeEach(() => {
      setDate(2023, 0, 19);
    });
    it('check booking modal elements', () => {
      openBookingModal();
      checkModalElements();
    });
    it('check calendar header', () => {
      openBookingModal();
      cy.get('[data-test-id=booking-modal]').as('modal').should('exist');
      cy.get('@modal').find('[data-test-id=calendar]').as('calendar').screenshot('4-january', { padding: 10 });
      cy.get('[data-test-id=month-select]');
      cy.get('@calendar').find('[data-test-id=button-prev-month]').click();
      cy.get('[data-test-id="day-button"]').should('have.length', 35).and('have.css', 'color', dayDisabledColor);
      cy.get('@calendar').screenshot('5-december-2022', { padding: 10 });
      cy.get('@calendar').find('[data-test-id=button-next-month]').click().click();
      cy.get('@calendar').screenshot('6-february', { padding: 10 });
      cy.get('@calendar').find('[data-test-id=button-prev-month]').click();
    });
    it('check calendar days', () => {
      checkCalendarDayColor('18', dayDisabledColor, transparent);
      checkCalendarDayColor('19', todayColor, transparent);
      checkCalendarDayColor('20', dayColor, transparent);
      checkCalendarDayColor('21', dayDisabledColor, weekendBg);
      checkCalendarDayColor('15', dayDisabledColor, weekendBg);
    });
    it('check calendar days (on friday)', () => {
      closeModal();
      setDate(2023, 0, 20);
      openBookingModal();
      checkCalendarDayColor('20', todayColor, transparent);
      checkCalendarDayColor('21', dayDisabledColor, weekendBg);
      checkCalendarDayColor('23', dayColor, transparent);
      cy.get('[data-test-id=calendar]').screenshot('7-today-is-friday', { padding: 10 });
    });
    it('check calendar days (on saturday)', () => {
      closeModal();
      setDate(2023, 0, 21);
      openBookingModal();
      checkCalendarDayColor('20', dayDisabledColor, transparent);
      checkCalendarDayColor('21', todayColor, weekendBg);
      checkCalendarDayColor('23', dayColor, transparent);
      cy.get('[data-test-id=calendar]').screenshot('8-today-is-saturday', { padding: 10 });
    });
    it('check calendar days (on sunday)', () => {
      closeModal();
      setDate(2023, 0, 22);
      openBookingModal();
      checkCalendarDayColor('20', dayDisabledColor, transparent);
      checkCalendarDayColor('21', dayDisabledColor, weekendBg);
      checkCalendarDayColor('22', todayColor, weekendBg);
      checkCalendarDayColor('23', dayColor, transparent);
      cy.get('[data-test-id=calendar]').screenshot('9-today-is-sunday', { padding: 10 });
    });
    it('check calendar days (select day)', () => {
      closeModal();
      setDate(2023, 0, 20);
      openBookingModal();
      clickDay('21', true);
      checkCalendarDayColor('21', dayDisabledColor, weekendBg);
      cy.get('[data-test-id=booking-button]').should('be.disabled');
      clickDay('20');
      checkCalendarDayColor('20', dayActive, orangeGradient, true);
      cy.get('[data-test-id=booking-button]').should('be.enabled');
      cy.get('[data-test-id=booking-modal]').screenshot('10-selected-day', { padding: 10 });
    });

    it('check booking request error', () => {
      checkBookingRequest(false, false);
    });

    it('check booking request success', () => {
      openBookingModal();
      clickDay('20');
      checkBookingRequest(true, false);
    });
  });

  describe('booking edit modal', () => {
    before(() => {
      const testDate = new Date(2023, 0, 19).getTime();
      cy.clock(testDate);
      authorize();
    });
    beforeEach(() => {
      setDate(2023, 0, 19);
    });
    it('check booking edit elements', () => {
      openBookingModal(true);
      checkModalElements(true);
    });
    it('check booking edit modal calendar days', () => {
      openBookingModal(true);
      checkCalendarDayColor('19', dayActive, orangeGradient, true);
      clickDay('17', true);
      checkCalendarDayColor('17', dayDisabledColor, transparent);
      clickDay('22', true);
      checkCalendarDayColor('22', dayDisabledColor, weekendBg);
      cy.get('[data-test-id=booking-modal]')
        .find('[data-test-id=booking-button]')
        .as('submitEdit')
        .should('be.disabled')
        .contains('забронировать', { matchCase: false });
      clickDay('20');
      checkCalendarDayColor('20', dayActive, orangeGradient, true);
      checkCalendarDayColor('19', todayColor, transparent);
      cy.get('@submitEdit').should('be.enabled');
      cy.get('[data-test-id=modal-outer]').wait(200).screenshot('14-modal-edited-date');
    });
    it('check edit booking request error', () => {
      checkBookingRequest(false, true, false);
    });
    it('check edit booking request success', () => {
      openBookingModal(true);
      clickDay('20');
      checkBookingRequest(true, true, false);
      openBookingModal(true);
      checkCalendarDayColor('20', dayActive, orangeGradient, true);
      cy.get('[data-test-id=booking-modal]').find('[data-test-id=booking-button]').should('be.disabled');
    });
    it('check cancel booking error', () => {
      checkCancelBookingRequest(false);
    });
    it('check cancel booking success', () => {
      openBookingModal(true);
      checkCancelBookingRequest(true);
    });
  });

  describe('books rating', () => {
    before(() => {
      authorize();
    });
    it('check rate modal elements', () => {
      cy.intercept(`https://strapi.cleverland.by/api/books/1`, {
        body: BOOK_INFO_PAGES[0],
        statusCode: 200,
      }).as(`book1`);
      openBookPage('Книга 1');
      openRateModal();
      checkModalElements(false, true);
    });
    it('check modal stars rate', () => {
      openRateModal();
      selectStarsRate(2);
      selectStarsRate(1);
      selectStarsRate(3);
      selectStarsRate(5);
      selectStarsRate(4);
      selectStarsRate(4);
    });
    it('check rate request error', () => {
      checkRateBookRequest(false);
    });
    it('check rate request success', () => {
      openRateModal();
      selectStarsRate(4);
      checkRateBookRequest(true);
    });
    it('check comment section an sort', () => {
      cy.get('[data-test-id=comment-wrapper]').eq(0).as('comment');
      cy.get('@comment').find('[data-test-id=comment-author]').contains(`${myName} ${myLastName}`);
      cy.get('@comment').find('[data-test-id=comment-date]').contains('19 января 2023');
      checkStarsRating('comment-wrapper', 4);
      cy.get('[data-test-id=reviews]').screenshot('18-comments-updated-sort');
    });
  });
});
