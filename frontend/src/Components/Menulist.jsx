import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menulist.css';
import juice from './Assets/juice.png'
import juice2 from './Assets/juice2.png'
import left from './Assets/left.png'
import right from './Assets/right.png'
import h2 from './Assets/h2.png'
import tele from './Assets/Group.png'
import mail from './Assets/Vector.png'
import loc from './Assets/loc.png'
import social from './Assets/social.png'

function Menulist() {
    const [activeCategory, setActiveCategory] = useState('category1');
    const [foodItems, setFoodItems] = useState([]);
    const [drinkItems, setDrinkItems] = useState([]);
    const [brunchItems, setBrunchItems] = useState([]);

    // State for add item form
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    // Fetch items based on the category
    useEffect(() => {
        const fetchItems = async (category) => {
            try {
                const response = await axios.get(`${process.env.REACT_API_URL}/api/menus/${category}/items`);
                switch (category) {
                    case 'FOOD':
                        setFoodItems(response.data);
                        break;
                    case 'DRINKS':
                        setDrinkItems(response.data);
                        break;
                    case 'BRUNCH':
                        setBrunchItems(response.data);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error(`Error fetching ${category} items:`, error);
            }
        };

        if (activeCategory === 'category1') fetchItems('FOOD');
        else if (activeCategory === 'category2') fetchItems('DRINKS');
        else if (activeCategory === 'category3') fetchItems('BRUNCH');
    }, [activeCategory]);

    // Handle adding items
    const handleAddItem = async () => {
        if (!itemName || !itemPrice || !itemDescription || !selectedCategory) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_API_URL}/api/menus/${selectedCategory}/items`,
                {
                    name: itemName,
                    description: itemDescription,
                    price: itemPrice,
                }
            );

            alert('Item successfully added!');
            setItemName('');
            setItemPrice('');
            setItemDescription('');
            setSelectedCategory('');

            // Refresh the specific category
            if (selectedCategory === 'FOOD') setFoodItems([...foodItems, response.data]);
            if (selectedCategory === 'DRINKS') setDrinkItems([...drinkItems, response.data]);
            if (selectedCategory === 'BRUNCH') setBrunchItems([...brunchItems, response.data]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <div className="left">
                    <img src={h2} alt="Logo" />
                    <p><span1>DEEP</span1> NET <br /><span2>SOFT</span2></p>
                </div>
                <div className="right">
                    <ul>
                        <li
                            onClick={() => handleCategoryChange('category1')}
                            className={activeCategory === 'category1' ? 'active' : ''}
                        >
                            HOME
                        </li>
                        <li>MENU</li>
                        <li>MAKE A RESERVATION</li>
                        <li>CONTACT US</li>
                    </ul>
                </div>
            </div>

            {/* Menu Bar */}
            <div className="menubar">
                <h1>MENU</h1>
                <p>
                    Please take a look at our menu featuring food, drinks, and brunch. If you'd like to <br />
                    place an order, use the "Order Online" button located below the menu.
                </p>
            </div>

            {/* Buttons */}
            <div className="buttons">
                <button
                    onClick={() => handleCategoryChange('category1')}
                    className={activeCategory === 'category1' ? 'active-button' : ''}
                >
                    FOOD
                </button>
                <button
                    onClick={() => handleCategoryChange('category2')}
                    className={activeCategory === 'category2' ? 'active-button' : ''}
                >
                    DRINKS
                </button>
                <button
                    onClick={() => handleCategoryChange('category3')}
                    className={activeCategory === 'category3' ? 'active-button' : ''}
                >
                    BRUNCH
                </button>
                <button
                    onClick={() => handleCategoryChange('category4')}
                    className={activeCategory === 'category4' ? 'active-button' : ''}
                >
                    Add Items
                </button>
            </div>

            {/* Conditional Rendering of Categories */}
            <div className="category">
                <div className="leftimg">
                    <img src={left} alt="" />
                </div>
                <div className="rightimg">
                    <img src={right} alt="" />

                </div>

                <div className="juice">
                    <img src={juice} className='juice' alt="" />
                </div>
                <div className="juice2">
                    <img src={juice2} className='juice2' alt="" />
                </div>

                {activeCategory === 'category1' && (
                    <div className="category1">
                        <h2>FOOD MENU</h2>
                        <div className="grid">
                            {foodItems.map((item) => (
                                <div key={item._id} className="grid-item">
                                    <p className="item-title">
                                        {item.name}..........................${item.price}
                                    </p>
                                    <p className="item-description">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeCategory === 'category2' && (
                    <div className="category2">
                        <h2>DRINKS MENU</h2>
                        <div className="grid">
                            {drinkItems.map((item) => (
                                <div key={item._id} className="grid-item">
                                    <p className="item-title">
                                        {item.name}..........................${item.price}
                                    </p>
                                    <p className="item-description">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeCategory === 'category3' && (
                    <div className="category3">
                        <h2>BRUNCH MENU</h2>
                        <div className="grid">
                            {brunchItems.map((item) => (
                                <div key={item._id} className="grid-item">
                                    <p className="item-title">
                                        {item.name}..........................${item.price}
                                    </p>
                                    <p className="item-description">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeCategory === 'category4' && (
                    <div className="category4">
                        <h2>Add or Update Items</h2>
                        <div className="items">
                            <input
                                className="name"
                                type="text"
                                placeholder="Item Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                            <input
                                className="price"
                                type="number"
                                placeholder="Item Price"
                                value={itemPrice}
                                onChange={(e) => setItemPrice(e.target.value)}
                            />
                            <input
                                className="description"
                                type="text"
                                placeholder="Item Description"
                                value={itemDescription}
                                onChange={(e) => setItemDescription(e.target.value)}
                            />
                            <select
                                name="category"
                                className="productselector"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="FOOD">FOOD</option>
                                <option value="DRINKS">DRINKS</option>
                                <option value="BRUNCH">BRUNCH</option>
                            </select>
                            <button className="add" onClick={handleAddItem}>
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="contact">
                <div className="connect">
                    <h6>Connect with Us</h6>
                    <div className="telephone">
                        <img src={tele} alt="" />
                        <p>+91 9567843340</p>

                    </div>
                    <div className="mail">
                        <img src={mail} alt="" />
                        <p>info@deepnetsoft.com</p>

                    </div>

                </div>
                <div className="deep">
                    <img src={h2} alt="" />
                    <p><span1>DEEP</span1> NET <span2>SOFT</span2></p>
                    <div className="social">
                        <img src={social} alt="" />
                    </div>

                </div>
                <div className="find">
                    <h6>Find Us</h6>
                    <div className="location">
                        <img src={loc} alt="" />
                        <p>First floor, Geo infopark,<br /> Infopark EXPY, Kakkanad</p>
                    </div>


                </div>
            </div>



            {/* Footer */}
            <div className="footer">
                <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
                <div className="footerright">
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default Menulist;
