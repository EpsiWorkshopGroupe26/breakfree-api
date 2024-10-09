/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const EmotionsController = () => import('#controllers/emotions_controller')
const GeneralInformationsController = () => import('#controllers/general_informations_controller')
const MentalHealthsController = () => import('#controllers/mental_healths_controller')
const MotivationsController = () => import('#controllers/motivations_controller')
const ObjectivesController = () => import('#controllers/objectives_controller')
const AddictionController = () => import('#controllers/addictions_controller')

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('/register', [AuthController, 'register'])
            router.post('/login', [AuthController, 'login'])
            router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
            router.delete('/user/delete', [AuthController, 'delete']).use(middleware.auth())
          })
          .prefix('auth') // Authentification routes --
        router
          .group(() => {
            router.get('/shows', [AddictionController, 'getAddictions'])
            router.get('/show/:id', [AddictionController, 'getAddiction'])
            router.post('/create', [AddictionController, 'createAddiction'])
            router.put('/update/:id', [AddictionController, 'updateAddiction'])
            router.delete('/delete/:id', [AddictionController, 'deleteAddiction'])
          })
          .use(middleware.auth())
          .prefix('addictions') // Addiction routes --
        router
          .group(() => {
            router.get('/show', [GeneralInformationsController, 'getUserInfo'])
            router.post('/create', [GeneralInformationsController, 'createUserInfo'])
            router.put('/update/:id', [GeneralInformationsController, 'updateUserInfo'])
            router.delete('/delete/:id', [GeneralInformationsController, 'deleteUserInfo'])
          })
          .use(middleware.auth())
          .prefix('userInfos') // Genral Information routes --
        router
          .group(() => {
            router.get('/shows', [EmotionsController, 'getEmotions'])
            router.get('/show/:id', [EmotionsController, 'getEmotion'])
            router.post('/create', [EmotionsController, 'createEmotion'])
            router.put('/update/:id', [EmotionsController, 'updateEmotion'])
            router.delete('/delete/:id', [EmotionsController, 'deleteEmotion'])
          })
          .use(middleware.auth())
          .prefix('emotions') // Emotions routes --
        router
          .group(() => {
            router.get('/shows', [MentalHealthsController, 'getMentalHealths'])
            router.get('/show/:id', [MentalHealthsController, 'getMentalHealth'])
            router.post('/create', [MentalHealthsController, 'createMentalHealth'])
            router.put('/update/:id', [MentalHealthsController, 'updateMentalHealth'])
            router.delete('/delete/:id', [MentalHealthsController, 'deleteMentalHealth'])
          })
          .use(middleware.auth())
          .prefix('mentalHealths') // Mental Health routes --
        router
          .group(() => {
            router.get('/shows', [MotivationsController, 'getMotivations'])
            router.get('/show/:id', [MotivationsController, 'getMotivation'])
            router.post('/create', [MotivationsController, 'createMotivation'])
            router.put('/update/:id', [MotivationsController, 'updateMotivation'])
            router.delete('/delete/:id', [MotivationsController, 'deleteMotivation'])
          })
          .use(middleware.auth())
          .prefix('motivations') // Motivation routes --
        router
          .group(() => {
            router.get('/shows', [ObjectivesController, 'getObjectives'])
            router.get('/show/:id/addiction/:idAddiction', [ObjectivesController, 'getObjective'])
            router.post('/create/:id', [ObjectivesController, 'createObjective'])
            router.put('/update/:id/addiction/:idAddiction', [
              ObjectivesController,
              'updateObjective',
            ])
            router.delete('/delete/:id/addiction/:idAddiction', [
              ObjectivesController,
              'deleteObjective',
            ])
          })
          .use(middleware.auth())
          .prefix('objectives') // Objective routes --
      })
      .prefix('v1')
  })
  .prefix('api')
