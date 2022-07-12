const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    const { code, name, hp, mana } = req.body;
    if (!code || !name || !hp || !mana ) return res.status(404).send('Falta enviar datos obligatorios');
    try {
        const newCharacter = await Character.create(req.body);
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(404).send('Error en alguno de los datos provistos');
    }
});

router.get('/', async (req, res) => {
    const { race, name, hp, age } = req.query;

    const condition = {};
    const where = {}
    const attributes = [];

    if(race) where.race = race;
    if(age) where.age = age;
    if(name) attributes.push('name');
    if(hp) attributes.push('hp');

    if(attributes.length > 0) condition.attributes = attributes;
    if(where) condition.where = where;

    const characters = await Character.findAll(condition);
    res.json(characters)

})

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    const character = await Character.findByPk(code);
    if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
    res.json(character)
    // RESUELTO CON PROMESA
    // Character.findByPk(code)
    //     .then(character => {
    //         if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
    //         res.json(character)
    //     })
})

module.exports = router;