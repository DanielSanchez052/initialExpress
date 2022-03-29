import { Router } from 'express'
import response from '../../network/response.js'
import * as authCtrl from './auth.controllers.js'

const router = Router()

/**
 * POST /api/v1/auth/signup
 * @tags auth
 * @description Create a user.
 * @param {Auth} request.body.required
 * @return {array<Auth>} 201 - created response - application/json
 * @return {array<string>} 400 - bad request response - application/json
 * @example response - 201 - example created response
 * {
 *      "error": false,
 *      "status": 201,
 *      "body": [
 *                  {
 *                      "username": "vscode",
 *                      "email": "email@gmail.com",
 *                      "roles": [
 *                          "user"
 *                      ]
 *                  }
 *              ]
 * }
 * @example response - 400 - User already exists
 * {
 *      "error": true,
 *      "status": 400,
 *      "body": [
 *          "User already exists"
 *      ]
 * }
 * @example response - 400 - All fields are required
 * {
 *      "error": true,
 *      "status": 400,
 *      "body": [
 *          "All fields are required"
 *      ]
 * }
 */
router.post('/signup', signUp)

/**
 * POST /api/v1/auth/signin
 * @tags auth
 * @description Login.
 * @param {string} email.form.required
 * @param {string} password.form.required
 * @return {array<Token>} 201 - create response - application/json
 * @return {array<string>} 400 - bad request response - application/json
 * @example response - 200 - create response
 * {
 *      "error": false,
 *      "status": 201,
 *      "body": [
 *                  {
 *                      "token": "Token JWT",
 *                      "refreshToken": "refreshToken"
 *                  }
 *              ]
 * }
 * @example response - 400 - login invalid
 * {
 *      "error": true,
 *      "status": 400,
 *      "body": [
 *          "email or password is invalid"
 *      ]
 * }
 */
router.post('/signin', signIn)

/**
 * POST /api/v1/auth/refresh
 * @tags auth
 * @description Refresh token.
 * @param {string} refreshToken.form.required
 * @return {array<Token>} 201 - Created response - application/json
 * @return {array<string>} 403 - Forbidden response - application/json
 * @example response - 201 - Created response
 * {
 *      "error": false,
 *      "status": 201,
 *      "body": [
 *                  {
 *                      "token": "New Token JWT",
 *                      "refreshToken": "refreshToken"
 *                  }
 *              ]
 * }
 * @example response - 403 - No token provided
 * {
 *      "error": true,
 *      "status": 403,
 *      "body": [
 *          "No token provided"
 *      ]
 * }
 * @example response - 403 - Invalid token
 * {
 *      "error": true,
 *      "status": 403,
 *      "body": [
 *          "Invalid token"
 *      ]
 * }
 */
router.post('/refresh', refreshToken)


async function signUp (req, res) {
    try{
        const {username, email, password, roles} = req.body
       
        const newUser = {
            username:username,
            email:email,
            password: password,
            roles: roles
        }

        const savedUser = await authCtrl.signUp(newUser)
        response.success(req, res, 201, savedUser)
    }catch(error){
        response.error(req, res, error.status, error.message)
    }
}

async function signIn (req, res) {
    try {
        const { email, password } = req.body

        const token = await authCtrl.signIn (email, password)

        response.success(req, res, 200, token)
    } catch (error) {
        response.error(req, res, error.status, error.message)
    }
}

async function refreshToken (req, res) { 
    try {
        const { refreshToken } = req.body

        const newToken = await authCtrl.refresh(refreshToken) 

        response.success(req, res, 201, newToken )
    } catch (error) {
        response.error(req,res, error.status, error.message)
    }
}

export default router