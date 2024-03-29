const bbs = [
    {
        title: '米游社 - 用户关注',
        docs: 'https://docs.rsshub.app/routes/game#mi-ha-you',
        source: '/:game/accountCenter/postList',
        target: (params, url) => {
            const uid = new URL(url).searchParams.get('id');
            return `/mihoyo/bbs/follow-list/${uid}`;
        },
    },
    {
        title: '米游社 - 同人榜',
        docs: 'https://docs.rsshub.app/routes/game#mi-ha-you',
        source: '/:game/imgRanking/:forum_id/:ranking_id/:cate_id',
        target: `/mihoyo/bbs/img-ranking/:game`,
    },
    {
        title: '米游社 - 官方公告',
        docs: 'https://docs.rsshub.app/routes/game#mi-ha-you',
        source: ['/:game/home/28', '/:game/home/6', '/:game/home/31', '/:game/home/33', '/:game/home/53', '/:game/home/58'],
        target: (params, url) => {
            const GITS_MAP = {
                bh3: 1, // '崩坏三',
                ys: 2, // '原神',
                bh2: 3, // '崩坏二',
                wd: 4, // '未定事件簿',
                sr: 6, // '崩坏：星穹铁道',
                zzz: 8, // '绝区零'
            };
            const { game } = params;
            const gids = GITS_MAP[game];
            if (!gids) {
                return '';
            }
            const type = new URL(url).searchParams.get('type') || '1';
            const page_size = '20';
            const last_id = '';
            return `/mihoyo/bbs/official/${gids}/${type}/${page_size}/${last_id}`;
        },
    },
    {
        title: '米游社 - 用户帖子',
        docs: 'https://docs.rsshub.app/routes/game#mi-ha-you',
        source: '/:game/accountCenter/postList',
        target: (params, url) => {
            const uid = new URL(url).searchParams.get('id');
            return `/mihoyo/bbs/user-post/${uid}`;
        },
    },
];
module.exports = {
    'hoyoverse.com': {
        _name: '米哈游',
        genshin: [
            {
                title: '原神 - 新闻',
                docs: 'https://docs.rsshub.app/routes/game##mi-ha-you',
                source: '/:location/news',
                target: '/mihoyo/ys/:location',
            },
        ],
        hsr: [
            {
                title: '崩坏：星穹铁道 - 新闻',
                docs: 'https://docs.rsshub.app/routes/game##mi-ha-you',
                source: '/:location/news',
                target: '/mihoyo/sr/:location',
            },
        ],
    },
    'mihoyo.com': {
        _name: '米哈游',
        bbs,
        sr: [
            {
                title: '崩坏：星穹铁道 - 新闻',
                docs: 'https://docs.rsshub.app/routes/game##mi-ha-you',
                source: '/news',
                target: '/mihoyo/sr',
            },
        ],
        ys: [
            {
                title: '原神 - 新闻',
                docs: 'https://docs.rsshub.app/routes/game##mi-ha-you',
                source: '/:location/news/:category',
                target: '/mihoyo/ys/:location/:category',
            },
        ],
    },
    'miyoushe.com': {
        _name: '米游社',
        '.': bbs,
    },
};
