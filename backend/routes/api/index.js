const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const playlistsRouter = require('./playlists.js')

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/songs', songsRouter)
router.use('/playlists', playlistsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// // TEST ROUTES
// // *******************************************
// // GET /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// // *******************************************

module.exports = router;