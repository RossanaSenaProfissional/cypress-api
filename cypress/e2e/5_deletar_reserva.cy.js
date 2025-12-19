/// <reference types = "cypress"/>

const dados_cadastro = require('../fixtures/cadastro_dados_fixos.json')

describe('Deletar Reserva', () => {

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

                //Deletar
                cy.request({
                    method: 'DELETE',
                    url: `https://restful-booker.herokuapp.com/booking/${id_reserva}`,
                    headers: {
                        cookie: `token=${token}`
                    }
                })
                    .then((resposta_updated) => {
                        expect(resposta_updated.status).to.equal(201)
                    })
            })
    })
})