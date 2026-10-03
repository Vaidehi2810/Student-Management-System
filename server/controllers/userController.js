const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(
            {
                name,
                email,
                password: hashedPassword
            },
            (err, result) => {

                if (err) {

                    return res.status(400).json({
                        message: "Email already exists"
                    });

                }

                res.status(201).json({
                    message: "Registration successful"
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }
};


exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Server error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        const validPassword =
            await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    });
};