const {check,validationResult} = require('express-validator')
const db = require('../db')
const mysql = require('mysql2/promise')

const FormValidateAddCloth = [
    check('name').trim().notEmpty().withMessage("กรุณาระบุชื่อ Item"),
    check('price').trim().notEmpty().withMessage("กรุณาระบุราคา").isFloat().withMessage("ระบุเป็นตัวเลขเท่านั้น"),
    check('category_id').trim().notEmpty().withMessage("กรุณาระบุหมวดหมู่").custom( async value=>{
        const [row] = await db.execute(`SELECT * FROM clothes_category WHERE category_id = ${value}`)
        if(!row[0]){
            throw new Error("ระบุหมวดหมู่ผิดพลาด")
        }
    })
]

module.exports ={
    FormValidateAddCloth
}