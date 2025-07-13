const supabase = require('./supabaseClient');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json({ error: 'Email, name, and password are all required.'});
    }
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });
        if (error) {
            return res.status(400).json({ error: error.message});
        }
        res.status(201).json({ message: 'User registered successfully.', user: data.user});
    } catch (error) {
        res.status(500).json({ error: 'Server error.'})
    }
};

module.exports = { register };