/// <reference types = "cypress"/>

const gerador = require('../fixtures/cadastro_dados_aleatorios_utils')

describe('Cadastrar Reserva', () => {
    it('Cadastrar reserva com sucesso - Dados aleatórios', () => {

        const payload_aleatorio = gerador.gerarReserva()

        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: payload_aleatorio
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(200)
                expect(resposta.body.bookingid).to.exist
                expect(resposta.body.booking.firstname).to.equal(payload_aleatorio.firstname)
                expect(resposta.body.booking.lastname).to.equal(payload_aleatorio.lastname)
                expect(resposta.body.booking.totalprice).to.equal(payload_aleatorio.totalprice)
                expect(resposta.body.booking.bookingdates.checkin).to.equal(payload_aleatorio.bookingdates.checkin)
                expect(resposta.body.booking.bookingdates.checkout).to.equal(payload_aleatorio.bookingdates.checkout)
            })
    })
})
