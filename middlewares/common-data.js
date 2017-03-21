module.exports = (req, res, next) => {
    // Складывать данные в res.locals – рекомендованный способ
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Awesome photo quests'
    };

    res.locals.title = 'Photo quests';

    // В бою статику получаем с CDN
    if (process.env.NODE_ENV === 'production') {
        res.locals.staticBasePath = '//team3.surge.sh';
    }

    next();
};
