import { Router } from 'express'

import * as authCtrl from './../controller/auth.controller.js'
const router = Router()

router.post('/signup', authCtrl.signUp)

router.post('/signin', authCtrl.signIn)

router.post('/refresh', authCtrl.refresh)

export default router