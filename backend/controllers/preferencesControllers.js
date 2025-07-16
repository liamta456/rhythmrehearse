const supabase = require('../supabaseClient.js');

// TODO: Change to handle userID with req.user or req.auth using auth middleware; req.body is less secure.
const getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const { data, error } = await supabase
            .from('additional_user_info')
            .select()
            .eq('user_id', userId)
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        } else if (!data) {
            return res.status(404).json({ error: 'No such resource found.' });
        }
        res.status(200).json({ message: 'User retrieved successfully.', user: data });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
};

// TODO: Same comment as for getUser
const updateCoolValue = async (req, res) => {
    try {
        const { userId } = req.body;
        const { data: readData, error: readError } = await supabase
            .from('additional_user_info')
            .select('is_cool')
            .eq('user_id', userId)
            .single();
        if (readError) {
            return res.status(400).json({ error: readError.message });
        } else if (!readData) {
            return res.status(404).json({ error: 'No such resource found.' });
        }
        const columnToUpdate = { is_cool: !readData.is_cool };
        const { data: updateData, error: updateError } = await supabase
            .from('additional_user_info')
            .update(columnToUpdate)
            .select()
            .eq('user_id', userId)
            .single();
        if (updateError) {
            return res.status(400).json({ error: updateError.message });
        } else if (!updateData) {
            return res.status(404).json({ error: 'No such resource found.' });
        }
        res.status(200).json({ message: 'is_cool value updated successfully.', user: updateData });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getUser, updateCoolValue };