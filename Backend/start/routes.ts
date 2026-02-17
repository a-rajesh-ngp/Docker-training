/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller';
import AnalyticsController from '#controllers/analytics/analytics_controller';
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
import AuthController from '#controllers/auth_controller';
import PostsController from '#controllers/posts_controller';

console.log('routes.ts');

router.group(() => {

  router.get('/', async () => {
    return {
      hello: 'world',
    }
  });
  
  router.patch('updateEmailForUser/:id', [UsersController, 'updateEmail'])
  router.delete('/deleteUser/:id', [UsersController, 'deleteUser'])

})
// .use([middleware.auth(),
  //  middleware.logging()
// ]);


router.post('/login', [AuthController, 'login']);
router.get('/users', [ UsersController, 'getUsers' ])
  .use(middleware.jwtAuth());
router.post('/createUser', [UsersController, 'createUser'])
  // .use(middleware.jwtAuth());



// analytics
router.post('createlog', [AnalyticsController, 'createLog']);

// posts routes
router.post('createPost', [PostsController, 'createPost']).use(middleware.jwtAuth());