const express = require('express');
const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const fullName = 'john_doe'; 
    const dob = '17091999';    
    const email = 'john@xyz.com';
    const rollNumber = 'ABCD123'; 

    let even = [], odd = [], alpha = [], special = [];
    let sum = 0;
    let allAlphas = '';

    data.forEach(item => {
        if (/^[0-9]+$/.test(item)) {
            let num = parseInt(item);
            if (num % 2 === 0) even.push(item);
            else odd.push(item);
            sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alpha.push(item.toUpperCase());
            allAlphas += item;
        } else {
            special.push(item);
        }
    });

 
    let reversed = allAlphas.split('').reverse();
    let altCaps = reversed.map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()).join('');

    res.status(200).json({
        is_success: true,
        user_id: `${fullName}_${dob}`,
        email: email,
        roll_number: rollNumber,
        odd_numbers: odd,
        even_numbers: even,
        alphabets: alpha,
        special_characters: special,
        sum: sum.toString(),
        concat_string: altCaps
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
