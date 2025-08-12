const supabase = require('../supabaseClient.js');

const getUser = async (req, res) => {
    console.log('Getting user.');
    try {
        const userId = req.user.id;
        const { data, error } = await supabase
            .from('additional_user_info')
            .select()
            .eq('user_id', userId)
            .single();
        if (error) {
            console.log('Getting user was unsuccessful:', error.message);
            return res.status(400).json({ error: error.message });
        } else if (!data) {
            console.log('Getting user was unsuccessful:', 'no such resource found.');
            return res.status(404).json({ error: 'No such resource found.' });
        }
        console.log('Getting user was successful:', data);
        res.status(200).json({ message: 'User retrieved successfully.', data});
    } catch (error) {
        console.log('Getting user was unsuccessful:', 'server error.');
        res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = { getUser };