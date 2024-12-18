const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


router.get('/:category/items', async (req, res) => {
    try {
        const { category } = req.params;
        const items = await Item.find({ category });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error });
    }
});


router.post('/:category/items', async (req, res) => {
    try {
        const { category } = req.params;
        const { name, price, description } = req.body;

        const newItem = new Item({
            name,
            price,
            description,
            category,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item', error });
    }
});

module.exports = router;
