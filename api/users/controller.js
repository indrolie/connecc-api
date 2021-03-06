const models = require('../../models')
const User = models.User

const controller = {
    showUser: (req, res, next) => {
        User
            .findAll().then(users => {
                res.send({
                    users
                });
            }).catch(error => {
                res.status(400).send({
                    error
                })
            })
    },
  
    addUser: (req, res, next) => {
        if (req.body.username && req.body.password && req.body.email) {
            User
                .build({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .save()
                .then(user => {
                    res.status(200).send(user)
                }).catch(err => {
                    res.status(500).send({
                        message: err
                    })
                })
        } else {
            res.status(404).send({
                message: 'Please fill the input field'
            })
        }
    },
  
    deleteUser: (req, res, next) => {
        const id = Number(req.params.id)
        User
            .destroy({
                where: {
                    id: id
                }
            }).then(
                res.status(200).send('Data successfully deleted')
            )
    },
  
    updateUser: (req, res, next) => {
        const id = Number(req.params.id)
        if (req.body.password && req.body.email) {
            User
                .update({
                    password: req.body.password,
                    email: req.body.email,
                    updatedAt: new Date()
                }, {where:{id: id}})
                .then(() => {
                    res.status(200).send({
                        message: "Updating success"
                    })
                })
        } else {
            res.status(417).send({
                message: "Please specify password field and email field!"
            })
        }
    },
  
    searchUserByID: (req, res, next) => {
        const id = Number(req.params.id)
        User
            .findById(id)
            .then(user => {
                if (user) {
                    res.send({
                        user
                    })
                } else {
                    res.send({
                        message: `User not found`
                    })
                }
            }).catch(error => {
                res.status(400).send({
                    error
                })
            })
    }
}

module.exports = controller