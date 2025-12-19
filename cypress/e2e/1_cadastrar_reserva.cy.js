/// <reference types = "cypress"/>

const dados_cadastro = require('../fixtures/cadastro_dados_fixos.json')

describe('Cadastrar Reserva', () => {
  it('Cadastrar reserva com sucesso', () => {

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: dados_cadastro
    })
    .then ((resposta) => {
      expect(resposta.status).to.equal(200),
      expect(resposta.body.bookingid).to.exist,
      expect(resposta.body.booking.firstname).to.equal(dados_cadastro.firstname)
      expect(resposta.body.booking.lastname).to.equal(dados_cadastro.lastname)
      expect(resposta.body.booking.bookingdates.checkin).to.equal(dados_cadastro.bookingdates.checkin)
      expect(resposta.body.booking.bookingdates.checkout).to.equal(dados_cadastro.bookingdates.checkout)
    })
  })
})

