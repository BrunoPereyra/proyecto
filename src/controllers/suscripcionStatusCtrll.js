const mercadopago = require("mercadopago");
const Users = require("../models/users")

const suscripcionStatus = (req, res) => {
  const { collection_id, collection_status, external_reference } = req.query
  const { idUser } = req
  mercadopago.payment.get(collection_id)
    .then(async response => {
      const { status, transaction_amount } = response.body


      if (status === 'approved') {
        const user = await Users.findOne({ _id: idUser });

        user.isPremium = 1;
        await user.save();

        res.send('Pago aprobado')
      } else {
        res.send('Pago no aprobado')
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Ha ocurrido un error al verificar el estado de la suscripción')
    });
};

module.exports = suscripcionStatus;