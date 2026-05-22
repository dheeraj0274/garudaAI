import Setting from '../config/models/setting.js';



export const settingStored = async (req,res)=>{
    const changes = req.body;


    const user = req.user;

    try {
           let isSetting = await Setting.findOne(user)

    if(!isSetting) {
      isSetting =   await Setting.create({userId:user});
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