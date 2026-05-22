import Setting from '../config/models/setting.js';



export const settingStored = async (req,res)=>{
    const changes = req.body;


    const user = req.user;

    try {
           let isSetting = await Setting.findOne(user._id)

    if(!isSetting) {
      isSetting =   await Setting.create({userId:user._id});
    } 

    changes.forEach((item)=> isSetting[item.key]=item.value)
    await isSetting.save();

    res.status(200).json({
      success: true,
      setting: isSetting
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