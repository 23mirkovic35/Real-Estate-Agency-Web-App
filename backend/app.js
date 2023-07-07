const express=require('express');
const cors=require('cors');
const multer=require('multer');
const mysql=require('mysql');
const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const conn = mysql.createPool({
    connectionLimit: 50,
    host:"localhost",
    user:"root",
    password:"",
    database:"projekat_pia"
});
app.listen(3000, ()=>{
    console.log("The server started on port 3000");
})

const storage=multer.diskStorage({
    destination:(req,res,callBack)=>{
        //callBack(null,'./uploads');
        callBack(null, '../frontend/src/assets/uploads/users')
    },
    filename: (req,file,callBack)=>{
        callBack(null,file.originalname);
    }
});

var upload=multer({storage:storage});

app.post('/singup/:firstName/:lastName/:username/:password/:email/:city/:country/:number', upload.single('file'), (req,res,next)=>{
    console.log(req.params.number);
    if(req.params.number==0){
        conn.getConnection((err,tmp)=>{
            if(err){
                res.json({
                    err:"ERROR"
                })
            }
            else{
                
                let query = "INSERT INTO `korisnici`(`firstName`, `lastName`, `username`, `password`, `email`, `city`, `country`, `imagePath`, `type`) VALUES (?,?,?,?,?,?,?,?,?)";
                if(req.file==null){
                    tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,"noImage.png",'korisnik'],(err) =>{
                        if(err){
                            res.json({
                                err:"ERROR1"
                            })
                        }
                        else{
                            res.json({
                                insert:true
                            });
                        }
                    });
                }else {
                    tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,req.file.filename,'korisnik'],(err) =>{
                    if(!!err){
                        console.log("ERRPP");
                        res.json({
                            err:"ERROR1"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                    }
                });
                }
            }
            
            tmp.release();
        });
    }else if(req.params.number==1){
        conn.getConnection((err,tmp)=>{
            if(err){
                res.json({
                    err:"ERROR"
                })
            }
            else{
                
                let query = "INSERT INTO `korisnici`(`firstName`, `lastName`, `username`, `password`, `email`, `city`, `country`, `imagePath`, `type`, `accepted`) VALUES (?,?,?,?,?,?,?,?,?,?)";
                if(req.file==null){
                    tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,"noImage.png",'korisnik',true],(err) =>{
                        if(err){
                            res.json({
                                err:"ERROR1"
                            })
                        }
                        else{
                            res.json({
                                insert:true
                            });
                        }
                    });
                }else {
                    tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,req.file.filename,'korisnik',true],(err) =>{
                    if(!!err){
                        console.log("ERRPP");
                        res.json({
                            err:"ERROR1"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                    }
                });
                }
            }
            
            tmp.release();
        });
    }else{
        conn.getConnection((err,tmp)=>{
            if(err){
                res.json({
                    err:"ERROR"
                })
            }
            else{
                
                let query = "INSERT INTO `korisnici`(`firstName`, `lastName`, `username`, `password`, `email`, `city`, `country`, `imagePath`, `type`, `accepted`) VALUES (?,?,?,?,?,?,?,?,?,?)";
                if(req.file==null){
                    tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,"noImage.png",'radnik',1],(err) =>{
                        if(err){
                            res.json({
                                err:"ERROR1"
                            })
                        }
                        else{
                            res.json({
                                insert:true
                            });
                        }
                    });
                }else {
                    tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,req.file.filename,'ranik',1],(err) =>{
                    if(!!err){
                        console.log("ERRPP");
                        res.json({
                            err:"ERROR1"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                    }
                });
                }
            }
            
            tmp.release();
        });
    }
});

app.post("/login",(req,res) => {
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            //let query ="SELECT * FROM `users` WHERE `users`.`username` = '"+req.body.username+"'";
            let query = "SELECT * FROM `korisnici` WHERE username=? AND password=? AND type=? and accepted=1";
            tmp.query(query,[req.body.username,req.body.password, req.body.type],(err,result) =>{
                
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    //res.json(result);
                   /*res.json({
                       length: result.length
                   })*/
                   if(result.length>0){
                        res.json({
                            login: true,
                            arrayOfUsers:result
                        })
                        console.log(result[0]);
                        
                   }
                   else{
                         res.json({
                            login: false
                         })
                         console.log("NIJE");
                   }
                }
            });
        }
        tmp.release();
    });
});
app.post("/admin",(req,res) => {
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            //let query ="SELECT * FROM `users` WHERE `users`.`username` = '"+req.body.username+"'";
            let query = "SELECT * FROM `korisnici` WHERE accepted=0";
            tmp.query(query,(err,result) =>{
                
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                   if(result.length>0){
                        res.json({
                            login: true,
                            arrayOfUsers:result
                        })
                        console.log("Ima korisnika");
                        
                   }
                   else{
                         res.json({
                            login: false
                         })
                   }
                }
            });
        }
        tmp.release();
    });
});
app.post("/delete/:username",(req,res) => {
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
        else{
            let query = "DELETE FROM `korisnici` WHERE username=?";
            tmp.query(query,[req.params.username],(err) =>{
                
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    let query_delete='DELETE FROM `nekretnine` WHERE owner=?';
                    tmp.query(query_delete,[req.params.username],(err)=>{
                        if(err)console.log(err)
                        else{
                            res.json({delete:true})
                        }
                    })
                }
            });
        }
        tmp.release();
    });
});
app.post("/accept/:username",(req,res) => {
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            let query = "UPDATE `korisnici` SET `accepted`=1 WHERE username=?";
            tmp.query(query,[req.params.username],(err) =>{
                
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                   res.json({
                    accept:true
                   })
                   console.log(req.params.username)
                }
            });
        }
        tmp.release();
    });
});
app.post("/change",(req,res) => {
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            //let query ="SELECT * FROM `users` WHERE `users`.`username` = '"+req.body.username+"'";
            let query = "SELECT * FROM `korisnici` WHERE accepted=1 AND type!='admin'";
            tmp.query(query,(err,result) =>{
                
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                   if(result.length>0){
                        res.json({
                            login: true,
                            arrayOfUsers:result
                        })
                        console.log("Ima korisnika");
                        
                   }
                   else{
                         res.json({
                            login: false
                         })
                   }
                }
            });
        }
        tmp.release();
    });
});

app.post('/updateUser/:id/:firstName/:lastName/:username/:password/:email/:city/:country', upload.single('file'), (req,res,next)=>{
    console.log(req.params.id);
    console.log(req.params.firstName);
    console.log(req.params.lastName);
    console.log(req.params.username);
    console.log(req.params.password);
    console.log(req.params.email);
    console.log(req.params.city);
    console.log(req.params.country);
    if(req.file==null){
        console.log('no image');
    }else console.log(req.file.filename)
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            if(req.file==null){
                let query = "UPDATE `korisnici` SET `firstName`=?,`lastName`=?,`username`=?,`password`=?,`email`=?,`city`=?,`country`=? WHERE `id`=?";
                tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,req.params.id],(err) =>{
                    if(err){
                        res.json({
                            err:"ERROR1"
                        })
                    }
                    else{
                        res.json({
                            update:true
                        });
                    }
                });
            }else {
                let query = "UPDATE `korisnici` SET `firstName`=?,`lastName`=?,`username`=?,`password`=?,`email`=?,`city`=?,`country`=?,`imagePath`=? WHERE `id`=?";
                tmp.query(query,[req.params.firstName,req.params.lastName,req.params.username,req.params.password,req.params.email,req.params.city,req.params.country,req.file.filename,req.params.id],(err) =>{
                if(!!err){
                    console.log("ERRPP");
                    res.json({
                        err:"ERROR1"
                    })
                }
                else{
                    res.json({
                        update:true
                    });
                }
            });
            }
        }
        
        tmp.release();
    });
});

const storageMultipleImages=multer.diskStorage({
    destination:(req,res,callBack)=>{
        //callBack(null,'./uploads');
        callBack(null, '../frontend/src/assets/uploads/immovables')
    },
    filename: (req,file,callBack)=>{
        callBack(null,file.originalname);
    }
});
var uploads=multer({storage:storageMultipleImages});

app.post('/singupRealEstate/:name/:address/:community/:city/:m2/:roomNumber/:price/:type/:floorNumber/:buildingFloorNumber/:houseFloorNumber/:sellRent/:furnished/:owner/:user/:imgLenght', uploads.array('files'), (req,res)=>{    
    console.log('usao')
    console.log(req.params)
    const files =req.files;
    const description=req.params.name;
    const address=req.params.address;
    const community=req.params.community;
    const city=req.params.city;
    const m2=req.params.m2;
    const roomNumber=req.params.roomNumber;
    const price=req.params.price;
    const type=req.params.type;
    const floorNumber=req.params.floorNumber;
    const buildingFloorNumber=req.params.buildingFloorNumber;
    const houseFloorNum=req.params.houseFloorNumber;
    const sellRent=req.params.sellRent;
    const furnished=req.params.furnished;
    const owner=req.params.owner;
    const user=req.params.user;
    console.log(req.params.imgLenght)
    let imagePath="";
    let videosPath="";
    for(let i=0;i<req.params.imgLenght;i++){
        imagePath+=files[i].filename;
        if(i!=req.params.imgLenght-1)
            imagePath+=",";
    }
    for(let i=req.params.imgLenght;i<files.length;i++){
        videosPath+=files[i].filename;
        if(i!=files.length-1)
            videosPath+=",";
    }
    console.log(videosPath);
    console.log(imagePath);
    conn.getConnection((err,tmp)=>{
        if(err){
           
            res.json({
                err:"ERROR"
            })
        }
        else{
            if(user=='admin'){
                console.log('Usao admin')
                if(type=="stan"){
                    console.log('Usao admin stan')
                    let query='INSERT INTO `nekretnine`(`description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1)';
                    tmp.query(query,[description,city,community,address,imagePath,videosPath,owner, furnished,roomNumber,sellRent,price,m2],(err) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                        query="SELECT id FROM `nekretnine` ORDER BY ID DESC LIMIT 1";
                        tmp.query(query,(err,result)=>{
                        if(err){
                            console.log('ERROR');
                        }else{
                            let query_insert="INSERT INTO `stan`(`id`, `floor`, `totalFloors`) VALUES (?,?,?)";
                            tmp.query(query_insert,[result[0].id,floorNumber,buildingFloorNumber],(err)=>{})
                        }
                        });
                    }
                    });
                }else{
                    console.log('Usao admin kuca')
                    let query='INSERT INTO `nekretnine`(`description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)';
                    tmp.query(query,[description,city,community,address,imagePath,videosPath,owner, furnished,roomNumber,sellRent,price,m2],(err) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                        query="SELECT id FROM `nekretnine` ORDER BY ID DESC LIMIT 1";
                        tmp.query(query,(err,result)=>{
                            if(err){
                                console.log('ERROR');
                            }else{
                                let query_insert="INSERT INTO `kuca`(`id`, `floor`) VALUES (?,?)";
                                tmp.query(query_insert,[result[0].id,houseFloorNum],(err)=>{
                                    if(err) console.log('ERROR')
                                })
                            }
                        });
                    }
                    });
                }
            }else if(user=='korisnik'){
                console.log('Usao korisnik')
                if(type=="stan"){
                    console.log('Usao korisnik stan')
                    let query='INSERT INTO `nekretnine`(`description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES (?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1)';
                    tmp.query(query,[description,city,community,address,imagePath,videosPath,owner, furnished,roomNumber,sellRent,price,m2],(err) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                        query="SELECT id FROM `nekretnine` ORDER BY ID DESC LIMIT 1";
                        tmp.query(query,(err,result)=>{
                        if(err){
                            console.log('ERROR');
                        }else{
                            let query_insert="INSERT INTO `stan`(`id`, `floor`, `totalFloors`) VALUES (?,?,?)";
                            tmp.query(query_insert,[result[0].id,floorNumber,buildingFloorNumber],(err)=>{})
                        }
                        });
                    }
                    });
                }else{
                    console.log('Usao korisnik kuca')
                    let query='INSERT INTO `nekretnine`(`description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES (?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)';
                    tmp.query(query,[description,city,community,address,imagePath,videosPath,owner, furnished,roomNumber,sellRent,price,m2],(err) =>{
                    if(err)console.log(err)
                    else{
                        query="SELECT id FROM `nekretnine` ORDER BY ID DESC LIMIT 1";
                        tmp.query(query,(err,result)=>{
                            if(err)console.log(err)
                            else{
                                console.log(houseFloorNum)
                                let query_insert="INSERT INTO `kuca` (`id`, `floor`) VALUES(?,?)";
                                tmp.query(query_insert,[result[0].id,houseFloorNum],(err)=>{
                                    if(err)console.log(err)
                                    else res.json({insert:true});
                                })
                            }
                        });
                    }
                    });
                }
            }else {
                if(type=="stan"){
                    let query='INSERT INTO `nekretnine`(`description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1)';
                    tmp.query(query,[description,city,community,address,imagePath,videosPath,owner, furnished,roomNumber,sellRent,price,m2],(err) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                        query="SELECT id FROM `nekretnine` ORDER BY ID DESC LIMIT 1";
                        tmp.query(query,(err,result)=>{
                        if(err){
                            console.log('ERROR');
                        }else{
                            let query_insert="INSERT INTO `stan`(`id`, `floor`, `totalFloors`) VALUES (?,?,?)";
                            tmp.query(query_insert,[result[0].id,floorNumber,buildingFloorNumber],(err)=>{})
                        }
                        });
                    }
                    });
                }else{
                    let query='INSERT INTO `nekretnine`(`description`, `city`, `community`, `accepted`, `address`, `imagesPath`, `videosPath`, `owner`, `furnished`, `roomNumber`, `sellOrRent`, `price`, `m2`, `promoted`, `type`) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)';
                    tmp.query(query,[description,city,community,address,imagePath,videosPath,owner, furnished,roomNumber,sellRent,price,m2],(err) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else{
                        res.json({
                            insert:true
                        });
                        query="SELECT id FROM `nekretnine` ORDER BY ID DESC LIMIT 1";
                        tmp.query(query,(err,result)=>{
                            if(err){
                                console.log('ERROR');
                            }else{
                                let query_insert="INSERT INTO `kuca`(`id`, `floor`) VALUES (?,?)";
                                tmp.query(query_insert,[result[0].id,houseFloorNum],(err)=>{
                                    if(err) console.log('ERROR')
                                })
                            }
                        });
                    }
                    });
                }
            }
        }
        
        tmp.release();
    });
});

app.post('/search',(req,res)=>{
    const city=req.body.city;
    const min=req.body.min;
    const max=req.body.max;
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            if((city!="" || city!=undefined) && (min=="" || min==undefined) && (max=="" || max==undefined)){
                console.log('Pretraga po nazivu grada!');
                let query="SELECT * FROM `nekretnine` WHERE city=? AND accepted=1";
                tmp.query(query,[city],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }else if((city=="" || city==undefined) && (min!="" || min!=undefined) && (max=="" || max==undefined)){
                console.log('Pretraga po minimalnoj ceni')
                let query="SELECT * FROM `nekretnine` WHERE price>? AND accepted=1";
                tmp.query(query,[min],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }else if((city=="" || city==undefined) && (min=="" || min==undefined) && (max!="" || max!=undefined)){
                console.log('Pretraga po maksimalnoj vrednosti')
                let query="SELECT * FROM `nekretnine` WHERE price<? AND accepted=1";
                tmp.query(query,[max],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }else if((city!="" || city!=undefined) && (min!="" || min!=undefined) && (max=="" || max==undefined)){
                console.log('Pretraga po nazivu grada i minimalnoj ceni')
                let query="SELECT * FROM `nekretnine` WHERE city=? AND price>? AND accepted=1";
                tmp.query(query,[city,min],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }else if((city!="" || city!=undefined) && (min=="" || min==undefined) && (max!="" || max!=undefined)){
                console.log('Pretraga po nazivu grada i maksimalnoj ceni')
                let query="SELECT * FROM `nekretnine` WHERE city=? AND price<? AND accepted=1";
                tmp.query(query,[city,max],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }else if((city=="" || city==undefined) && (min!="" || min!=undefined) && (max!="" || max!=undefined)){
                console.log('Pretraga po minimalnoj i maksimalnoj ceni')
                let query="SELECT * FROM `nekretnine` WHERE price BETWEEN ? AND ? AND accepted=1";
                tmp.query(query,[min,max],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }else {
                console.log('Pretraga po svim parametrima')
                let query="SELECT * FROM `nekretnine` WHERE city=? AND price BETWEEN ? AND ? AND accepted=1";
                tmp.query(query,[city,min,max],(err,result) =>{
                    if(err){
                        res.json({
                            err:"ERROR"
                        })
                    }
                    else {
                        if(result.length>0){
                            res.json({
                                find:true,
                                array:result
                            })
                        }else{
                            res.json({
                                find:false
                            })
                        }
                     }
                     tmp.release();
                });
            }
        }
    });
});

app.post('/promoted',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            const query='SELECT * FROM `nekretnine` WHERE promoted=1';
            tmp.query(query,(err,result) =>{
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else {
                    if(result.length>0){
                        res.json({
                            promoted:true,
                            array:result
                        })
                    }else{
                        res.json({
                            promoted:false
                        })
                    }
                 }
                 tmp.release();
            });
        }    
    });
});

app.post('/requirementsRE',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }
        else{
            let query = "SELECT * FROM `nekretnine` WHERE accepted=0";
            tmp.query(query,(err,result) =>{
                
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                   if(result.length>0){
                        res.json({
                            find: true,
                            arrayOfRE:result
                        })
                   }
                   else{
                         res.json({
                            find: false
                         })
                   }
                }
            });
        }
        tmp.release();
    });
});

app.post('/accpetRE',(req,res)=>{
    const id=req.body.id;
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='UPDATE `nekretnine` SET `accepted`=1 WHERE `id` = ?';
            tmp.query(query,[id],(err)=>{
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        update:true
                    })
                }
            })
        }
        tmp.release();
    });
});

app.post('/deletetRE',(req,res)=>{
    const id=req.body.id;
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='DELETE FROM `nekretnine` WHERE `id`=?';
            tmp.query(query,[id],(err)=>{
                if(err){
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        delete:true
                    })
                }
            })
        }
        tmp.release();
    });
});

app.post('/chartCity',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT city AS "name" , COUNT(*) AS "value" FROM `nekretnine` WHERE accepted=1 GROUP By city Order BY COUNT(*) DESC';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        chart:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/chartApartman',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT COUNT(*) AS value ,"prodaja" AS "name" FROM `nekretnine` WHERE accepted=1 AND type=1 AND sellOrRent=1 UNION ALL SELECT COUNT(*),"izdavanje" FROM `nekretnine` WHERE accepted=1 AND type=1 AND sellOrRent=0';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        chart:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/chartHouse',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT COUNT(*) AS value ,"prodaja" AS "name" FROM `nekretnine` WHERE accepted=1 AND type=0 AND sellOrRent=1 UNION ALL SELECT COUNT(*),"izdavanje" FROM `nekretnine` WHERE accepted=1 AND type=0 AND sellOrRent=0';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        chart:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/chartPrice',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT COUNT(*) as value, "≤ 20000" as name FROM `nekretnine` WHERE accepted=1 AND price<=25000 UNION SELECT COUNT(*), "(25000-50000]" as value FROM `nekretnine` WHERE accepted=1 AND price>25000 AND price<=50000 UNION SELECT COUNT(*), "(50000-75000]" FROM `nekretnine` WHERE accepted=1 AND price>50000 AND price<=75000 UNION SELECT COUNT(*), "(75000-100000]" as value FROM `nekretnine` WHERE accepted=1 AND price>75000 AND price <=100000 UNION SELECT COUNT(*), ">10000" as value FROM `nekretnine` WHERE accepted=1 AND price>100000';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        chart:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/promotion/select',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT * FROM `nekretnine` WHERE accepted=1';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/promotion/update',(req,res)=>{
    console.log(req.body.type)
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='UPDATE `nekretnine` SET promoted=? WHERE id=?';
            tmp.query(query,[req.body.type,req.body.id],(err)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        update:true,
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/view',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT * FROM `nekretnine` where accepted=1';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/checkUsername',(req,res)=>{

    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT username FROM `korisnici` WHERE accepted=1';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/checkEmail',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT email FROM `korisnici` WHERE accepted=1';
            tmp.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});


app.post('/realEstateInfo/apartman/:id',(req,res)=>{
    console.log(req.params.id)
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT floor, totalFloors FROM `stan` WHERE id=?';
            tmp.query(query,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.get('/realEstateInfo/house/:id',(req,res)=>{
    console.log(req.params.id)
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            })
        }else{
            let query='SELECT floor FROM `kuca` WHERE id=?';
            tmp.query(query,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({
                        err:"ERROR"
                    })
                }
                else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            })
        }
        tmp.release();
    })
});

app.post('/myRealEstate/:owner',(req,res)=>{
    const owner=req.params.owner
    conn.getConnection((err,tmp)=>{
        if(err){
            res.json({
                err:"ERROR"
            });
        }else{
            let query='SELECT * FROM `nekretnine` WHERE owner=?';
            tmp.query(query,[owner],(err,result)=>{
                if(err){
                    res.json({
                        err:'ERROR'
                    });
                }else{
                    res.json({
                        find:true,
                        array:result
                    })
                }
            });
        }
        tmp.release();
    });
});

app.post('/updateMyRealEstate/:id/:desc/:city/:community/:address/:oldImagesPath/:oldVideosPath/:furnished/:roomNumber/:sellOrRent/:price/:m2/:type/:floor/:totalFloors/:houseFloor/:imagesLength', uploads.array('files'), (req,res,next)=>{    
    const files =req.files;
    let id=req.params.id;
    let desc=req.params.desc;
    let city=req.params.city;
    let community=req.params.community;
    let address=req.params.address;
    let furnished=req.params.furnished;
    let roomNumber=req.params.roomNumber;
    let sellOrRent=req.params.sellOrRent;
    let price=req.params.price;
    let m2=req.params.m2;
    let type=req.params.type;
    let floor=req.params.floor;
    let totalFloors=req.params.totalFloors;
    let houseFloor=req.params.houseFloor;
    let imagePath=req.params.oldImagesPath;
    let videosPath=req.params.oldVideosPath;
    /*console.log("------------>"+imagePath)
    console.log("------------>"+videosPath)*/

    if(furnished=='true'){
        furnished=true;
    }else furnished=false;

    if(sellOrRent=='true') sellOrRent=true;
    else sellOrRent=false;

    if(req.params.imagesLength!=0)imagePath+=","
    if(videosPath=="noOldVideos") videosPath="";
    else {
        if(req.params.imagesLength!=files.length) videosPath+=',';
    }
    for(let i=0;i<req.params.imagesLength;i++){
        imagePath+=files[i].filename;
        if(i!=req.params.imagesLength-1)
            imagePath+=",";
    }
    for(let i=req.params.imagesLength;i<files.length;i++){
        videosPath+=files[i].filename;
        if(i!=files.length-1)
            videosPath+=",";
    }
    /*console.log("---->"+imagePath);
    console.log("---->"+videosPath);*/
    conn.getConnection((err,tmp)=>{
        if(err)console.log(err);
        else{
            let query='UPDATE `nekretnine` SET `description`=?,`city`= ?,`community`=?,`address`=?,`imagesPath`=?,`videosPath`=?,`furnished`=? ,`roomNumber`=?,`sellOrRent`=?,`price`=?,`m2`=? WHERE id=?';
            tmp.query(query,[desc,city,community,address,imagePath,videosPath,furnished,roomNumber,sellOrRent,price,m2,id],(err)=>{
                if(err) console.log(err);
                else{
                    if(type=='stan'){
                        let query_update='UPDATE `stan` SET `floor`= ?,`totalFloors`=? WHERE id=?';
                        tmp.query(query_update,[floor,totalFloors,id],(err)=>{
                            if(err)console.log(err)
                            else res.json({update:true});
                        })
                    }else{
                        let query_update='UPDATE `kuca` SET `floor`=? WHERE id=?';
                        tmp.query(query_update,[houseFloor,id],(err)=>{
                            if(err)console.log(err)
                            else res.json({update:true});
                        })
                    }
                }
            });
        }
        tmp.release();
    });
});

app.post('/realEstate/rent/check',(req,res)=>{
    const id=req.body.id;
    const start=req.body.start;
    const end=req.body.end
    const buyer=req.body.buyer
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
        else{
            let query='select idN from `izdavanje` WHERE ((start>=? AND start<=?) OR (end>=? AND end<=?) OR (start<=? AND end>=?)) AND idN=? and accepted=1';
            tmp.query(query,[start,end,start,end,start,end,id],(err,result)=>{
                if(err) console.log(err)
                else{
                   //console.log(result.length)
                   if(result.length>0){
                       res.json({insert:false})
                   }else{
                       res.json({insert:true})
                   }
                }
            });
        }
        tmp.release();
    });
});

app.post('/realEstate/rent/insert',(req,res)=>{
    const id=req.body.id;
    const start=req.body.start;
    const end=req.body.end
    const idB=req.body.buyer
    console.log(req.body)
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
        else{
            let query='INSERT INTO `izdavanje`(`idN`, `start`, `end`, `IdB`) VALUES (?,?,?,?)';
            tmp.query(query,[id,start,end,idB],(err)=>{
                if(err) console.log(err)
                else{
                   res.json({insert:true})
                }
            });
        }
        tmp.release();
    });
});

app.post('/realEstate/sell',(req,res)=>{
    const idN=req.body.idN;
    const idB=req.body.idB;
    const type=req.body.type
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
        else{
            let query='INSERT INTO `prodaja`(`idN`, `idB`, `type`) VALUES (?,?,?)';
            tmp.query(query,[idN,idB,type],(err)=>{
                if(err) console.log(err);
                else{
                    res.json({insert:true})
                }
            })
        }
        tmp.release();
    });
});

app.post('/realEstate/showOffers/sell',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
        else{
            let query='SELECT `prodaja`.*, `korisnici`.`firstName`, `korisnici`.`lastName`,`korisnici`.`username`, `prodaja`.`type` FROM `prodaja` JOIN `korisnici` ON (`prodaja`.`idB`=`korisnici`.`id`) WHERE idN=?';
            tmp.query(query,[req.body.idN],(err,result)=>{
                if(err)console.log(err)
                else{
                    if(result.length==0){
                        res.json({find:false})
                    }else{
                        res.json({
                            find:true,
                            array:result
                        })
                    }
                }
            })
        }
        tmp.release();
    });
});

app.post('/realEstate/showOffers/rent',(req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
        else{
            let query='SELECT `izdavanje`.`id`, `izdavanje`.`idN`,`izdavanje`.`IdB`,`izdavanje`.`start`,`izdavanje`.`end`, `korisnici`.`firstName`, `korisnici`.`lastName`, `korisnici`.`username` FROM `izdavanje` JOIN `korisnici` ON(`korisnici`.`id`=`izdavanje`.`IdB`) WHERE idN=? and `izdavanje`.accepted!=1';
            tmp.query(query,[req.body.idN],(err,result)=>{
                if(err)console.log(err);
                else{
                    if(result.length==0) res.json({find:false})
                    else{
                        res.json({
                            find:true,
                            array:result
                        })
                    }
                }
            })
        }
        tmp.release();
    });
});


app.post('/realEstate/showOffers/refuse',(req,res)=>{
    console.log(req.body.id)
    console.log(req.body.type)
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query='';
           if(req.body.type==1) {
            query='DELETE FROM `prodaja` WHERE id=?';
           }else {
            query='DELETE FROM `izdavanje` WHERE id=?';
           }
           tmp.query(query,[req.body.id],(err)=>{
            if(err)console.log(err)
            else{
                res.json({delete:true})
            }
        })
        }
        tmp.release();
    });
});


app.post('/realEstate/showOffers/accept',(req,res)=>{
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           if(req.body.type==1){
            console.log(req.body)
            let find_re='select * from `nekretnine` where id=?';
            tmp.query(find_re,[req.body.idN],(err,result)=>{
                if(err)console.log(err);
                else{
                    let realEstate=result[0];
                    console.log(realEstate)
                    const desc=realEstate.description;
                    const city=realEstate.city;
                    const community=realEstate.community;
                    const address= realEstate.address;
                    const m2=realEstate.m2;
                    const price=realEstate.price;
                    const roomNumber=realEstate.roomNumber;
                    const furnished =realEstate.furnished;
                    const owner=realEstate.owner;
                    const idUser=req.body.IdB;
                    let income=realEstate.price;
                    let insert_contract='INSERT INTO `ugovori`( `description`, `city`, `community`, `address`, `m2`, `price`, `roomNumber`, `furnished`, `sellRent`, `idUser`) VALUES (?,?,?,?,?,?,?,?,1,?)';
                    tmp.query(insert_contract,[desc,city,community,address,m2,price,roomNumber,furnished,idUser],(err)=>{
                        if(err)console.log(err);
                    })
                    if(owner!='agencija'){
                        let query_income='SELECT percentage FROM `procenti` WHERE id=1'
                        tmp.query(query_income,(err,result)=>{
                            if(err)console.log(err);
                            else{
                                income=income*result[0].percentage;
                                let find_idU='SELECT id FROM `ugovori` WHERE id=(SELECT MAX(id) from `ugovori`)';
                                tmp.query(find_idU,(err,result)=>{
                                    if(err)console.log(err)
                                    else{
                                        let idU=result[0].id
                                        console.log(idU);
                                        let insert_income='INSERT INTO `prihodi_agencija`(`IdU`, `income`) VALUES (?,?)';
                                        tmp.query(insert_income,[idU,income],(err)=>{
                                            if(err)console.log(err);
                                        })
                                    }
                                })
                            }
                        })
                    }else{
                        let find_idU='SELECT id FROM `ugovori` WHERE id=(SELECT MAX(id) from `ugovori`)';
                        tmp.query(find_idU,(err,result)=>{
                            if(err)console.log(err)
                            else{
                                let idU=result[0].id
                                console.log(idU);
                                let insert_income='INSERT INTO `prihodi_agencija`(`IdU`, `income`) VALUES (?,?)';
                                tmp.query(insert_income,[idU,income],(err)=>{
                                    if(err)console.log(err);
                                })
                            }
                        })
                    }
                    let delete_offers='DELETE FROM `prodaja` WHERE idN=?';
                    tmp.query(delete_offers,[req.body.idN],(err)=>{
                        if(err)console.log(err)
                        else{
                            let delete_re='DELETE FROM `nekretnine` WHERE id=?';
                            tmp.query(delete_re,[req.body.idN],(err)=>{
                                if(err)console.log(err)
                                else{
                                    res.json({delete:true})
                                }
                            })
                        }
                    })
                }
            });
           }else{
            //izdavanje
            let query_update='UPDATE `izdavanje` SET `accepted`=1  WHERE id=?';
            tmp.query(query_update,[req.body.id],(err)=>{
                if(err)console.log(err);
                else{
                    //upisivanje u tabelu ugovori
                    let find_idN='SELECT idN FROM `izdavanje` WHERE id=?';
                    tmp.query(find_idN,[req.body.id],(err,result)=>{
                        if(err) console.log(err)
                        else{
                            const idN=result[0].idN;
                            console.log(idN)
                            let find_re='select * from `nekretnine` where id=?';
                            tmp.query(find_re,[idN],(err,result)=>{
                                if(err)console.log(err);
                                else{
                                    let realEstate=result[0];
                                    const desc=realEstate.description;
                                    const city=realEstate.city;
                                    const community=realEstate.community;
                                    const address= realEstate.address;
                                    const m2=realEstate.m2;
                                    const price=realEstate.price;
                                    const roomNumber=realEstate.roomNumber;
                                    const furnished =realEstate.furnished;
                                    const owner=realEstate.owner;
                                    const idUser=req.body.IdB;
                                    income=price;
                                    let insert_contract='INSERT INTO `ugovori`( `description`, `city`, `community`, `address`, `m2`, `price`, `roomNumber`, `furnished`, `idUser`) VALUES (?,?,?,?,?,?,?,?,?)';
                                    tmp.query(insert_contract,[desc,city,community,address,m2,price,roomNumber,furnished,idUser],(err)=>{
                                        if(err)console.log(err);
                                        else{
                                            let query_find='SELECT `start`, `end` FROM `izdavanje` WHERE id=?'
                                            tmp.query(query_find,[req.body.id],(err,result)=>{
                                                if(err)console.log(err);
                                                else{
                                                    if(result){
                                                        let start_string=result[0].start;
                                                        let end_string=result[0].end
                                                        let start=new Date(start_string)
                                                        let end=new Date(end_string)
                                                        let query='select * from `izdavanje` WHERE ((start>=? AND start<=?) OR (end>=? AND end<=?) OR (start<=? AND end>=?)) AND idN=53 AND accepted!=1';
                                                        tmp.query(query,[start,end,start,end,start,end,req.body.idN],(err,result_new)=>{
                                                            if(err)console.log(err);
                                                            else{
                                                                if(result_new.length!=0){
                                                                    console.log(result_new)
                                                                    res.json({array:result_new})
                                                                    let query_delete='DELETE FROM `izdavanje` WHERE id=?';
                                                                    for(let i=0;i<result_new.length;i++){
                                                                        tmp.query(query_delete,[result_new[i].id],(err)=>{
                                                                            if(err)console.log(err)
                                                                        })
                                                                    }
                                                                }else{
                                                                    res.json({array:result_new})
                                                                    let income=price/30;
                                                                    let query_proc='SELECT * FROM `procenti` WHERE id=2';
                                                                    tmp.query(query_proc,(err,result)=>{
                                                                        if(err)console.log(err);
                                                                        else{
                                                                            console.log(result[0]);
                                                                            if(owner!='agencija') income=income*result[0].percentage;
                                                                            let diff = Math.abs(start.getTime()-end.getTime())/(1000 * 3600 * 24);
                                                                            income=income*diff;
                                                                            let find_idU='SELECT id FROM `ugovori` WHERE id=(SELECT MAX(id) from `ugovori`)';
                                                                            tmp.query(find_idU,(err,result)=>{
                                                                                if(err)console.log(err)
                                                                                else{
                                                                                    let idU=result[0].id
                                                                                    console.log(idU);
                                                                                    let insert_income='INSERT INTO `prihodi_agencija`(`IdU`, `income`) VALUES (?,?)';
                                                                                    tmp.query(insert_income,[idU,income],(err)=>{
                                                                                        if(err)console.log(err);
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
           }
        }
        tmp.release();
    });
});

app.post('/chat/getMessages',(req,res)=>{
    const user1=req.body.user1;
    const user2=req.body.user2;
    const title=req.body.title;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
            let query_find='SELECT * FROM `poruke` WHERE ((user1=?AND user2=?) OR (user2=? AND user1=?)) AND title=? ';
            tmp.query(query_find,[user1,user2,user1,user2,title],(err,result)=>{
                if(err)console.log(err)
                else {
                    res.json({array:result})
                    let query_update='UPDATE `poruke` SET `seen`=1 WHERE ((user1=?AND user2=?) OR (user2=? AND user1=?)) AND title=?';
                    tmp.query(query_update,[user1,user2,user1,user2,title],(err)=>{
                        if(err)console.log(err);
                    })
                }
            });
        }
        tmp.release();
    });
});

app.post('/chat/sendMessage',(req,res)=>{
    console.log('usao')
    const title=req.body.title;
    const user1=req.body.user1;
    const user2=req.body.user2;
    const text=req.body.text;
    var time=new Date()
    console.log(time)
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query_insert='INSERT INTO `poruke`( `title`, `user1`, `user2`, `text`, `time`) VALUES (?,?,?,?,?)';
           tmp.query(query_insert,[title,user1,user2,text,time],(err)=>{
            if(err)console.log(err);
            else{ 
                let query_update='UPDATE `poruke` SET `saved`=0, `seen`=0 WHERE ((user1=? and user2=?) OR (user2=? and user1=?)) AND title=?';
                tmp.query(query_update,[user1,user2,user1,user2,title],(err)=>{
                if(err)console.log(err)
                else{
                    res.json({insert:true});
                }
           })
            }
            })
        }
        tmp.release();
    });
});


app.post('/inbox/active',(req,res)=>{
    console.log('usao')
    const user=req.body.user;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query_insert='SELECT p1.title, p1.user1, p1.user2, MAX(p1.time) as "time", p1.seen FROM `poruke` p1 WHERE p1.saved=0 AND (p1.user1 = ? OR p1.user2 = ?) GROUP BY p1.title, CASE  WHEN p1.user1 = ? THEN p1.user2 WHEN p1.user2 = ? THEN p1.user1 END ORDER BY  MAX(p1.time) DESC';
           tmp.query(query_insert,[user,user,user,user],(err,result)=>{
            if(err)console.log(err);
            else res.json({array:result})
           })
        }
        tmp.release();
    });
});

app.post('/inbox/archive',(req,res)=>{
    console.log('usao')
    const user=req.body.user;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query_insert='SELECT p1.title, p1.user1, p1.user2, MAX(p1.time) as "time", p1.seen FROM `poruke` p1 WHERE p1.saved=1 AND (p1.user1 = ? OR p1.user2 = ?) GROUP BY p1.title, CASE  WHEN p1.user1 = ? THEN p1.user2 WHEN p1.user2 = ? THEN p1.user1 END ORDER BY  MAX(p1.time) DESC';
           tmp.query(query_insert,[user,user,user,user],(err,result)=>{
            if(err)console.log(err);
            else res.json({array:result})
           })
        }
        tmp.release();
    });
});

app.post('/inbox/archiveMessage',(req,res)=>{
    const user1=req.body.user1;
    const user2=req.body.user2;
    const title=req.body.title;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query_update='UPDATE `poruke` SET `saved`=1 WHERE ((user1=? and user2=?) OR (user2=? and user1=?)) AND title=?';
           tmp.query(query_update,[user1,user2,user1,user2,title],(err)=>{
               if(err)console.log(err)
               else{
                   res.json({update:true})
               }
           })
        }
        tmp.release();
    });
});

app.post('/inbox/archiveRemove',(req,res)=>{
    const user1=req.body.user1;
    const user2=req.body.user2;
    const title=req.body.title;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query_update='UPDATE `poruke` SET `saved`=0 WHERE ((user1=? and user2=?) OR (user2=? and user1=?)) AND title=?';
           tmp.query(query_update,[user1,user2,user1,user2,title],(err)=>{
               if(err)console.log(err)
               else{
                   res.json({update:true})
               }
           })
        }
        tmp.release();
    });
});

app.post('/realEstate/checkOwner',(req,res)=>{
    const title=req.body.title;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query='SELECT nekretnine.owner from nekretnine WHERE nekretnine.description = ?';
           tmp.query(query,[title],(err,result)=>{
            if(err)console.log(err);
            else res.json({owner:result[0].owner})
           })
        }
        tmp.release();
    });
});

app.get('/contracts/getAll',(req,res)=>{
    console.log('usao')
    const user=req.body.user;
    conn.getConnection((err,tmp)=>{
       if(err) console.log(err)
        else{
           let query_insert='select * from `ugovori` ';
           tmp.query(query_insert,(err,result)=>{
            if(err)console.log(err);
            else {
                let query_income='SELECT * FROM `prihodi_agencija`';
                tmp.query(query_income,(err,incomes)=>{
                    if(err)console.log(err);
                    else{
                        res.json({data:result,incomes:incomes})
                    }
                })
            }
           })
        }
        tmp.release();
    });
});

app.post('/getAllUsersById', (req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
         else{
            let find_query='select username from `korisnici` where accepted=1 and id=?';
            tmp.query(find_query,[req.body.id],(err,result)=>{
                if(err)console.log(err);
                else res.json({username:result[0].username})
            })
         }
         tmp.release();
     });
})

app.post('/percentage/sell', (req,res)=>{
    console.log('usao')
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
         else{
            let query_update='UPDATE `procenti` SET `percentage`=? WHERE id=1';
            tmp.query(query_update,[req.body.proc],(err)=>{
                if(err)console.log(err);
                else{
                    res.json({update:true})
                }
            })
         }
         tmp.release();
     });
})

app.post('/percentage/rent', (req,res)=>{
    console.log('usao')
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
         else{
            let query_update='UPDATE `procenti` SET `percentage`=? WHERE id=2';
            tmp.query(query_update,[req.body.proc],(err)=>{
                if(err)console.log(err);
                else{
                    res.json({update:true})
                }
            })
         }
         tmp.release();
     });
})

app.get('/getAllUsers', (req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
         else{
            let query_update='Select * from `korisnici` where accepted=1';
            tmp.query(query_update,(err,result)=>{
                if(err)console.log(err);
                else{
                    res.json({array:result})
                }
            })
         }
         tmp.release();
     });
})

app.post('/realEstate/getAllRealEstate', (req,res)=>{
    conn.getConnection((err,tmp)=>{
        if(err) console.log(err)
         else{
            let query_update='Select * from `nekretnine` where accepted=1 and owner=?';
            tmp.query(query_update,[req.body.owner],(err,result)=>{
                if(err)console.log(err);
                else{
                    res.json({array:result})
                }
            })
         }
         tmp.release();
     });
})