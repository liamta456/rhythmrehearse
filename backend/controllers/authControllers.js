const supabase = require('../supabaseClient');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json({ error: 'Email, name, and password are required.' });
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
            return res.status(400).json({ error: error.message });
        }
        const { error: insertError } = await supabase.from('additional_user_info').insert([
            {
                user_id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata.name,
                is_cool: false
            }
        ]);
        if (insertError) {
            return res.status(500).json({ error: insertError.message });
        }
        res.status(201).json({
            message: 'User registered successfully.',
            user: data.user
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({
            message: 'User logged in successfully.',
            user: data.user,
            session: data.session
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
}

module.exports = { register, login };