import { Router } from 'express'
import response from '../../network/response.js'
import * as roleCtrl from './role.controllers.js'

const router = Router()

/**
 * POST /api/v1/role/
 * @tags role
 * @description Create Role.
 * @param {string} name.form.required
 * @return {array<Role>} 201 - create response - application/json
 * @return {array<string>} 400 - bad request response - application/json
 * @example response - 200 - create response
 * {
 *      "error": false,
 *      "status": 201,
 *      "body": [
 *                  {
 *                      "name": "name",
 *                  }
 *              ]
 * }
 * @example response - 400 - name is required
 * {
 *      "error": true,
 *      "status": 400,
 *      "body": [
 *          "name is required"
 *      ]
 * }
 * @example response - 400 - Role already exists
 * {
 *      "error": true,
 *      "status": 400,
 *      "body": [
 *          "Role already exists"
 *      ]
 * }
 */
router.post('/', createRole)

router.put('/:id', updateRole)

router.get('/', listRole)

async function createRole (req, res){
    try {
        const {name} = req.body

        const savedRole = await roleCtrl.createRole(name)
        response.success(req, res, 201, savedRole)
        
    } catch (error) {
        response.error(req, res, error.status, error.message)
    }
}

async function updateRole (req, res){
    try {
        const {name} = req.body
        const id = req.params.id

        const updateRole = await roleCtrl.updateRole(id, name)
        response.success(req, res, 200, updateRole)
        
    } catch (error) {
        response.error(req, res, error.status, error.message)
    }
}

async function listRole (req, res){
    try {
        const roles = await roleCtrl.listRoles()
        response.success(req, res, 200, roles)        
    } catch (error) {
        response.error(req, res, error.status, error.message)
    }
}
export default router