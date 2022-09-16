import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const { error, value } = schema.validate(req.body, options)

    if(error) {
        let message = ''
        
        switch(error.details[0].path[0]) {
            case 'first_name':
                message = 'Neteisingai nurodytas vardas'
                break
            case 'last_name': 
                message = 'Neteisingai nurodyta pavardė'
                break
            case 'email': 
                message = 'Neteisingai nurodytas el. pašto adresas'
                break
            case 'password':
                message = 'Neteisingai nurodytas slaptažodis'
                break
            case 'title':
                message = 'Pavadinimas negali būti tuščias'
                break
            default:
                message = 'Neteisingai užpildyti laukeliai'
                break
        }

        return res.status(500).send(message)
    }

    req.body = value
    next()
}
 export const postValidator = (req, res, next) => {
    const schema = Joi.object({
        caption: Joi.string().min(1).max(255).required(),
        photo: Joi.string()
    })
    validate(schema, req, res, next)
}

export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}

export const commentsValidator = (req, res, next) => {
    const schema = Joi.object({
        comment: Joi.string().min(5).required(),
        postId: Joi.number().required()
    })

    validate(schema, req, res, next)
}


export default validate