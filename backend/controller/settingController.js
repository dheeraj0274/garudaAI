import Setting from '../config/models/setting.js';



export const updateSettings = async (req,res)=>{
  


    const user = req.user;

    try {
 
           const updated = await Setting.findOneAndUpdate(
            {userId:user},
            {settings:req.body.settings},
            {new:true, upsert:true}
           )

    res.status(200).json({
      success: true,
      setting: updated
    });

        
    } catch (error) {

        return res.status(500).json({
            success:true,
            error:error.message
        })
        
    }

 
    





}

export const fetchSetting = async(req,res)=>{
    const user = req.user;
    console.log(user)


  try {
   

   const userSetting = await Setting.findOne({userId:user._id})

   if(!userSetting) {
    await Setting.create({userId:user._id})
    return res.status(201).json({
      success:true,
      message:"setting created"
    })

   } 
   else{
    return res.status(200).json({
    success:true,
    message:"sent settings",
    userSetting
   })

   }
   
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      error:error.message
    })
    
  }
  

}