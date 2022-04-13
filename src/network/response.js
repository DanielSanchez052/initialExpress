 /**
   * @typedef {object} ApiResponse
   * @property {boolean} error 
   * @property {number} status
   * @property {array<object>} body 
   */

const statusDefault = {
    200 : "OK",
    201 : "CREATED",
    202 : "ACCEPTED",
    204 : "NO CONTENT",
    400 : "BAD REQUEST",
    401 : "UNAUTHORIZED",
    403 : "FORBIDDEN",
    404 : "NOT FOUND",
    500 : "INTERNAL ERROR"
}

export default {
    success : (req, res, status, body=statusDefault[status])=>{
        status = status <= 399 && status >= 200  ? status : 200
        body = !Array.isArray(body) ? [body] : body 
        res.status(status).json({
            error : false,
            status,
            body
        })
    },
    error : (req, res, status = 500, body=statusDefault[status]) => {
        status = status >= 400 ? status : 500 
        body = !Array.isArray(body) ? [body] : body 
        res.status(status).json({
            error : false,
            status,
            body
        })
    }
}