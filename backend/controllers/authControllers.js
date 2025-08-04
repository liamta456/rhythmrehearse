const supabase = require('../supabaseClient');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    console.log('Registering user.');
    if (!email || !name || !password) {
        console.log('Registration unsuccessful:', 'email, name, and password are required.');
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
            console.log('Registration unsuccessful:', error.message);
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
            console.log('Registration unsuccessful:', insertError.message);
            return res.status(500).json({ error: insertError.message });
        }
        console.log('Registration successful.');
        res.status(201).json({
            message: 'User registered successfully.',
            user: data.user
        });
    } catch (error) {
        console.log('Registration unsuccessful:', 'server error.');
        res.status(500).json({ error: 'Server error.' })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body; 
    console.log('Loggin in user.');
    if (!email || !password) {
        console.log('Login unsuccessful:', 'email and password are required.');
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            console.log('Login unsuccessful:', error.message);
            return res.status(400).json({ error: error.message });
        }
        console.log('Login successful.');
        res.status(200).json({
            message: 'User logged in successfully.',
            user: data.user,
            session: data.session
        });
    } catch (error) {
        console.log('Login unsuccessful:', 'server error');
        res.status(500).json({ error: 'Server error.' });
    }
};

const logout = async (req, res) => {
    res.status(200).json({ message: 'User logged out successfully.' });
};

module.exports = { register, login, logout };