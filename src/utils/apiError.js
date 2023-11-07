class ApiErorr extends Error {
    constructor(
         statusCode,
         massage="Some thing went wrong",
         errors=[],
         stack=''
    ){
        super(massage)
        this.statusCode=statusCode
        this.errors = errors
        this.data=null
        this.massage=massage,
        this.success=false

        if (stack) {
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiErorr}