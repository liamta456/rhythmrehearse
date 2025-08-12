const supabase = require('../supabaseClient.js');

const savePracticeSession = async (req, res) => {
    const userId = req.user.id;
    const { durationSeconds, instrument, songsPracticed, techniquesPracticed, thingsLearned, comments } = req.body;
    if (!durationSeconds || !instrument) {
        return res.status(400).json({ error: 'Duration and instrument are required.' });
    }
    try {
        const { error: insertError } = await supabase
            .from('practice_sessions')
            .insert([
                {
                    user_id: userId,
                    duration_seconds: durationSeconds,
                    instrument: instrument,
                    songs_practiced: songsPracticed,
                    techniques_practiced: techniquesPracticed,
                    things_learned: thingsLearned,
                    comments: comments
                }
        ]);
        if (insertError) {
            return res.status(500).json({ error: insertError.message });
        }
        res.status(201).json({ message: 'Practice session saved successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { savePracticeSession };