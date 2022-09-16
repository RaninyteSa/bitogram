import express from 'express'
import db from '../database/connect.js'
import { postValidator } from '../middleware/validate.js'
import upload from '../middleware/multer.js'
import { adminAuth } from '../middleware/auth.js'
// import { any } from 'joi'
import { Op } from 'sequelize'

const router = express.Router()



router.get('/', async (req, res) => {
    const options = {}

    if(req.query.order)
        options.order= [['pavadinimas', 'DESC']]


  try {
    const posts = await db.Posts.findAll(options)
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).send('serverio kklaida')
  }  
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: [db.Users, db.Comments]
        })
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.get('/userpost/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: db.Users
        })
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

//paieska

router.get('/search/:keyword', async (req, res) => {
    try {
        const posts = await db.Posts.findAll({
            where: {
                pavadinimas: {
                    [Op.like]: '%' + req.params.keyword + '%'
                }
            }
        })
        res.json(posts)
    } catch(error) {
        console.log(error)
        res.status(200).send('ivyko serverio klaida')
    }
})

router.get('/page/:page', async (req, res) => {
    try {

        const post = await db.Posts.findByPk(req.params.id, {
            attributes:['photo', 'caption', 'coments']
        })
        res.json(post)
    } catch(error) {
        console.log(error)
        res.status(200).send('ivyko serverio klaida')
    }
})

router.post('/', adminAuth , upload.single('photo'),  postValidator,  async (req, res) => {
    console.log(req.file);
    try {
        if(req.file) 
            req.body.photo = '/uploads/' + req.file.filename
            
        new db.Posts(req.body).save()
        res.send('Įrašas sėkmingai sukurtas')
    } catch (error) {
        res.status(500).send('Įviko serverio klaida')
    }
    
    
})

router.put('/edit/:id', adminAuth , upload.single('nuotrauka'), async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.update(req.body)
        res.send('Įrašas sėkmingai atnaujintas')
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.delete('/delete/:id', adminAuth , async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.destroy()
        res.json({ message: 'Įrašas sėkmingai ištrintas' })
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

//CRUD - Create, Read, Update, Delete
//       POST    GET    PUT    DELETE

export default router