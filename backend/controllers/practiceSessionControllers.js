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

const getPracticeSessionList = async (req, res) => {
    const userId = req.user.id;
    try {
        const { data, error: getError } = await supabase
            .from('practice_sessions')
            .select('id, created_at, duration_seconds, instrument')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(10);
        if (getError) {
            return res.status(500).json({ error: getError.message });
        }
        return res.status(200).json({ practiceSessions: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPracticeSession = async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.params.id;
    try {
        const { data, error: getError } = await supabase
            .from('practice_sessions')
            .select(`
                id, created_at, user_id, duration_seconds, instrument,
                songs_practiced, techniques_practiced, things_learned,
                comments, updated_at
                `)
            .eq('id', sessionId)
            .eq('user_id', userId)
            .single();
        if (getError) {
            return res.status(500).json({ error: getError.message });
        } else if (!data) {
            return res.status(404).json({ error: 'Practice session not found.' });
        }
        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePracticeSession = async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.params.id;
    const { instrument, songsPracticed, techniquesPracticed, thingsLearned, comments } = req.body;
    if (!instrument) {
        return res.status(400).json({ error: 'Instrument is required.' });
    }

    const updateData = {};
    if (instrument !== undefined) updateData.instrument = instrument;
    if (songsPracticed !== undefined) updateData.songs_practiced = songsPracticed;
    if (techniquesPracticed !== undefined) updateData.techniques_practiced = techniquesPracticed;
    if (thingsLearned !== undefined) updateData.things_learned = thingsLearned;
    if (comments !== undefined) updateData.comments = comments;

    try {
        const { data: existingSession, error: getError } = await supabase
            .from('practice_sessions')
            .select('id')
            .eq('id', sessionId)
            .eq('user_id', userId)
            .single();
        if (getError || !existingSession) {
            return res.status(404).json({ error: 'Invalid practice session ID.' });
        }

        const { error: updateError } = await supabase
            .from('practice_sessions')
            .update(updateData)
            .eq('id', sessionId)
            .eq('user_id', userId);
        if (updateError) {
            return res.status(500).json({ error: updateError.message });
        }
        res.status(200).json({ message: 'Practice session updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletePracticeSession = async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.params.id;
    try {
        const { error: deleteError } = await supabase
            .from('practice_sessions')
            .delete()
            .eq('id', sessionId)
            .eq('user_id', userId)
            .select()
            .single();
        if (deleteError) {
            return res.status(404).json({ error: deleteError.message });
        }
        res.status(200).json({ message: 'Practice session successfully deleted.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { savePracticeSession, getPracticeSessionList, getPracticeSession, updatePracticeSession, deletePracticeSession };