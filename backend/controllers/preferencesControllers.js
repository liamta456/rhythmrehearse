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
        res.status(200).json({ message: 'User retrieved successfully.'});
    } catch (error) {
        console.log('Getting user was unsuccessful:', 'server error.');
        res.status(500).json({ error: 'Server error.' });
    }
};

const changeCoolValue = async (req, res) => {
    console.log('Changing cool value.');
    try {
        const userId = req.user.id;
        const { data: readData, error: readError } = await supabase
            .from('additional_user_info')
            .select('is_cool')
            .eq('user_id', userId)
            .single();
        if (readError) {
            console.log('Changing cool value was unsuccessful:', readError.message);
            return res.status(400).json({ error: readError.message });
        } else if (!readData) {
            console.log('Changing cool value was unsuccessful:', 'no such resource found.');
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
            console.log('Changing cool value was unsuccessful:', updateError.message);
            return res.status(400).json({ error: updateError.message });
        } else if (!updateData) {
            console.log('Changin cool value was unsuccessful: no such resource found');
            return res.status(404).json({ error: 'No such resource found.' });
        }
        console.log('Changing cool value was successful');
        res.status(200).json({ message: 'is_cool value updated successfully.', user: updateData });
    } catch (error) {
        console.log('Changing cool value was unsuccessful:', 'server error');
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getUser, changeCoolValue };