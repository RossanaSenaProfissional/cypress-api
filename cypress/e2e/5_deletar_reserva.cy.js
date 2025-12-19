/// <reference types = "cypress"/>

const dados_cadastro = require('../fixtures/cadastro_dados_fixos.json')
const dados_updated = require('../fixtures/atualizacao_dados_updated.json')

describe('Atualizar Reserva', () => {

  let token

  before(() => {

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        "username": "admin",
        "password": "password123"
      }
    })
      .then((resposta) => {
        token = resposta.body.token
      })
  })


  it('Deletar reserva com sucesso', () => {

    //Cadastro
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: dados_cadastro
    })
      .then((resposta) => {
        expect(resposta.status).to.equal(200);

        const id_reserva = resposta.body.bookingid

        //Atualização
        cy.request({
          method: 'PUT',
          url: `https://restful-booker.herokuapp.com/booking/${id_reserva}`,
          headers: {
            cookie: `token=${token}`
          }
        })
          .then((resposta_updated) => {
            expect(resposta_updated.status).to.equal(200)
            expect(resposta_updated.body.firstname).to.equal(dados_updated.firstname)
            expect(resposta_updated.body.lastname).to.equal(dados_updated.lastname)
            expect(resposta_updated.body.totalprice).to.equal(dados_updated.totalprice)
            expect(resposta_updated.body.bookingdates.checkin).to.equal(dados_updated.bookingdates.checkin)
            expect(resposta_updated.body.bookingdates.checkout).to.equal(dados_updated.bookingdates.checkout)
            expect(resposta_updated.body.additionalneeds).to.equal(dados_updated.additionalneeds)
          })
      })
  })
})