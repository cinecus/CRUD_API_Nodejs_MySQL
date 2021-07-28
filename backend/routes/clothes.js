var express = require('express');
var router = express.Router();
const db = require('../db')
const mysql = require('mysql2/promise');
const { FormValidateAddCloth } = require('../controller/clothes.middleware');
const { validationResult } = require('express-validator');

router.get('/',async(req,res,next)=>{
    const [results] =  await db.execute('SELECT * FROM clothes')
    res.send({error:false,data:results,message:"แสดงข้อมูลสำเร็จ"})
})

router.get('/search/:id',async(req,res,next)=>{
    let id = req.params.id
    const [results] = await db.execute(`SELECT * FROM clothes WHERE id=${id}`)
    res.send({error:false,data:results,message:"แสดงข้อมูลสำเร็จ"})
})

router.get('/search',async(req,res,next)=>{
    let category_name = req.query.category_name
    const [results] = await db.execute(`SELECT * FROM clothes LEFT JOIN clothes_category ON clothes.category_id=clothes_category.category_id WHERE category_name = '${category_name}'`)
    res.send({error:false,data:results,message:"แสดงข้อมูลสำเร็จ"})
})

router.post('/add',FormValidateAddCloth,async(req,res,next)=>{
    let name = req.body.name
    let price = parseFloat(req.body.price)
    let category_id = req.body.category_id
    const result = validationResult(req)
    const error = result.errors
    if(!result.isEmpty()){
        return res.send({error:true,errormsg:error,message:"กรอกข้อมูลไม่สำเร็จ"})
    }else{
        const [results] = await db.execute(`INSERT INTO clothes (name,price,category_id) VALUES("${name}",${price},${category_id})`)
        res.send({error:false,data:results,message:"เพิ่มข้อมูลสำเร็จ"})
    }
    
})

router.put('/edit/:id',async(req,res,next)=>{
    let id = req.params.id
    let price = parseFloat(req.body.price)
    const [results] = await db.execute(`UPDATE clothes SET price=${price} WHERE id= ${id}`)
    res.send({error:false,data:results,message:"แก้ไขข้อมูลสำเร็จ"})
})

router.delete('/delete/:id',async(req,res,next)=>{
    let id = req.params.id
    const [results] = await db.execute(`DELETE FROM clothes WHERE id=${id}`)
    res.send({error:false,data:results,message:"ลบข้อมูลสำเร็จ"})
})


module.exports = router;